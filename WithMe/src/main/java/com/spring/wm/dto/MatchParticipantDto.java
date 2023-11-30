package com.spring.wm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatchParticipantDto {
	
	private int assists;
	private int champLevel;
	private int championId;
	private String championName;
	private int deaths;
	private int kills;
	private String riotIdGameName;
	private String riotIdTagline;
	private int summonerLevel;
	private String summonerName;
	private int teamId;
	private boolean teamEarlySurrendered;
	private boolean win;
	
}
