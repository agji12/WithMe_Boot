package com.spring.wm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.spring.wm.config.jwt.JwtAuthenticationFilter;
import com.spring.wm.config.jwt.JwtAuthorizationFilter;
import com.spring.wm.repositories.MemberRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private CorsConfig corsConfig;
	
	@Value("${Jwt.secret}")
	private String secret;
	
	@Value("${Jwt.header_string}")
	private String header_string;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless 서버
				.and()
				.formLogin().disable()
				.httpBasic().disable()
				.apply(new MyCustomDsl()) // 커스텀 필터 등록
				.and()
				.authorizeRequests(authroize -> authroize
						.antMatchers("/member/admin/**")
						.access("hasRole('ROLE_ADMIN')")
						.antMatchers("/**").permitAll())
				//.anyRequest().permitAll())
				.build();
	}


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


}
