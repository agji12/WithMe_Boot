package com.spring.wm.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.entity.Duo;
import com.spring.wm.entity.DuoReply;
import com.spring.wm.entity.Member;
import com.spring.wm.services.DuoService;
import com.spring.wm.services.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DuoController {
	
	private final DuoService duoService;
	private final MemberService memberService;
	
	// 듀오 찾기 글, 댓글 가져오기
	@GetMapping("/api/duo/duoSearch")
	public ResponseEntity<Map<String, Object>> getDuoSearch(){
		
		// 글 List
		List<Object[]> duoList = duoService.getDuoSearch();
		
		// 댓글 List
		List<Object[]> duoReplyList = duoService.getDuoReply();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("duoList", duoList);
		map.put("duoReplyList", duoReplyList);
		
		return ResponseEntity.ok().body(map);
	}
	
	// 듀오 찾기 글 등록
	@PostMapping("/api/duo/duoSearch")
	public ResponseEntity<Duo> postDuoSearch(@RequestBody Duo duo, Authentication authentication){
		duo.setMemberCode(memberService.getMemberInfo(authentication.getName()));
		return ResponseEntity.ok().body(duoService.postDuoSearch(duo));
	}
	
	// 듀오 찾기 댓글 입력
	@PostMapping("/api/duo/duoReply")
	public ResponseEntity<DuoReply> postDuoReply(@RequestBody DuoReply duoReply, Authentication authentication) {
		duoReply.setMemberCode(memberService.getMemberInfo(authentication.getName()));
		return ResponseEntity.ok().body(duoService.postDuoReply(duoReply));
	}
	
}
