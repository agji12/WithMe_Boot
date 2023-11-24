package com.spring.wm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.wm.entity.Duo;
import com.spring.wm.repositories.DuoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DuoService {
	
	private final DuoRepository duoRepository;
	
	public List<Duo> getDuoSearch(){
		return duoRepository.findAll();
	}
	
	public Duo postDuoSearch(Duo duo) {
		System.out.println(duo.toString());
		return duoRepository.save(duo);
	}
	
	
}
