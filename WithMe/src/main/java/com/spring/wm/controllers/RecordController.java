package com.spring.wm.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spring.wm.dto.SummonerInfoDTO;
import com.spring.wm.dto.SummonerTierDTO;
import com.spring.wm.services.RecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RecordController {
	
	private final RecordService recordService;
	
	@GetMapping("/record/searchRecord/{summonerName}")
	public ResponseEntity<Map<String, Object>> toSearchRecord(@PathVariable String summonerName) {
		
		// 소환사 이름 검색 정보 (닉네임, 레벨, 아이콘ID)
		summonerName = summonerName.replaceAll(" ", "%20"); // 공백 제거
		SummonerInfoDTO summonerInfo = recordService.callAPISummonerByName(summonerName);
		System.out.println(summonerInfo);
		// 소환사 이름 티어 정보 (솔로랭크, 자유랭크)
		String summonerId = summonerInfo.getId();
		List<SummonerTierDTO> summonerTier = recordService.callAPIRankById(summonerId);
		
		 Map<String, Object> map = new HashMap<String, Object>();
		 map.put("summonerInfo", summonerInfo);
		 map.put("summonerTier", summonerTier);
		
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
}
