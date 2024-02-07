package com.spring.wm.exception.auth;

import lombok.Getter;

@Getter
public class MemberAuthException extends RuntimeException {
	private ErrorMessage errorMessage;

    public MemberAuthException(ErrorMessage errorMessage) {
        this.errorMessage = errorMessage;
    }
}
