package com.spring.wm.exception.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class TokenValidateException extends RuntimeException {
	private ErrorMessage errorMessage;

    public TokenValidateException(ErrorMessage errorMessage) {
        this.errorMessage = errorMessage;
    }
}
