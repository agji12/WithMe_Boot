import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../components/axiosInstance";

const DivValidCheck = styled.div`
  color: red;
  font-size: small;
`;

const FindPassword = styled(Link)`
  font-size: small;
`;

const DivCenter = styled.div`
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
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userFlag, setUserFlag] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState({
    icon: "",
    message: "",
  });
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const emailValidCheck = (username, setUsernameMessage) => {
    let regexEmail = /[A-Za-z0-9]+?@[A-Za-z0-9]+?.com/;

    if (!regexEmail.test(username)) {
      setUsernameMessage({
        icon: <BsInfoCircle />,
        message: " 이메일의 형식이 일치하지 않습니다.",
      });
      setUserFlag(false);
    } else {
      setUsernameMessage({ icon: "", message: "" });
      setUserFlag(true);
    }
  };

  const toLogin = () => {
    if (userFlag === true) {
      axiosInstance
        .post("/api/member/login", JSON.stringify(user))
        .then(function (resp) {
          localStorage.setItem(
            "accessToken",
            resp.data.tokenType + resp.data.accessToken
          );
          //localStorage.setItem("expireTime", new Date().getTime() + 3600000); // 1시간 뒤 만료
          //localStorage.setItem("userId", user.username);
          navigate("/");
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setLoginErrorMessage(error.response.data.message);
          } else if (error.response.status === 500) {
            navigate("/serverError", {
              state: {
                errorStatus: error.response.status,
              },
            });
          } else {
            setLoginErrorMessage("다시 로그인을 진행 해 주시기 바랍니다");
            console.log(error.response.status);
          }
        });
    }
  };

  return (
    <>
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
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                emailValidCheck(e.target.value, setUsernameMessage);
              }}
            />
            <DivValidCheck>
              {usernameMessage.icon}
              {usernameMessage.message}
            </DivValidCheck>
          </Col>
        </div>
        <div className="mb-3">
          <Col lg={8}>
            <Label htmlFor="password" className="mb-2">
              비밀번호
            </Label>
            <br></br>
            <Input
              type="password"
              placeholder="********"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <FindPassword to={"/findPassword"}>비밀번호 찾기</FindPassword>
          </Col>
        </div>
        <DivCenter className="mb-3">
          <Col lg={8}>
            <small style={{ color: "red" }}>{loginErrorMessage}</small>
          </Col>
        </DivCenter>
        <DivCenter className="mb-3">
          <Col lg={8}>
            <Button color="primary" onClick={toLogin}>
              로그인
            </Button>
          </Col>
        </DivCenter>
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
