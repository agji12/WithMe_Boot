package com.spring.wm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.wm.entity.Member;
import com.spring.wm.repositories.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;
	
	public Long emailCheck(String email){
		return memberRepository.countByEmail(email);
	}
	
	public Long nicknameCheck(String nickname){
		return memberRepository.countByNickname(nickname);
	}
	
	public Member signup(Member member) {
		return memberRepository.save(member);
	}
	
	public Member getMemberInfo(String email) {
		return memberRepository.findByEmail(email);
	}
	
	@Transactional
	public Member updateMemberInfo(String email, Member member) {
		Member m =  memberRepository.findByEmail(email);
		m.setNickname(member.getNickname());
		m.setBirthday(member.getBirthday());
		return m;
	}
	
	@Transactional
	public Member updateMemberPassword(String email, Member member) {
		Member m = memberRepository.findByEmail(email);
		m.setPassword(member.getPassword());
		return m;
	}
	
	@Transactional
	public int dropOutMember(String email) {
		return memberRepository.deleteByEmail(email);
	}
	
	
}
