package com.spring.wm.services;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.spring.wm.dto.MatchInfoDto;
import com.spring.wm.dto.RiotIdDto;
import com.spring.wm.dto.SummonerInfoDto;
import com.spring.wm.dto.SummonerTierDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordService {

	@Value("${RiotApi-Key}")
	private String riotApiKey;

	private final Gson gson;

	// 서버 지역 - kr
	private String krServerUrl = "https://kr.api.riotgames.com";

	// 서버 지역 - Asia
	private String asiaServerUrl = "https://asia.api.riotgames.com";

	// 소환사 이름으로 검색 후 정보 가져오기
	public SummonerInfoDto callAPISummonerByName(String summonerName) throws Exception {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(krServerUrl + "/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + riotApiKey);

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);
		SummonerInfoDto summonerInfoDTO = gson.fromJson(responseBody, SummonerInfoDto.class);

		return summonerInfoDTO;
	}

	// 소환사 puuid로 검색 후 정보 가져오기
	public SummonerInfoDto callAPISummonerByPuuid(String puuid) throws Exception {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(krServerUrl + "/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + riotApiKey);

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);
		SummonerInfoDto summonerInfoDTO = gson.fromJson(responseBody, SummonerInfoDto.class);

		return summonerInfoDTO;
	}

	// 소환사 RiotId 가져오기
	public RiotIdDto callAPIRiotId(String search) throws Exception {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet();
		if(search.contains("#")) {
			// Riot ID로 검색 하는 경우
			String[] riotId = search.split("#");
			httpGet = new HttpGet(asiaServerUrl + "/riot/account/v1/accounts/by-riot-id/" + riotId[0] + "/" + riotId[1] + "?api_key=" + riotApiKey);				
		}else {
			// 소환사 이름으로 검색 하는 경우
			httpGet = new HttpGet(asiaServerUrl + "/riot/account/v1/accounts/by-puuid/" + search + "?api_key=" + riotApiKey);
		}

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);
		RiotIdDto riotIdDto = gson.fromJson(responseBody, RiotIdDto.class);

		return riotIdDto;
	}

	// 소환사 티어 정보 불러오기
	public List<SummonerTierDto> callAPIRankById(String summonerId) throws Exception {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(krServerUrl + "/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + riotApiKey);

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);

		// TypeToken 방식
		Type listType = new TypeToken<ArrayList<SummonerTierDto>>(){}.getType();
		List<SummonerTierDto> summonerTierDTO = gson.fromJson(responseBody, listType);

		return summonerTierDTO;
	}

	// 소환사 최근 매치 ID 불러오기(10개) & 추가 매치 ID 불러오기(5개)
	public JsonArray callAPIMatchIdByPuuid(String summonerPuuid, int start, int count) throws Exception {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(asiaServerUrl + "/lol/match/v5/matches/by-puuid/" + summonerPuuid + "/ids?start=" + start 
				+ "&count=" + count + "&api_key=" + riotApiKey);

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);

		// String to JSONArray
		JsonArray array = gson.fromJson(responseBody, JsonArray.class);

		return array;
	}

	// 소환사 최근 매치 세부 정보 불러오기(10개) & 추가 매치 세부 정보 불러오기(5개)
	public MatchInfoDto callAPIMatchById(JsonElement summonerMatchId) throws Exception {
		// summonerMatchId에 포함된 큰따옴표 제거
		String str = gson.toJson(summonerMatchId).replace("\"", "");

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(asiaServerUrl + "/lol/match/v5/matches/" + str + "?api_key=" + riotApiKey);

		System.out.println("Executing request " + httpGet.getRequestLine());

		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		String responseBody = httpClient.execute(httpGet, responseHandler);

		// JSON 형태로 변환해 "info"에 해당하는 데이터만 추출
		JsonObject jsonObject = gson.fromJson(responseBody, JsonObject.class);
		String info = jsonObject.get("info").toString();

		MatchInfoDto matchInfoDTO = gson.fromJson(info, MatchInfoDto.class);

		return matchInfoDTO;
	}


}
