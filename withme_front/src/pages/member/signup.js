import { Container } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import { BiSmile } from "react-icons/bi";
import Navi from "../../components/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import EmailInputPage from "./emailInputPage";
import PasswordInputPage from "./passwordInputPage";
import NicknameInputPage from "./nicknameInputPage";

const BsArrowRightCss = styled(BsArrowRight)`
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Signup = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });
  const [showEmailInputPage, setShowEmailInputPage] = useState(true);
  const [showPasswordInputPage, setShowPasswordInputPage] = useState(false);
  const [showNicknameInputPage, setShowNicknameInputPage] = useState(false);
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

  const signupMember = (nickname, birthday) => {
    console.log("가입 할수 있음");
    axios
      .post(
        "/member/signup",
        {
          email: member.email,
          password: member.password,
          nickname: nickname,
          birthday: birthday,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (resp) {
        console.log("가입 성공!");
        setShowNicknameInputPage(false);
        setShowSignupSuccessPage({ display: "block" });
      })
      .catch(function (resp) {
        console.log("가입 실패");
      });
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
          {showNicknameInputPage && (
            <NicknameInputPage signupMember={signupMember} />
          )}
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
