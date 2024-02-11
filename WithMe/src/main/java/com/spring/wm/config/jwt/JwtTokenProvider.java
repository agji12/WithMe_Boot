package com.spring.wm.config.jwt;

import java.security.Key;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.spring.wm.config.auth.PrincipalDetails;
import com.spring.wm.config.auth.PrincipalDetailsService;
import com.spring.wm.exception.ErrorMessage;
import com.spring.wm.exception.custom.MemberAuthException;
import com.spring.wm.services.RedisService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {
	
	@Value("${jwt.access_expiration}")
	private long accessExpiration;

	@Value("${jwt.refresh_expiration}")
	private long refreshExpiration;
	
	private final Key secretKey;
	
	@Autowired
	private PrincipalDetailsService principalDetailsService;
	
	@Autowired
	private RedisService redisService;
	
	public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
		secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

	public String createAccessToken(String email){	
		Date now = new Date();
		Date expireTime = new Date(now.getTime() + accessExpiration);
		//Date expireTime = new Date(now.getTime() + 60000); // 1분
		
		return Jwts.builder()
				.setSubject(email)
				.claim("email", email)
				.setIssuedAt(now)
				.setExpiration(expireTime)
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String createRefreshToken(String email){
		Date now = new Date();
		Date expireTime = new Date(now.getTime() + refreshExpiration);
		//Date expireTime = new Date(now.getTime() + 300000); // 5분
		
		String refreshToken = Jwts.builder()
				.setSubject(email)
				.claim("email", email)
				.setIssuedAt(now)
				.setExpiration(expireTime)
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
		
		// Redis에 refreshToken 저장
		redisService.setValues(email, refreshToken, refreshExpiration);
		
		return refreshToken;
	}
	
	public void saveRefreshTokenAtCookie(String refreshToken, HttpServletResponse response) {
		Cookie c = new Cookie("RefreshToken", refreshToken);
		c.setHttpOnly(true);
		c.setSecure(true);
		c.setMaxAge(Math.toIntExact(refreshExpiration));
		response.addCookie(c);
	}
	
	public boolean validateToken(String token){
		System.out.println("validateToken");
		
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		}catch(SignatureException e) { // 변조된 토큰
			log.info("SignatureException");
		}catch(MalformedJwtException e) { // 잘못된 형식의 토큰
			log.info("MalformedJwtException");
		}catch(ExpiredJwtException e) { // 토큰 만료
			log.info("ExpiredJwtException");
		}catch(UnsupportedJwtException e) { // jwt가 지원하지 않는 형식
			log.info("UnsupportedJwtException");
		}catch(Exception e) {
			log.info(e.getMessage());
		}
		return false;
		
	}
	
	public Authentication getAuthentication(String token) {
		String email = Jwts.parserBuilder().setSigningKey(secretKey).build()
							.parseClaimsJws(token).getBody().get("email").toString();
		
		PrincipalDetails principalDetails = 
				(PrincipalDetails) principalDetailsService.loadUserByUsername(email);
		return new UsernamePasswordAuthenticationToken(principalDetails, "", principalDetails.getAuthorities());
	}
	
	public boolean isLogout(String token) {
		return redisService.getBlackListValues(token);
	}
	
	public String getUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey).build()
				.parseClaimsJws(token).getBody().get("email").toString();
	}
	
	public long remainingTime(String token) {
		long now = new Date().getTime();
		long time = Jwts.parserBuilder().setSigningKey(secretKey).build()
				.parseClaimsJws(token).getBody().getExpiration().getTime();
		return time-now;
	}
	
	public String eliminateType(String BearerToken) {
		return BearerToken.replace("Bearer ", "");
	}
}
