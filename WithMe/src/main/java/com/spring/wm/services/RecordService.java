package com.spring.wm.services;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.spring.wm.dto.SummonerInfoDTO;
import com.spring.wm.dto.SummonerTierDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordService {

	@Value("${RiotApi-Key}")
	private String riotApiKey;

	private ObjectMapper objectMapper = new ObjectMapper();	
	private final Gson gson;

	// 서버 지역 - kr
	private String krServerUrl = "https://kr.api.riotgames.com";

	// 서버 지역 - Asia
	private String asiaServerUrl = "https://asia.api.riotgames.com";

	// 소환사 이름 검색 정보 가져오기
	public SummonerInfoDTO callAPISummonerByName(String summonerName) {
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
            //SummonerInfoDTO summonerInfoDTO = objectMapper.readValue(entity.getContent(), SummonerInfoDTO.class);
			SummonerInfoDTO summonerInfoDTO = gson.fromJson(responseBody, SummonerInfoDTO.class);

			return summonerInfoDTO;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 소환사 티어 정보 불러오기
	public List<SummonerTierDTO> callAPIRankById(String summonerId) {
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
			Type listType = new TypeToken<ArrayList<SummonerTierDTO>>(){}.getType();
			List<SummonerTierDTO> summonerTierDTO = gson.fromJson(responseBody, listType);

			System.out.println(responseBody);

			return summonerTierDTO;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}


}
