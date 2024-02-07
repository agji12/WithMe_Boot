package com.spring.wm.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.spring.wm.config.auth.PrincipalDetailsService;
import com.spring.wm.config.jwt.JwtAuthenticationFilter;
import com.spring.wm.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	//private final MemberRepository memberRepository;
	private final CorsConfig corsConfig;
	private final JwtTokenProvider jwtTokenProvider;
	private final PrincipalDetailsService principalDetailsService;

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.header_string}")
	private String header_string;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless 서버
				.and()
				.formLogin().disable()
				.httpBasic().disable()
				//.apply(new MyCustomDsl()) // 커스텀 필터 등록
				//.and()
				.addFilter(corsConfig.corsFilter())
				.authorizeRequests(authroize -> authroize
						.antMatchers("/member/admin/**")
						.access("hasRole('ROLE_ADMIN')")
						.antMatchers("/api/record/**").permitAll()
						.antMatchers("/api/duo/duoSearch/**").permitAll()
						.antMatchers("/api/member/mailSend/**", "/api/member/emailCheck/**",
								"/api/member/nicknameCheck/**", "/api/member", "/api/member/login").permitAll()
						.anyRequest().authenticated())
				//.anyRequest().permitAll())
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
				.build();
	}


	/*
	public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
		@Override
		public void configure(HttpSecurity http) throws Exception {
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
			http
			.addFilter(corsConfig.corsFilter()) // 인증x : @CrossOrigin, 인증o : 시큐리티 필터에 등록
			.addFilter(new JwtAuthenticationFilter(authenticationManager, secret, header_string))
			.addFilter(new JwtAuthorizationFilter(authenticationManager, memberRepository, secret, header_string));
		}
	}
	 */


}
