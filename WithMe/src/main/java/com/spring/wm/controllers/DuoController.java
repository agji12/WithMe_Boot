package com.spring.wm.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@GetMapping("/api/duo/duoSearch/{page}")
	public ResponseEntity<Map<String, Object>> getDuoSearch(@PathVariable int page){
		
		// 글 List
		List<Object[]> duoList = duoService.getPartDuoSearch(page);
		
		// 글 List 중 가장 큰 DUOCODE와 가장 작은 DUOCODE를 뽑아
		// 사이에 있는 댓글 리스트만 조회
		Duo maxCode = (Duo) duoList.get(0)[0];
		Duo minCode = (Duo) duoList.get(11)[0];
		
		// 댓글 List
		List<Object[]> duoReplyList = duoService.getPartDuoReply(minCode.getDuoCode(), maxCode.getDuoCode());
		
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
	
	// DUO 자동 입력
	@PostMapping("/api/duo/auto")
	public ResponseEntity<String> autoPostDuo(@RequestBody Duo duo, Authentication authentication){
		duo.setMemberCode(memberService.getMemberInfo(authentication.getName()));
		duo.setMyPositionCode(0);
		duo.setSearchingPosition("0");
		duo.setQueueCode(1003);
		duo.setTierCode(101);
		duo.setMicrophone("false");
		//duo.setSummonerName("test113");
		duoService.autoPostDuo(duo);

		return ResponseEntity.ok().body("완료");
	}
	
}
