import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import Navi from "../navbar/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const DivEmailCheck = styled.div`
  color: red;
  font-size: small;
`;

const FindPassword = styled(Link)`
  font-size: small;
`;

const DivBtn = styled.div`
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
`;

const BsArrowRightCss = styled(BsArrowRight)`
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState({
    icon: "",
    message: "",
  });

  const emailCheck = (username, setUsernameMessage) => {
    let regexEmail = /[A-Za-z0-9]+?@[A-Za-z0-9]+?.com/;

    if (!regexEmail.test(username)) {
      console.log("xmffla");
      setUsernameMessage({
        icon: <BsInfoCircle />,
        message: " 이메일의 형식이 일치하지 않습니다.",
      });
    } else {
      setUsernameMessage({ icon: "", message: "" });
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
          <h1 style={{ fontWeight: "bold" }}>With Me 로그인</h1>
        </div>
        <div className="mb-3">
          <Col lg={8}>
            <Label htmlFor="username" className="mb-2">
              이메일 주소
            </Label>
            <br></br>
            <Input
              id="username"
              placeholder="name@example.com"
              onChange={(e) => {
                setUsername(e.target.value);
                emailCheck(e.target.value, setUsernameMessage);
              }}
            />
            <DivEmailCheck className="emailValidCheck">
              {usernameMessage.icon}
              {usernameMessage.message}
            </DivEmailCheck>
          </Col>
        </div>
        <div className="mb-3">
          <Col lg={8}>
            <Label htmlFor="password" className="mb-2">
              비밀번호
            </Label>
            <br></br>
            <Input id="password" placeholder="********" />
            <FindPassword to={"/findPassword"}>비밀번호 찾기</FindPassword>
          </Col>
        </div>
        <DivBtn className="mb-3">
          <Col lg={8}>
            <Button color="primary">로그인</Button>
          </Col>
        </DivBtn>
        <div className="mb-3">
          <Link to={"/member/signup"}>
            지금 바로 회원 가입하러 가기
            <BsArrowRightCss />
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Login;
