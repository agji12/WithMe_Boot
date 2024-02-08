package com.spring.wm.exception.custom;

import com.spring.wm.exception.ErrorMessage;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class TokenValidateException extends RuntimeException {
	private ErrorMessage errorMessage;

    public TokenValidateException(ErrorMessage errorMessage) {
        this.errorMessage = errorMessage;
    }
}
