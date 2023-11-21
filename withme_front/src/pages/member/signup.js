import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { BiSmile } from "react-icons/bi";
import Navi from "../../components/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import EmailInputPage from "./emailInputPage";
import PasswordInputPage from "./passwordInputPage";

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

const BsArrowRightCss = styled(BsArrowRight)`
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Signup = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
    nickname: "",
    birthday: "",
  });
  const [nicknameValidFlag, setNicknameValidFlag] = useState(false);
  const [birthdayValidFlag, setBirthdayValidFlag] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState({
    icon: "",
    message: "",
  });
  const [birthdayMessage, setBirthdayMessage] = useState({
    icon: "",
    message: "",
  });
  const [showEmailInputPage, setShowEmailInputPage] = useState(true);
  const [showPasswordInputPage, setShowPasswordInputPage] = useState(false);
  const [showNicknameInputPage, setShowNicknameInputPage] = useState({
    display: "none",
  });
  const [showDuplicateEmailPage, setShowDuplicateEmailPage] = useState({
    display: "none",
  });
  const [showSignupSuccessPage, setShowSignupSuccessPage] = useState({
    display: "none",
  });

  const onClickShowPassword = (email, count) => {
    if (count === 0) {
      setMember({ ...member, email: email });
      setShowEmailInputPage(false);
      setShowPasswordInputPage(true);
    } else {
      setShowEmailInputPage(false);
      setShowDuplicateEmailPage({ display: "block" });
    }
  };

  const onClickShowNickname = (password) => {
    setMember({ ...member, password: password });
    setShowPasswordInputPage(false);
    setShowNicknameInputPage({ display: "block" });
  };

  // 닉네임 유효성 검사
  const nicknameValidCheck = (nickname) => {
    let regexNickname = /^[A-Za-z가-힣ㄱ-ㅎ0-9]{2,12}$/;

    if (nickname !== "") {
      // 닉네임 중복 검사
      axios
        .get(`/member/nicknameCheck/${nickname}`)
        .then(function (resp) {
          if (resp.data === 0 && regexNickname.test(nickname)) {
            setMember({ ...member, nickname: nickname });
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
          setMember({ ...member, birthday: birthday });
          return true;
        }
      } else {
        setBirthdayMessage({ icon: "", message: "" });
        setBirthdayValidFlag(true);
        setMember({ ...member, birthday: birthday });
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
      console.log("가입 할수 있음");
      axios
        .post("/member/signup", JSON.stringify(member), {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (resp) {
          console.log("가입 성공!");
          setShowNicknameInputPage(false);
          setShowSignupSuccessPage({ display: "block" });
        })
        .catch(function (resp) {
          console.log("가입 실패");
        });
    } else {
      alert("닉네임과 생년월일을 정확하게 입력해 주세요!");
    }
  };

  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-3">
          <h1 style={{ fontWeight: "bold" }}>With Me 회원 가입</h1>
        </div>
        <div>
          {showEmailInputPage && (
            <EmailInputPage onClickShowPassword={onClickShowPassword} />
          )}
          {showPasswordInputPage && (
            <PasswordInputPage onClickShowNickname={onClickShowNickname} />
          )}
        </div>
        <div className="mb-3" style={showNicknameInputPage}>
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
        </div>
        <div className="mb-3" style={showDuplicateEmailPage}>
          <h3>이미 존재하는 이메일입니다.</h3>
          아래의 링크를 통해 로그인을 할 수 있습니다!
        </div>
        <div className="mb-3" style={showSignupSuccessPage}>
          <h3>
            회원 가입을 축하합니다! <BiSmile />
          </h3>
          아래의 링크를 통해 로그인을 할 수 있습니다!
        </div>
        <div className="mb-3">
          <Link to={"/member/login"}>
            다시 로그인하러 가기
            <BsArrowRightCss />
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Signup;
