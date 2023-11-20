import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import Navi from "../navbar/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import EmailInputPage from "../../components/member/emailInputPage";
import PasswordInputPage from "../../components/member/passwordInputPage";
import NicknameInputPage from "../../components/member/nicknameInputPage";

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
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    birthday: "",
  });
  const [showEmailInputPage, setShowEmailInputPage] = useState(true);
  const [showPasswordInputPage, setShowPasswordInputPage] = useState(false);
  const [showNicknameInputPage, setShowNicknameInputPage] = useState(true);

  const onClickShowPassword = (email) => {
    console.log(email);
    setUserInfo({ ...userInfo, email: email });
    setShowEmailInputPage(false);
    setShowPasswordInputPage(true);
  };

  const onClickShowNickname = (password) => {
    setUserInfo({ ...userInfo, password: password });
    setShowPasswordInputPage(false);
    setShowNicknameInputPage(true);
  };

  const signupMember = (nickname, birthday) => {
    setUserInfo({ ...userInfo, nickname: nickname });
    setUserInfo({ ...userInfo, birthday: birthday });
    console.log("가입할게!");
    // 가입 진행 axios
  };

  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-3">
          <h1 style={{ fontWeight: "bold" }}>회원가입 페이지</h1>
        </div>
        <div>
          {/*{showEmailInputPage && <EmailInputPage onClickShowPassword={onClickShowPassword} />}*/}
          {showPasswordInputPage && (
            <PasswordInputPage onClickShowNickname={onClickShowNickname} />
          )}
          {showNicknameInputPage && (
            <NicknameInputPage signupMember={signupMember} />
          )}
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
