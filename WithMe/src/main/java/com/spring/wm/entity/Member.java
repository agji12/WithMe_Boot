package com.spring.wm.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEMBERCODE")
	private int memberCode;
	
	private String email;
	
	private String password;
	
	private String nickname;
	
	private String birthday;
	
	private String authority;
	
	@CreationTimestamp
	@Column(name = "REGDATE")
	private Timestamp regDate;
	
	/*
	@OneToMany(mappedBy = "memberCode")
	private List<Duo> duos = new ArrayList<>();
	*/
}
