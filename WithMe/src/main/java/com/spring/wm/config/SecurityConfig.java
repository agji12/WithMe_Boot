package com.spring.wm.config;

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

import com.spring.wm.config.jwt.JwtAuthenticationFilter;
import com.spring.wm.config.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	private final CorsConfig corsConfig;
	private final JwtTokenProvider jwtTokenProvider;

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


}
