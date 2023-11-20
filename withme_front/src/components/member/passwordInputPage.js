import { Input, Col, Button } from "reactstrap";
import { BsInfoCircle } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";

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

const PasswordInputPage = ({ onClickShowNickname }) => {
  const [disableNextBtn, setDisableNextBtn] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({
    icon: "",
    message: "",
  });

  const passwordValidCheck = (password, passwordCheck) => {
    let regexPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    if (!regexPassword.test(password)) {
      setPasswordMessage({
        icon: <BsInfoCircle />,
        message: " 비밀번호의 형식이 일치하지 않습니다.",
      });
    } else {
      setPasswordMessage({ icon: "", message: "" });
    }

    // 비밀번호, 재입력 일치 여부 확인
    if (password == passwordCheck && regexPassword.test(password)) {
      setDisableNextBtn(false);
    } else {
      setDisableNextBtn(true);
    }
  };

  return (
    <>
      <div className="mb-3">
        <Col lg={8}>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              passwordValidCheck(e.target.value, passwordCheck);
            }}
          />
          <DivInfo>
            영문, 숫자, 특수문자가 적어도 1개씩 포함된 8~15자로 입력해 주세요!
          </DivInfo>
          <DivValidCheck>
            {passwordMessage.icon}
            {passwordMessage.message}
          </DivValidCheck>
        </Col>
      </div>
      <div className="mb-3">
        <Col lg={8}>
          <Label htmlFor="passwordCheck">비밀번호 재입력</Label>
          <Input
            id="passwordCheck"
            type="password"
            onChange={(e) => {
              setPasswordCheck(e.target.value);
              passwordValidCheck(password, e.target.value);
            }}
          />
        </Col>
      </div>
      <BtnDiv className="mb-3">
        <Col lg={8}>
          <Button
            color="primary"
            onClick={() => onClickShowNickname(password)}
            disabled={disableNextBtn}
          >
            다음
          </Button>
        </Col>
      </BtnDiv>
    </>
  );
};
export default PasswordInputPage;
