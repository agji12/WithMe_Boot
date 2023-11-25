package com.spring.wm.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Duo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "duoSeq")
	@SequenceGenerator(name="duoSeq", sequenceName = "duo_seq", allocationSize = 1)
	@Column(name = "DUOCODE")
	private int duoCode;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "MEMBERCODE")
	private Member memberCode;
	
	@Column(name = "MYPOSITIONCODE")
	private int myPositionCode;
	
	@Column(name = "QUEUECODE")
	private int queueCode;
	
	@Column(name = "TIERCODE")
	private int tierCode;
	
	@Column(name = "SUMMONERNAME")
	private String summonerName;
	
	@Column(name = "SEARCHINGPOSITION")
	private String searchingPosition;
	
	private String memo;
	
	private String microphone;
	
	@CreationTimestamp
	@Column(name = "REGDATE")
	private Timestamp regDate;
	
	
}
