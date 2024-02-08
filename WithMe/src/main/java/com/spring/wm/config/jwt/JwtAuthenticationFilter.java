package com.spring.wm.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.wm.exception.ErrorMessage;
import com.spring.wm.exception.custom.MemberAuthException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtTokenProvider jwtTokenProvider;
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String accessToken = ((HttpServletRequest)request).getHeader("Authorization");
		
		if (accessToken == null || !accessToken.startsWith("Bearer ")) {
			filterChain.doFilter(request, response); // 필터를 타겟에 넘겨버리고 리턴
			return;
		}
		
		String token = jwtTokenProvider.eliminateType(accessToken);
		// 로그아웃된 토큰인지 체크
		// if(jwtTokenProvider.isLogout(token)) throw new MemberAuthException(ErrorMessage.ALREDAY_LOGGED_OUT_MEMBER);
		if(jwtTokenProvider.validateToken(token) && !jwtTokenProvider.isLogout(token)) {
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response); // 해줘야 필터를 나간다
	}
	
	
}
