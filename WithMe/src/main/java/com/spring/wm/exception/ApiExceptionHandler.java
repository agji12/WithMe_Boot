package com.spring.wm.exception;

import org.apache.http.client.HttpResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring.wm.exception.auth.ErrorResponse;
import com.spring.wm.exception.auth.MemberAuthException;
import com.spring.wm.exception.auth.TokenValidateException;

@RestControllerAdvice
public class ApiExceptionHandler {

	// 404 - 소환사 이름 NOT FOUND
	@ExceptionHandler(HttpResponseException.class)
	public ResponseEntity<?> httpException(HttpResponseException e) {
		return ResponseEntity.notFound().build();
	}

	// Member 관련 오류
	@ExceptionHandler(MemberAuthException.class)
	public ResponseEntity<?> httpException(MemberAuthException e) {
		System.out.println("여기 ㅋㅋ");
		return ErrorResponse.error(e);
	}

	// Token 관련 오류
	@ExceptionHandler(TokenValidateException.class)
	public ResponseEntity<?> httpException(TokenValidateException e) {
		System.out.println("여기 ㅋㅋ");
		return ErrorResponse.error(e);
	}

	// 이외의 에러 상황
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> httpException(Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
	}


}
