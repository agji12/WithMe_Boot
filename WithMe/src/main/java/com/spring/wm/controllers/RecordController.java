package com.spring.wm.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecordController {
	
	@GetMapping("/record/toSearchRecord")
	public List<String> toSearchRecord() {
		System.out.println("gkdl");
		return Arrays.asList("첫번째 인사", "두번째 인사");
	}
	
}
