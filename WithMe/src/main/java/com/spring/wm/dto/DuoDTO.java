package com.spring.wm.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DuoDTO {
	private int duoCode;
	private int memberCode;
	private int myPositionCode;
	private int queueCode;
	private int tierCode;
	private String summonerName;
	private String searchingPosition;
	private String memo;
	private String microphone;
	private Timestamp regDate;
	private String queueName;
	private String tierName;
	private String positionName;
	private String nickname;
	
}
