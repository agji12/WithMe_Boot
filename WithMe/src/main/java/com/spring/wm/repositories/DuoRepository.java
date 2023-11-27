package com.spring.wm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.wm.entity.Duo;
import com.spring.wm.entity.DuoReply;

public interface DuoRepository extends JpaRepository<Duo, Long> {
	
	// 듀오 찾기 글 가져오기
	@Query("select d, m \r\n"
			+ "from Duo d\r\n"
			+ "left join d.memberCode m \r\n")
	List<Object[]> getFindAll();
	
	List<Duo> findAll();
	
	// 듀오 찾기 글 등록
	Duo save(Duo duo);
	
	// 듀오 찾기 댓글 등록
	DuoReply save(DuoReply duoReply);
	
}
