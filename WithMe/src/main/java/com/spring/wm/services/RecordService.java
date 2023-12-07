package com.spring.wm.services;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
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
	public SummonerInfoDto callAPISummonerByName(String summonerName) {
		try {
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(krServerUrl + "/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + riotApiKey);
			
			System.out.println("Executing request " + httpGet.getRequestLine());
			
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
						
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);
			SummonerInfoDto summonerInfoDTO = gson.fromJson(responseBody, SummonerInfoDto.class);

			return summonerInfoDTO;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 puuid로 검색 후 정보 가져오기
	public SummonerInfoDto callAPISummonerByPuuid(String puuid) {
		try {
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(krServerUrl + "/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + riotApiKey);

			System.out.println("Executing request " + httpGet.getRequestLine());
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);
			SummonerInfoDto summonerInfoDTO = gson.fromJson(responseBody, SummonerInfoDto.class);

			return summonerInfoDTO;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 RiotId 가져오기
	public RiotIdDto callAPIRiotId(String search) {
		try {
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
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);

			RiotIdDto riotIdDto = gson.fromJson(responseBody, RiotIdDto.class);

			return riotIdDto;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 티어 정보 불러오기
	public List<SummonerTierDto> callAPIRankById(String summonerId) {
		try {
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(krServerUrl + "/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + riotApiKey);

			System.out.println("Executing request " + httpGet.getRequestLine());
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);

			// TypeToken 방식
			Type listType = new TypeToken<ArrayList<SummonerTierDto>>(){}.getType();
			List<SummonerTierDto> summonerTierDTO = gson.fromJson(responseBody, listType);

			System.out.println(responseBody);

			return summonerTierDTO;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 최근 매치 ID 불러오기(10개) & 추가 매치 ID 불러오기(5개)
	public JsonArray callAPIMatchIdByPuuid(String summonerPuuid, int start, int count) {
		try {
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(asiaServerUrl + "/lol/match/v5/matches/by-puuid/" + summonerPuuid + "/ids?start=" + start 
					+ "&count=" + count + "&api_key=" + riotApiKey);

			System.out.println("Executing request " + httpGet.getRequestLine());
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);
			
			// String to JSONArray
			JsonArray array = gson.fromJson(responseBody, JsonArray.class);
			
			return array;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 최근 매치 세부 정보 불러오기(10개) & 추가 매치 세부 정보 불러오기(5개)
	public MatchInfoDto callAPIMatchById(JsonElement summonerMatchId) {
		try {
			// summonerMatchId에 포함된 큰따옴표 제거
			String str = gson.toJson(summonerMatchId).replace("\"", "");

			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(asiaServerUrl + "/lol/match/v5/matches/" + str + "?api_key=" + riotApiKey);

			System.out.println("Executing request " + httpGet.getRequestLine());
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {

				@Override
				public String handleResponse(
						final HttpResponse response) throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity) : null;
					} else {
						throw new ClientProtocolException("Unexpected response status: " + status);
					}
				}

			};
			String responseBody = httpClient.execute(httpGet, responseHandler);
			System.out.println(responseBody);

			// JSON 형태로 변환해 "info"에 해당하는 데이터만 추출
			JsonElement jsonElement = gson.fromJson(responseBody, JsonElement.class);
			JsonObject jsonObject = jsonElement.getAsJsonObject();
			String info = jsonObject.get("info").toString();

			MatchInfoDto matchInfoDTO = gson.fromJson(info, MatchInfoDto.class);

			return matchInfoDTO;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}


}
