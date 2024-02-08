package com.spring.wm.services;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String,String> redisTemplate;
	private final RedisTemplate<String,String> redisBlackListTemplate;

	// RefreshToken 등록
	public void setValues(String username, String refreshToken, long refreshExpiration) {
		ValueOperations<String, String> values = 
				redisTemplate.opsForValue();
		values.set(username, refreshToken, Duration.ofMillis(1800000)); //30분
	}

	// RefreshToken key 유무 조회
	public boolean getKeys(String username) {
		return redisTemplate.hasKey(username);
	}
	
	// RefreshToken 조회
	public String getValues(String username) {
		ValueOperations<String, String> values = 
				redisTemplate.opsForValue();
		return values.get(username);
	}

	// RefreshToken 삭제
	public Boolean delValues(String username) {
		return redisTemplate.delete(username);
	}

	// Access Token BlackList 등록
	public void setBlackListValues(String token, long remainingTime) {
		ValueOperations<String, String> values = 
				redisBlackListTemplate.opsForValue();
		values.set(token, "logout", Duration.ofMillis(remainingTime));
	}

	// Access Token BlackList 조회
	public boolean getBlackListValues(String accessToken) {
		return redisBlackListTemplate.hasKey(accessToken);
	}

}
