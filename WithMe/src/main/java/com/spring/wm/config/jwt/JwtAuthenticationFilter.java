package com.spring.wm.config.jwt;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.wm.dto.LoginRequestDto;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	// /login 요청시 로그인 시도 위해 실행
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter : 로그인 시도 중");

		ObjectMapper om = new ObjectMapper();
		LoginRequestDto loginRequestDto = null;

		try {
			loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
			
			// 유저네임패스워드 토큰 생성
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), 
							loginRequestDto.getPassword());
			System.out.println("JwtAuthenticationFilter : 토큰생성완료");

			// PrincipalDetailsService의 loadUserByUsername() 함수가 실행된 후 정상적이면 authentication이 리턴됨
			Authentication authentication = 
					authenticationManager.authenticate(authenticationToken);
			//UserDTO dto = (UserDTO) authentication.getPrincipal();
			System.out.println("로그인 완료 됨 : " + authentication.getPrincipal());

			return authentication;
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// attemptAuthentication 실행 후 정상적으로 인증이 된 경우 successfulAuthentication 함수 실행
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("successfulAuthentication 실행됨 : 인증 완료");
		//UserDTO dto = (UserDTO) authResult.getPrincipal();
		String jwtToken = JWT.create()
				//.withSubject(dto.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
				//.withClaim("username", dto.getUsername())
				.sign(Algorithm.HMAC256(JwtProperties.SECRET));

		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
	}

}
