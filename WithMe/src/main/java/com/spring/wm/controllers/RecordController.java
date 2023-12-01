package com.spring.wm.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.spring.wm.dto.MatchInfoDto;
import com.spring.wm.dto.RiotIdDto;
import com.spring.wm.dto.SummonerInfoDto;
import com.spring.wm.dto.SummonerTierDto;
import com.spring.wm.services.RecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RecordController {
	
	@Value("${Datadragon-version}")
	private String ddragonVer;
	
	private final RecordService recordService;

	@GetMapping("/record/searchRecord/{searchName}")
	public ResponseEntity<Map<String, Object>> toSearchRecord(@PathVariable String searchName) {
		
		// 소환사 이름 검색 정보 (닉네임, 레벨, 아이콘ID)
		searchName = searchName.replaceAll(" ", "%20"); // 공백 제거
		SummonerInfoDto summonerInfo = new SummonerInfoDto();
		RiotIdDto riotId = new RiotIdDto();
		
		if(searchName.contains("#")) {
			// Riot ID로 검색 하는 경우
			riotId = recordService.callAPIRiotId(searchName);
			recordService.callAPISummonerByPuuid(riotId.getPuuid());
		}{
			// 소환사 이름으로 검색 하는 경우
			summonerInfo = recordService.callAPISummonerByName(searchName);
			riotId = recordService.callAPIRiotId(summonerInfo.getPuuid());
		}
		
		// 소환사 이름 티어 정보 (솔로랭크, 자유랭크)
		String summonerId = summonerInfo.getId();
		List<SummonerTierDto> summonerTier = recordService.callAPIRankById(summonerId);

		// 소환사 최근 매치 10개의 ID 정보
		String summonerPuuid = summonerInfo.getPuuid();
		JsonArray summonerMatchId = recordService.callAPIMatchIdByPuuid(summonerPuuid, 0, 10);

		// 소환사 최근 매치 10개의 세부 정보 (게임 시간, 승리팀, 게임 참가자 정보)
		List<MatchInfoDto> matchList = new ArrayList<>();

		// 완성 후 2 -> summonerMatchId.size()
		for(int i=0; i < 2; i++) {
			matchList.add(recordService.callAPIMatchById(summonerMatchId.get(i)));
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ddragonVer", ddragonVer);
		map.put("riotId", riotId);
		map.put("summonerInfo", summonerInfo);
		map.put("summonerTier", summonerTier);
		map.put("matchList", matchList);

		return ResponseEntity.ok().body(map);
	}
	
	@GetMapping("/record/additionalMatch")
	public ResponseEntity<List<MatchInfoDto>> additionalMatch(@RequestParam String puuid, @RequestParam int start, @RequestParam int count) {
		
		// 추가 매치 5개의 ID 정보
		JsonArray summonerMatchId = recordService.callAPIMatchIdByPuuid(puuid, start, count);
		
		// 추가 매치 5개의 세부 정보
		List<MatchInfoDto> addtionalMatchList = new ArrayList<>();
		
		for(int i=0; i < summonerMatchId.size(); i++) {
			addtionalMatchList.add(recordService.callAPIMatchById(summonerMatchId.get(i)));
		}
		
		return ResponseEntity.ok().body(addtionalMatchList);
	}

}
