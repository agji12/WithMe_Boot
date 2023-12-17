import { Input, Col, Button } from "reactstrap";
import { BsInfoCircle } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const DivInfo = styled.div`
  color: rgba(33, 37, 41, 0.75);
  font-size: small;
`;

const DivValidCheck = styled.div`
  color: red;
  font-size: small;
`;

const BtnDiv = styled.div`
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
`;

const NicknameInputPage = ({ signupMember }) => {
  const [nickname, setNickname] = useState("");
  const [nicknameValidFlag, setNicknameValidFlag] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [birthdayValidFlag, setBirthdayValidFlag] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState({
    icon: "",
    message: "",
  });
  const [birthdayMessage, setBirthdayMessage] = useState({
    icon: "",
    message: "",
  });

  const nicknameValidCheck = (nickname) => {
    let regexNickname = /^[A-Za-z가-힣ㄱ-ㅎ0-9]{2,12}$/;

    if (nickname !== "") {
      // 닉네임 중복 검사
      axios
        .get(`/api/member/nicknameCheck/${nickname}`)
        .then(function (resp) {
          if (resp.data === 0 && regexNickname.test(nickname)) {
            setNickname(nickname);
            setNicknameMessage({ icon: "", message: "" });
            setNicknameValidFlag(true);
          } else if (resp.data === 0 && !regexNickname.test(nickname)) {
            setNicknameMessage({
              icon: <BsInfoCircle />,
              message: " 닉네임의 형식이 일치하지 않습니다.",
            });
          } else if (resp.data === 1) {
            setNicknameMessage({
              icon: <BsInfoCircle />,
              message: " 이미 존재하는 닉네임입니다.",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // 생년월일 유효성 검사
  const birthdayValidCheck = (birthday) => {
    let year = Number(birthday.substr(0, 4));
    let month = Number(birthday.substr(4, 2));
    let day = Number(birthday.substr(6, 2));

    let todayYear = new Date().getFullYear(); // 올해 연도

    if (birthday.length === 8) {
      // 연도의 경우 1950 보다 작거나 todayYear 보다 크다면 false를 반환
      if (year < 1950 || year > todayYear) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 연도를 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (month < 1 || month > 12) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 월을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (day < 1 || day > 31) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 일을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day === 31
      ) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 일을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (month === 2) {
        let isleap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (day > 29 || (day === 29 && !isleap)) {
          setBirthdayMessage({
            icon: <BsInfoCircle />,
            message: " 일을 정확하게 입력해 주세요",
          });
          setBirthdayValidFlag(false);
          return false;
        } else {
          setBirthdayMessage({ icon: "", message: "" });
          setBirthdayValidFlag(true);
          setBirthday(birthday);
          return true;
        }
      } else {
        setBirthdayMessage({ icon: "", message: "" });
        setBirthdayValidFlag(true);
        setBirthday(birthday);
        return true;
      }
    } else {
      setBirthdayMessage({
        icon: <BsInfoCircle />,
        message: " 생년월일의 형식이 일치하지 않습니다",
      });
      setBirthdayValidFlag(false);
    }
  };

  const flagCheck = () => {
    if (nicknameValidFlag && birthdayValidFlag) {
      signupMember(nickname, birthday);
    } else {
      alert("닉네임과 생년월일을 정확하게 입력해 주세요!");
    }
  };

  return (
    <>
      <div className="mb-3">
        <Col lg={8}>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            onChange={(e) => {
              nicknameValidCheck(e.target.value);
            }}
          />
          <DivInfo>특수문자를 제외한 2~12자로 입력해 주세요!</DivInfo>
          <DivValidCheck>
            {nicknameMessage.icon}
            {nicknameMessage.message}
          </DivValidCheck>
        </Col>
      </div>
      <div className="mb-3">
        <Col lg={8}>
          <Label htmlFor="birthday">생년월일</Label>
          <Input
            id="birthday"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              birthdayValidCheck(e.target.value);
            }}
          />
          <DivInfo>연도/월/일 순으로 입력해 주세요!</DivInfo>
          <DivValidCheck>
            {birthdayMessage.icon}
            {birthdayMessage.message}
          </DivValidCheck>
        </Col>
      </div>
      <BtnDiv className="mb-3">
        <Col lg={8}>
          <Button color="primary" onClick={flagCheck}>
            가입하기
          </Button>
        </Col>
      </BtnDiv>
    </>
  );
};
export default NicknameInputPage;
