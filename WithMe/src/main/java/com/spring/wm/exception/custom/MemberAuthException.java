package com.spring.wm.exception.custom;

import org.springframework.http.HttpStatus;

import com.spring.wm.exception.ErrorMessage;

import lombok.Getter;

@Getter
public class MemberAuthException extends RuntimeException {
	private ErrorMessage errorMessage;

    public MemberAuthException(ErrorMessage errorMessage) {
        this.errorMessage = errorMessage;
    }
   
}
