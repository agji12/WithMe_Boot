package com.spring.wm.repositories;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.wm.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	// 이메일 중복 체크
	public Long countByEmail(String email);
	
	// 닉네임 중복 체크
	public Long countByNickname(String nickname);
	
	// 회원 가입
	public Member save(Member member);
	
	// 사용자 아이디 확인 및 가져오기
	public Member findByEmail(String email);
	
	
}
