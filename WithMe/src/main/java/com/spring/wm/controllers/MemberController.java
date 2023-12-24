package com.spring.wm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@GetMapping("/api/member/mailSend/{email}")
	public ResponseEntity<String> mailSend(@PathVariable String email) {
		return ResponseEntity.ok().body(mailSendService.sendMail(email));
	}

	// 이메일 중복 체크
	@GetMapping("/api/member/emailCheck/{email}")
	public ResponseEntity<Long> emailCheck(@PathVariable String email) {
		return ResponseEntity.ok().body(memberService.emailCheck(email));
	}


	// 닉네임 중복 체크
	@GetMapping("/api/member/nicknameCheck/{nickname}")
	public ResponseEntity<Long> nicknameCheck(@PathVariable String nickname) {
		return ResponseEntity.ok().body(memberService.nicknameCheck(nickname));
	}

	// 회원 가입
	@PostMapping("/api/member")
	public ResponseEntity<Member> signup(@RequestBody Member member){
		member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
		member.setAuthority("ROLE_USER");

		return ResponseEntity.ok().body(memberService.signup(member));
	}
	
	// 사용자 정보 가져오기
	@GetMapping("/api/member/{email}")
	public ResponseEntity<Member> getMemberInfo(@PathVariable String email){
		return ResponseEntity.ok().body(memberService.getMemberInfo(email));
	}
	
	// 사용자 수정 (닉네임, 생년원일)
	@PutMapping("/api/member/{email}")
	public ResponseEntity<Member> updateMemberInfo(@PathVariable String email, @RequestBody Member member){
		return ResponseEntity.ok().body(memberService.updateMemberInfo(email, member));
	}
	
	// 사용자 수정 (비밀번호)
	@PutMapping("/api/member/password/{email}")
	public ResponseEntity<Member> updateMemberPassword(@PathVariable String email, @RequestBody Member member){
		member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
		
		return ResponseEntity.ok().body(memberService.updateMemberPassword(email, member));
	}
	
	// 멤버 탈퇴
	@DeleteMapping("/api/member/{email}")
	public ResponseEntity<Integer> dropOutMember(@PathVariable String email){		
		return ResponseEntity.ok().body(memberService.dropOutMember(email));
	}
	

}
