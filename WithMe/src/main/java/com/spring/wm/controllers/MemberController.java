package com.spring.wm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.services.MailSendService;

@RestController
public class MemberController {
	
	@Autowired
	private MailSendService mailSendService;
	
	@GetMapping("/member/mailSend/{email}")
	public ResponseEntity<String> mailSend(@PathVariable String email) {
		System.out.println(email);
		return new ResponseEntity<String>(mailSendService.sendMail(email),HttpStatus.OK);
	}
	
	
}
