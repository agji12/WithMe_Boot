package com.spring.wm.services;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.wm.config.jwt.JwtTokenProvider;
import com.spring.wm.dto.JwtTokenDto;
import com.spring.wm.dto.LoginRequestDto;
import com.spring.wm.entity.Member;
import com.spring.wm.exception.auth.ErrorMessage;
import com.spring.wm.exception.auth.MemberAuthException;
import com.spring.wm.repositories.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

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
		// 토큰 생성
		String accessToken = jwtTokenProvider.createAccessToken(authentication);
		String refreshToken = jwtTokenProvider.createRefreshToken(authentication);
		// Redis에 refreshToken 저장
		// RefreshToken Cookie에 담아 전송
		jwtTokenProvider.saveRefreshTokenAtCookie(refreshToken, response);
		
		JwtTokenDto jwtTokenDto = JwtTokenDto.builder()
									.tokenType("Bearer ")
									.accessToken(accessToken).build();
		return jwtTokenDto;
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

	public Member getMemberInfo(String email) {
		return memberRepository.findByEmail(email);
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
