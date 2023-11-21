package com.spring.wm.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

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
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "memberSeq")
	@SequenceGenerator(name="memberSeq", sequenceName = "member_seq", allocationSize = 1)
	private int memberCode;
	private String email;
	private String password;
	private String nickname;
	private String birthday;
	private int enabled;
	private String authority;
	private Timestamp regDate;

}
