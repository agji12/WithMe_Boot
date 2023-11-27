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
public class DuoReply {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "duoReplySeq")
	@SequenceGenerator(name="duoReplySeq", sequenceName = "duoreply_seq", allocationSize = 1)
	@Column(name = "DUOREPLYCODE")
	private int duoReplyCode;
	
	@Column(name = "DUOCODE")
	private int duoCode;
	
	@ManyToOne()
	@JoinColumn(name = "MEMBERCODE")
	private Member memberCode;
	
	private String content;
	
	@CreationTimestamp
	@Column(name = "REGDATE")
	private Timestamp regDate;
	
}
