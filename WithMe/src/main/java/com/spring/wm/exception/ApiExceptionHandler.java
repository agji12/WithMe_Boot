package com.spring.wm.exception;

import org.apache.http.client.HttpResponseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;

@RestControllerAdvice
public class ApiExceptionHandler {
	
	// 404 - 찾는 정보 NOT FOUND
	@ExceptionHandler(HttpResponseException.class)
	public ResponseEntity<?> httpException(HttpResponseException e) {
		return ResponseEntity.notFound().build();
	}
	
	// 500 - 서버 에러
	@ExceptionHandler(InternalServerError.class)
	public ResponseEntity<?> httpException(InternalServerError e) {
		return ResponseEntity.internalServerError().build();
	} 

	
	
}
