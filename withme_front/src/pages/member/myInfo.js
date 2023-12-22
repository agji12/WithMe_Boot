import { Container, Input, Col, Button } from "reactstrap";
import styled from "styled-components";
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const DivInfo = styled.div`
  color: rgba(33, 37, 41, 0.75);
  font-size: small;
`;

const DivValidCheck = styled.div`
  color: red;
  font-size: small;
`;

const DivCenter = styled.div`
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const MyInfo = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    email: "",
    password: "",
    nickname: "",
    birthday: "",
  });
  const [nickname, setNickname] = useState("");
  const [nicknameValidFlag, setNicknameValidFlag] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState({
    icon: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`/api/member/${localStorage.getItem("userId")}`)
      .then(function (resp) {
        setMember({
          email: resp.data.email,
          password: resp.data.password,
          nickname: resp.data.nickname,
          birthday: resp.data.birthday,
        });
      });
  }, []);

  const nicknameValidCheck = (nickname) => {
    let regexNickname = /^[A-Za-z가-힣ㄱ-ㅎ0-9]{2,12}$/;

    if (nickname !== "") {
      // 닉네임 중복 검사
      axios
        .get(`/api/member/nicknameCheck/${nickname}`)
        .then(function (resp) {
          if (resp.data === 0 && regexNickname.test(nickname)) {
            setNickname(nickname);
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

  const dropOutMember = () => {
    if (
      window.confirm(
        "탈퇴 시 회원 정보 및 듀오 찾기에서 작성한 글, 댓글이 모두 삭제됩니다.\n정말 회원을 탈퇴하시겠습니까?"
      )
    ) {
      console.log("확인");
      axios
        .delete(`/api/member/${localStorage.getItem("userId")}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (resp) {
          localStorage.clear();
          alert("탈퇴가 완료되었습니다!");
          navigate("/");
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
        <DivCenter className="mb-5">
          <h1 style={{ fontWeight: "bold" }}>내 정보</h1>
        </DivCenter>
        <Col
          md={{
            offset: 3,
            size: 6,
          }}
          sm="12"
        >
          <div className="mb-3">
            <Label htmlFor="username" className="mb-2">
              이메일 주소
            </Label>
            <Input type="email" value={member.email} disabled />
          </div>
          <div className="mb-3">
            <Label htmlFor="username" className="mb-2">
              비밀번호
            </Label>
            <br></br>
          </div>
          <div className="mb-3">
            <Label htmlFor="nickname" className="mb-2">
              닉네임
            </Label>
            <Input id="nickname" value={member.nickname} disabled />
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
          </div>
          <div className="mb-5">
            <Label htmlFor="birthday" className="mb-2">
              생년월일
            </Label>
            <Input id="birthday" value={member.birthday} disabled />
          </div>
          <DivCenter className="mb-3">
            <Button color="primary">수정하기</Button>{" "}
            <Button color="primary">수정 완료</Button>{" "}
            <Button color="secondary">취소</Button>
          </DivCenter>
          <Hr />
          <div className="mb-3">
            <Label htmlFor="dropOut" className="mb-2">
              회원 탈퇴
            </Label>
            <Button
              id="dropOut"
              color="danger"
              onClick={dropOutMember}
              style={{ marginLeft: "12px" }}
            >
              탈퇴하기
            </Button>
          </div>
        </Col>
      </Container>
    </>
  );
};
export default MyInfo;
