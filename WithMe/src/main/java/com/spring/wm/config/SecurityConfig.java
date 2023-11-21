package com.spring.wm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	

	@Autowired
	private CorsConfig corsConfig;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf().disable()
				//.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless 서버
				//.and()
				//.formLogin().disable()
				//.httpBasic().disable()
				//.apply(new MyCustomDsl()) // 커스텀 필터 등록
				//.and()
				.addFilter(corsConfig.corsFilter())
				.authorizeRequests(authroize -> authroize
						.antMatchers("/test/**")
						.access("hasRole('ROLE_USER')or hasRole('ROLE_ADMIN')")
						.antMatchers("/member/admin/**")
						.access("hasRole('ROLE_ADMIN')")
						.anyRequest().permitAll())
				//.successHandler(auth2SuccessHandler)
				.formLogin()
				.loginProcessingUrl("/login")
				.defaultSuccessUrl("/")
				.and()
				.build();
	}
	
	/*
	public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
		@Override
		public void configure(HttpSecurity http) throws Exception {
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
			http
					.addFilter(corsConfig.corsFilter()) // 인증x : @CrossOrigin, 인증o : 시큐리티 필터에 등록
					.addFilter(new JwtAuthenticationFilter(authenticationManager))
					.addFilter(new JwtAuthorizationFilter(authenticationManager, memberDAO));
		}
	}
	*/
}
