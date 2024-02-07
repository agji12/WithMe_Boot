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
import com.spring.wm.exception.auth.ErrorMessage;
import com.spring.wm.exception.auth.TokenValidateException;

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
	
	public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
		secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

	public String createAccessToken(Authentication authentication){	
		Date now = new Date();
		Date expireTime = new Date(now.getTime() + accessExpiration);
		
		return Jwts.builder()
				.setSubject(authentication.getName())
				.claim("email", authentication.getName())
				.setIssuedAt(now)
				.setExpiration(expireTime)
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String createRefreshToken(Authentication authentication){
		Date now = new Date();
		Date expireTime = new Date(now.getTime() + refreshExpiration);
		
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		
		return Jwts.builder()
				.setSubject(principalDetails.getMember().getEmail())
				.claim("email", principalDetails.getMember().getEmail())
				.setIssuedAt(now)
				.setExpiration(expireTime)
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
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
			throw new TokenValidateException(ErrorMessage.INVALID_TOKEN);
		}catch(MalformedJwtException e) { // 잘못된 형식의 토큰
			throw new TokenValidateException(ErrorMessage.MALFORMED_TOKEN);
		}catch(ExpiredJwtException e) { // 토큰 만료
			throw new TokenValidateException(ErrorMessage.TIME_EXPIRED_TOKEN);
		}catch(UnsupportedJwtException e) { // jwt가 지원하지 않는 형식
			throw new TokenValidateException(ErrorMessage.UNSUPPORTED_TOKEN);
		}catch(Exception e) {
			throw new TokenValidateException(ErrorMessage.UNKNOWN_ERROR_TOKEN);
		}
		
	}
	
	public Authentication getAuthentication(String token) {
		String email = Jwts.parserBuilder().setSigningKey(secretKey).build()
							.parseClaimsJws(token).getBody().get("email").toString();
		
		PrincipalDetails principalDetails = 
				(PrincipalDetails) principalDetailsService.loadUserByUsername(email);
		return new UsernamePasswordAuthenticationToken(principalDetails, "", principalDetails.getAuthorities());
	}
	
	public String eliminateType(String BearerToken) {
		return BearerToken.replace("Bearer ", "");
	}
}
