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

const EmailInputPage = ({ onClickShowPassword }) => {
  const [disableNextBtn, setDisableNextBtn] = useState(true);
  const [showNextBtn, setShowNextBtn] = useState({ display: "block" });
  const [showAuthentication, setShowAuthentication] = useState({
    display: "none",
  });
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState({
    icon: "",
    message: "",
  });
  const [authNumber, setAuthNumber] = useState("");
  const [authNumberInput, setAuthNumberInput] = useState("");

  const emailValidCheck = (email) => {
    let regexEmail = /[A-Za-z0-9]+?@[A-Za-z0-9]+?.com/;

    if (!regexEmail.test(email)) {
      setEmailMessage({
        icon: <BsInfoCircle />,
        message: " 이메일의 형식이 일치하지 않습니다.",
      });
    } else {
      setEmail(email);
      setEmailMessage({ icon: "", message: "" });
      setDisableNextBtn(false);
    }
  };

  const mailSend = () => {
    axios
      .get(`/member/mailSend/${email}`)
      .then(function (resp) {
        alert("이메일이 전송되었습니다");
        setAuthNumber(resp.data);
        setShowNextBtn({ display: "none" });
        setShowAuthentication({ display: "block" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const authNumberCheck = (email) => {
    if (authNumber == authNumberInput) {
      // 이메일 중복 체크
      axios
        .get(`/member/emailCheck/${email}`)
        .then(function (resp) {
          onClickShowPassword(email, resp.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("인증 번호가 일치하지 않습니다.\n다시 입력하여 주시기 바랍니다!");
    }
  };

  return (
    <>
      <div className="mb-3">
        <Col lg={8}>
          <Label htmlFor="email" className="mb-2">
            이메일 주소
          </Label>
          <br></br>
          <Input
            id="email"
            placeholder="name@example.com"
            onChange={(e) => {
              emailValidCheck(e.target.value);
            }}
          />
          <DivValidCheck>
            {emailMessage.icon}
            {emailMessage.message}
          </DivValidCheck>
        </Col>
      </div>
      <div className="mb-3" style={showAuthentication}>
        <Col lg={8}>
          <Label htmlFor="authNumberInput" className="mb-2">
            인증 번호
          </Label>
          <br></br>
          <Input
            id="authNumberInput"
            placeholder="6자리 인증 번호를 입력해 주세요"
            onChange={(e) => {
              setAuthNumberInput(e.target.value);
            }}
          />
        </Col>
      </div>
      <BtnDiv className="mb-3">
        <Col lg={8} style={showNextBtn}>
          <Button color="primary" onClick={mailSend} disabled={disableNextBtn}>
            다음
          </Button>
        </Col>
        <Col lg={8} style={showAuthentication}>
          <Button color="primary" onClick={() => authNumberCheck(email)}>
            인증하기
          </Button>
        </Col>
      </BtnDiv>
    </>
  );
};
export default EmailInputPage;
