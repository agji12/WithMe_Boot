package com.spring.wm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.wm.entity.Duo;
import com.spring.wm.entity.Member;
import com.spring.wm.repositories.DuoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DuoService {
	
	private final DuoRepository duoRepository;
	
	public List<Object[]> getDuoSearch(){
		List<Object[]> result =  duoRepository.getFindAll();
		for(Object[] j : result) {
			Duo duo = (Duo) j[0];
			Member member = (Member) j[1];
			System.out.println(duo.toString());
		}
		
		return duoRepository.getFindAll();
	}
	
	public Duo postDuoSearch(Duo duo) {
		System.out.println(duo.toString());
		return duoRepository.save(duo);
	}
	
	
}
