package com.spring.wm.services;

import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailSendService {
	
	private final JavaMailSenderImpl mailSender;
	
	// 6자리 인증 코드 생성
	private String makeRandomNumber() {
		Random random = new Random();
		int num = 0;
		String authNumber = "";
		
		for(int i = 0;i < 6;i++) {
			num = random.nextInt(10);
			authNumber += num;
		}
		
		return authNumber;
	}
	
	// 인증 메일 보내기
	public String sendMail(String email) {
		// 6자리 인증 코드
		String authNumber = makeRandomNumber();
		
		// 메일 내용
		String mailContent = "<h1>[이메일 인증]</h1><br><p>아래 숫자를 입력해 주세요.</p>"
                + "<h2>" + authNumber + "</h2>";
		
		try {
            MimeMessage mail = mailSender.createMimeMessage();
            mail.setSubject("With Me 회원가입 이메일 인증 ", "utf-8");
            mail.setText(mailContent, "utf-8", "html");
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            mailSender.send(mail);
            System.out.println("성공");
            
            return authNumber;
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("실패");
            
            return "0";
        }
	}
}
