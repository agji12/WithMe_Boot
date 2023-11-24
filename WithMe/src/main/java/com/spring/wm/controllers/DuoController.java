package com.spring.wm.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.entity.Duo;
import com.spring.wm.services.DuoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DuoController {
	
	private final DuoService duoService;
	
	// 듀오 찾기 글, 댓글 가져오기
	@GetMapping("/duo/duoSearch")
	public ResponseEntity<List<Duo>> getDuoSearch(){
		return new ResponseEntity<List<Duo>>(duoService.getDuoSearch(),HttpStatus.OK);
	}
	
	// 듀오 찾기 글 등록
	@PostMapping("/duo/duoSearch")
	public ResponseEntity<Duo> postDuoSearch(@RequestBody Duo duo){
		System.out.println("여기");
		// memberCode 나중에 받아오도록 수정
		duo.setMemberCode(2);
		return new ResponseEntity<Duo>(duoService.postDuoSearch(duo),HttpStatus.OK);
	}
	
	
	// 듀오 찾기 댓글 입력
	
}
