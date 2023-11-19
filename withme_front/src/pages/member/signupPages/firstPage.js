import { Input, Col, Button } from "reactstrap";
import { BsInfoCircle } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

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

const FirstPage = ({ onClickShow }) => {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState({
    icon: "",
    message: "",
  });

  const lookSecond = (aa) => {
    console.log(aa);
    onClickShow(aa);
  };

  const emailValidCheck = (username, setUsernameMessage) => {
    let regexEmail = /[A-Za-z0-9]+?@[A-Za-z0-9]+?.com/;

    if (!regexEmail.test(username)) {
      setUsernameMessage({
        icon: <BsInfoCircle />,
        message: " 이메일의 형식이 일치하지 않습니다.",
      });
    } else {
      setUsernameMessage({ icon: "", message: "" });
      setNextDisabled(false);
    }
  };

  const mailSend = () => {
    console.log(username);
    axios
      .get(`http://localhost:8000/member/mailSend/${username}`)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
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
              emailValidCheck(e.target.value, setUsernameMessage);
            }}
          />
          <DivValidCheck></DivValidCheck>
        </Col>
      </div>
      <BtnDiv className="mb-3">
        <Col lg={8}>
          <Button color="primary" onClick={mailSend} disabled={nextDisabled}>
            다음
          </Button>
          <Button color="primary" onClick={() => lookSecond(username)}>
            test
          </Button>
        </Col>
      </BtnDiv>
    </>
  );
};
export default FirstPage;
