package com.spring.wm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.wm.entity.Duo;

public interface DuoRepository extends JpaRepository<Duo, Long> {
	
	// 듀오 찾기 글 가져오기
	List<Duo> findAll();
	
	// 듀오 찾기 글 등록
	Duo save(Duo duo);
	
}
