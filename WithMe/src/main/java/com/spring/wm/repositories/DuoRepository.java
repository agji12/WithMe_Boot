package com.spring.wm.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.wm.entity.Duo;
import com.spring.wm.entity.DuoReply;

public interface DuoRepository extends JpaRepository<Duo, Long> {

	// 듀오 찾기 글 가져오기
	@Query("select d, m \r\n"
			+ "from Duo d \r\n"
			+ "left join d.memberCode m order by d.regDate desc \r\n")
	List<Object[]> getAllDuoSearch();

	// 부분별 듀오 찾기 글 가져오기
	@Query("select d, m.nickname \r\n"
			+ "from Duo d \r\n"
			+ "left join d.memberCode m \r\n"
			+ "order by d.duoCode desc \r\n")
	List<Object[]> getPartDuoSearch(Pageable pageable);

	// 부분별 듀오 찾기 댓글 가져오기
	@Query("select dr, m.nickname \r\n"
			+ "from DuoReply dr \r\n"
			+ "left join dr.memberCode m \r\n"
			+ "where dr.duoCode between :min and :max \r\n")
	List<Object[]> getPartDuoReplybetween(int min, int max);

	// 듀오 찾기 댓글 가져오기
	@Query("select dr, m \r\n"
			+ "from DuoReply dr \r\n"
			+ "left join dr.memberCode m order by dr.regDate asc \r\n")
	List<Object[]> getAllDuoReply();

	// 듀오 찾기 글 등록
	Duo save(Duo duo);

	// 듀오 찾기 댓글 등록
	DuoReply save(DuoReply duoReply);


}
