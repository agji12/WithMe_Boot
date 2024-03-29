import { useState } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import styled from "styled-components";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../components/axiosInstance";

const DivInfo = styled.div`
  color: rgba(33, 37, 41, 0.75);
  font-size: small;
`;

const DivValidCheck = styled.div`
  color: red;
  font-size: small;
`;

const UpdatePasswordModal = ({ toggle, member }) => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
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
    if (newPassword === newPasswordCheck && regexPassword.test(newPassword)) {
      setPasswordValidFlag(true);
    } else {
      setPasswordValidFlag(false);
    }
  };

  const updatePassword = () => {
    // 현재 비밀번호 일치 여부 확인
    axiosInstance
      .get(`/api/member/passwordCheck`, {
        params: { email: member.email, password: currentPassword },
      })
      .then(function (resp) {
        if (resp.data === true) {
          // 현재 비밀번호 일치
          if (passwordValidFlag === true) {
            // 새 비밀번호 유효성 검사 통과
            // 비밀번호 변경
            axiosInstance
              .put(
                `/api/member/password`,
                {
                  email: member.email,
                  password: newPassword,
                  nickname: member.nickname,
                  birthday: member.birthday,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("accessToken"),
                  },
                }
              )
              .then(function (resp) {
                alert("회원 정보가 수정되었습니다.");
                window.location.reload();
              })
              .catch(function (error) {
                if (error.response.status === 500) {
                  navigate("/serverError", {
                    state: {
                      errorStatus: error.response.status,
                    },
                  });
                } else {
                  alert(
                    "회원 정보 수정에 실패하셨습니다.\n다시 진행해 주시기 바랍니다."
                  );
                  console.log(error.response.status);
                }
              });
          } else {
            // 새 비밀번호 유효성 검사 불통과
            alert("새 비밀번호의 형식이 일치하지 않습니다.");
          }
        } else {
          // 현재 비밀번호 불일치
          alert(
            "현재 비밀번호가 일치하지 않습니다.\n다시 입력해 주시기 바랍니다."
          );
        }
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          navigate("/serverError", {
            state: {
              errorStatus: error.response.status,
            },
          });
        } else {
          alert("오류가 발생했습니다.\n다시 진행해 주시기 바랍니다.");
          console.log(error.response.status);
        }
      });
  };

  return (
    <>
      <ModalHeader toggle={toggle}>비밀번호 수정</ModalHeader>
      <ModalBody>
        <div>
          <small>현재 비밀번호</small>
          <Input
            type="password"
            className="mb-2"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
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
        <Button color="primary" onClick={updatePassword}>
          수정하기
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </>
  );
};
export default UpdatePasswordModal;
