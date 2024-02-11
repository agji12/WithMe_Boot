package com.spring.wm.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorMessage {
	
	// Member 관련
	NOT_FOUND_MEMBER(HttpStatus.UNAUTHORIZED,1001,"아이디 및 비밀번호를 다시 확인해 주세요."),
	ALREDAY_LOGGED_OUT_MEMBER(HttpStatus.UNAUTHORIZED,1002,"이미 로그아웃하셨습니다."),
	// Token 관련
	INVALID_TOKEN(HttpStatus.UNAUTHORIZED,2001,"유효하지 않은 토큰입니다."),
	MALFORMED_TOKEN(HttpStatus.UNAUTHORIZED,2002,"잘못된 형식의 토큰입니다."),
	TIME_EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED,2003,"유효기간이 만료된 토큰입니다."),
	UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED,2004,"지원하지 않는 형식의 토큰입니다."),
	UNKNOWN_ERROR_TOKEN(HttpStatus.UNAUTHORIZED,2005,"알 수 없는 오류가 발생했습니다."),
	NOT_EXIST_TOKEN(HttpStatus.UNAUTHORIZED,2006,"다시 로그인 해주시기 바랍니다."),
	FAILED_VALID_TOKEN(HttpStatus.UNAUTHORIZED,2007,"인증에 실패했습니다.");
	
	private final HttpStatus status;
	private final int code;
	private final String message;
	
	ErrorMessage(HttpStatus status, int code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
	
}
