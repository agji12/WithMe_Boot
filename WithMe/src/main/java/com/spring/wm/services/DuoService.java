package com.spring.wm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.wm.entity.Duo;
import com.spring.wm.entity.DuoReply;
import com.spring.wm.entity.Member;
import com.spring.wm.repositories.DuoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DuoService {
	
	private final DuoRepository duoRepository;
	
	public List<Object[]> getDuoSearch(){
		List<Object[]> result =  duoRepository.getAllDuoSearch();
		for(Object[] j : result) {
			Duo duo = (Duo) j[0];
			Member member = (Member) j[1];
			
		}
		
		return duoRepository.getAllDuoSearch();
	}
	
	public List<Object[]> getDuoReply(){
		List<Object[]> result =  duoRepository.getAllDuoReply();
		for(Object[] j : result) {
			DuoReply duo = (DuoReply) j[0];
			Member member = (Member) j[1];
			System.out.println(duo.toString());
		}
		return duoRepository.getAllDuoReply();
	}
	
	public Duo postDuoSearch(Duo duo) {
		return duoRepository.save(duo);
	}
	
	public DuoReply postDuoReply(DuoReply duoReply) {
		return duoRepository.save(duoReply);
	}
	
	
}
