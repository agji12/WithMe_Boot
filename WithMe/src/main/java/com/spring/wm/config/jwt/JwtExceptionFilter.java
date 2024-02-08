package com.spring.wm.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.wm.exception.ErrorMessage;
import com.spring.wm.exception.ErrorResponse;
import com.spring.wm.exception.custom.MemberAuthException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response); // go to 'JwtAuthenticationFilter'
		} catch (MemberAuthException e) {
			setErrorResponse(HttpStatus.UNAUTHORIZED, response, e);
		}
	}

	public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable e) throws IOException {
		res.setStatus(status.value());
		res.setContentType("application/json; charset=UTF-8");

		ErrorResponse errorResponse = new ErrorResponse(ErrorMessage.ALREDAY_LOGGED_OUT_MEMBER);
		res.getWriter().write(errorResponse.toString());
	}

}
