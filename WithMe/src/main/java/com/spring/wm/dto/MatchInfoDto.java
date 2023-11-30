package com.spring.wm.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatchInfoDto {
	
	private long gameEndTimestamp;
	private int mapId;
	private int queueId;
	private long gameStartTimestamp;
	private List<MatchParticipantDto> participants;
	
}
