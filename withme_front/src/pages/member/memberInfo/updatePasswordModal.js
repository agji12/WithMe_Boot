import { useState } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import styled from "styled-components";
import { BsInfoCircle } from "react-icons/bs";

const DivInfo = styled.div`
  color: rgba(33, 37, 41, 0.75);
  font-size: small;
`;

const DivValidCheck = styled.div`
  color: red;
  font-size: small;
`;

const UpdatePasswordModal = ({ toggle, member }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [passwordValidFlag, setPasswordValidFlag] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({
    icon: "",
    message: "",
  });

  // 비밀번호 유효성 검사
  const passwordValidCheck = (newPassword, newPasswordCheck) => {
    let regexPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    if (!regexPassword.test(newPassword)) {
      setPasswordMessage({
        icon: <BsInfoCircle />,
        message: " 비밀번호의 형식이 일치하지 않습니다.",
      });
    } else {
      setPasswordMessage({ icon: "", message: "" });
    }

    // 비밀번호, 재입력 일치 여부 확인
    if (newPassword == newPasswordCheck && regexPassword.test(newPassword)) {
      console.log("a");
    } else {
      console.log("b");
    }
  };

  return (
    <>
      <ModalHeader toggle={toggle}>비밀번호 수정</ModalHeader>
      <ModalBody>
        <div>
          <small>현재 비밀번호</small>
          <Input type="password" className="mb-2" />
          <div className="mb-2">
            <small>새 비밀번호</small>
            <Input
              type="password"
              onChange={(e) => {
                setNewPassword(e.target.value);
                passwordValidCheck(e.target.value, newPasswordCheck);
              }}
            />
            <DivInfo>
              영문, 숫자, 특수문자가 적어도 1개씩 포함된 8~15자로 입력해 주세요!
            </DivInfo>
            <DivValidCheck>
              {passwordMessage.icon}
              {passwordMessage.message}
            </DivValidCheck>
          </div>
          <small>새 비밀번호 확인</small>
          <Input
            type="password"
            onChange={(e) => {
              setNewPasswordCheck(e.target.value);
              passwordValidCheck(newPassword, e.target.value);
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">수정하기</Button>{" "}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </>
  );
};
export default UpdatePasswordModal;
