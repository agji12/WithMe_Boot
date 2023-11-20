package com.spring.wm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.services.MailSendService;
import com.spring.wm.services.MemberService;

@RestController
public class MemberController {
	
	@Autowired
	private MailSendService mailSendService;
	
	@Autowired
	private MemberService memberService;
	
	// email 보내기
	@GetMapping("/member/mailSend/{email}")
	public ResponseEntity<String> mailSend(@PathVariable String email) {
		return new ResponseEntity<String>(mailSendService.sendMail(email),HttpStatus.OK);
	}
	
	// 이메일 중복 체크
	/*
	@GetMapping("/member/emailCheck/{email}")
	public ResponseEntity<?> emailCheck(@PathVariable String email) {
		return ResponseEntity<?>(memberService.emailCheck(email),HttpStatus.OK);
	}
	*/
	
	// 닉네임 중복 체크
	/*
	@GetMapping("/member/nicknameCheck/{nickname}")
	public ResponseEntity<?> nicknameCheck(@PathVariable String nickname) {
		return ResponseEntity<?>(memberService.nicknameCheck(email),HttpStatus.OK);
	}
	*/
	
}
