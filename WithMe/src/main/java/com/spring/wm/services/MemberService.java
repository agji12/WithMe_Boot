package com.spring.wm.services;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.wm.config.auth.PrincipalDetails;
import com.spring.wm.config.jwt.JwtTokenProvider;
import com.spring.wm.dto.JwtTokenDto;
import com.spring.wm.dto.LoginRequestDto;
import com.spring.wm.entity.Member;
import com.spring.wm.exception.ErrorMessage;
import com.spring.wm.exception.custom.MemberAuthException;
import com.spring.wm.exception.custom.TokenValidateException;
import com.spring.wm.repositories.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	@Value("${jwt.access_expiration}")
	private long accessExpiration;
	
	private final RedisService redisService;
	private final MemberRepository memberRepository;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public Long emailCheck(String email){
		return memberRepository.countByEmail(email);
	}

	public Long nicknameCheck(String nickname){
		return memberRepository.countByNickname(nickname);
	}

	public JwtTokenDto login(LoginRequestDto loginRequestDto, HttpServletResponse response){
		Authentication authentication = authenticate(loginRequestDto);
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		
		// 토큰 생성
		String accessToken = jwtTokenProvider.createAccessToken(principalDetails.getMember().getEmail());
		String refreshToken = jwtTokenProvider.createRefreshToken(principalDetails.getMember().getEmail());
		// RefreshToken Cookie에 담아 전송
		jwtTokenProvider.saveRefreshTokenAtCookie(refreshToken, response);
		
		JwtTokenDto jwtTokenDto = JwtTokenDto.builder()
									.tokenType("Bearer ")
									.accessToken(accessToken).build();
		return jwtTokenDto;
	}
	
	@Transactional
	public String logout(String accessToken) {
		String token = jwtTokenProvider.eliminateType(accessToken);
		String username = jwtTokenProvider.getUsername(token);
		long remainingTime = jwtTokenProvider.remainingTime(token);
		
		// AccessToken은 BlackList에 등록
		redisService.setBlackListValues(token, remainingTime);
		// Redis에서 RefreshToken 삭제
		redisService.delValues(username);
		
		return "로그아웃 완료";
	}
	
	public JwtTokenDto reIssue(String refreshToken) {
		// Redis에 refreshToken 존재하는지 검사
		String username = jwtTokenProvider.getUsername(refreshToken);
		boolean isExistKey = redisService.getKeys(username);
		String redisRefreshToken = redisService.getValues(username);
		
		if(isExistKey && refreshToken.equals(redisRefreshToken)) {
			String newAccessToken = 
					jwtTokenProvider.createAccessToken(username);
			JwtTokenDto jwtTokenDto = JwtTokenDto.builder()
					.tokenType("Bearer ")
					.accessToken(newAccessToken).build();
			return jwtTokenDto;
		} else throw new TokenValidateException(ErrorMessage.NOT_EXIST_TOKEN);
	}
	
	public Authentication authenticate(LoginRequestDto loginRequestDto) {

		Member member = memberRepository.findByEmail(loginRequestDto.getUsername());
		if(member == null) throw new MemberAuthException(ErrorMessage.NOT_FOUND_MEMBER);

		if(!bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), member.getPassword())) {
			throw new MemberAuthException(ErrorMessage.NOT_FOUND_MEMBER);
		}
		
		UsernamePasswordAuthenticationToken authenticationToken = 
				new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), 
						loginRequestDto.getPassword());
		Authentication authentication = 
				authenticationManager.authenticate(authenticationToken); // loadUserByUsername 실행됨
		
		return authentication;
	}

	public Member signup(Member member) {
		return memberRepository.save(member);
	}
	
	public Member getMemberInfo(String accessToken) {
		String token = jwtTokenProvider.eliminateType(accessToken);
		
		// 토큰 유효성 체크
//		boolean validToken = jwtTokenProvider.validateToken(token);
//		if(!validToken) throw new TokenValidateException(ErrorMessage.FAILED_VALID_TOKEN);
		
		Authentication authentication = jwtTokenProvider.getAuthentication(token);
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		
		return memberRepository.findByEmail(principalDetails.getMember().getEmail());
	}

	@Transactional
	public Member updateMemberInfo(Member member) {
		Member m =  memberRepository.findByEmail(member.getEmail());
		m.setNickname(member.getNickname());
		m.setBirthday(member.getBirthday());
		return m;
	}

	@Transactional
	public Member updateMemberPassword(Member member) {
		Member m = memberRepository.findByEmail(member.getEmail());
		m.setPassword(member.getPassword());
		return m;
	}

	@Transactional
	public int dropOutMember(String email) {
		return memberRepository.deleteByEmail(email);
	}


}
