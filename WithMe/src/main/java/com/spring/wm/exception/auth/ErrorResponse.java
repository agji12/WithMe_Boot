package com.spring.wm.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
	
	private final HttpStatus status;
    private final int code;
    private final String message;

    public ErrorResponse(ErrorMessage errorMessage) {
    	this.status = errorMessage.getStatus();
    	this.code = errorMessage.getCode();
        this.message = errorMessage.getMessage();
    }
    
    public static ResponseEntity<ErrorResponse> error(MemberAuthException e) {
        return ResponseEntity
                .status(e.getErrorMessage().getStatus())
                .body(ErrorResponse.builder()
                		.status(e.getErrorMessage().getStatus())
                        .code(e.getErrorMessage().getCode())
                        .message(e.getErrorMessage().getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> error(TokenValidateException e) {
        return ResponseEntity
                .status(e.getErrorMessage().getStatus())
                .body(ErrorResponse.builder()
                		.status(e.getErrorMessage().getStatus())
                        .code(e.getErrorMessage().getCode())
                        .message(e.getErrorMessage().getMessage())
                        .build());
    }
    
}
