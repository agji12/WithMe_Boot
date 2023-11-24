package com.spring.wm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.entity.Member;
import com.spring.wm.services.MailSendService;
import com.spring.wm.services.MemberService;

@RestController
public class MemberController {
	
	@Autowired
	private MailSendService mailSendService;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	// email 보내기
	@GetMapping("/member/mailSend/{email}")
	public ResponseEntity<String> mailSend(@PathVariable String email) {
		return new ResponseEntity<String>(mailSendService.sendMail(email),HttpStatus.OK);
	}
	
	// 이메일 중복 체크
	@GetMapping("/member/emailCheck/{email}")
	public ResponseEntity<Long> emailCheck(@PathVariable String email) {
		return new ResponseEntity<Long>(memberService.emailCheck(email),HttpStatus.OK);
	}
	
	
	// 닉네임 중복 체크
	@GetMapping("/member/nicknameCheck/{nickname}")
	public ResponseEntity<Long> nicknameCheck(@PathVariable String nickname) {
		return new ResponseEntity<Long>(memberService.nicknameCheck(nickname),HttpStatus.OK);
	}
	
	// 회원 가입
	@PostMapping("/member/signup")
	public ResponseEntity<Member> signup(@RequestBody Member member){
		
		member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
		member.setAuthority("ROLE_USER");
		
		return new ResponseEntity<Member>(memberService.signup(member),HttpStatus.OK);
	}
	
	
}
