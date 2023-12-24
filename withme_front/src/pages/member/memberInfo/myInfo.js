import { Container, Input, Col, Button, Modal } from "reactstrap";
import styled from "styled-components";
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UpdatePasswordModal from "./updatePasswordModal";

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

const SmallLight = styled.small`
  color: #757575;
`;

const MyInfo = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [member, setMember] = useState({
    email: "",
    password: "",
    nickname: "",
    birthday: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [nicknameValidFlag, setNicknameValidFlag] = useState(true);
  const [birthdayValidFlag, setBirthdayValidFlag] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState({
    icon: "",
    message: "",
  });
  const [birthdayMessage, setBirthdayMessage] = useState({
    icon: "",
    message: "",
  });

  // 회원 정보 가져오기
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
        setNewNickname(resp.data.nickname);
        setNewBirthday(resp.data.birthday);
      });
  }, []);

  // 닉네임 유효성 검사
  const nicknameValidCheck = (nickname) => {
    let regexNickname = /^[A-Za-z가-힣ㄱ-ㅎ0-9]{2,12}$/;

    if (nickname !== "") {
      // 닉네임 중복 검사
      axios
        .get(`/api/member/nicknameCheck/${nickname}`)
        .then(function (resp) {
          if (resp.data === 0 && regexNickname.test(nickname)) {
            setNewNickname(nickname);
            setNicknameMessage({ icon: "", message: "" });
            setNicknameValidFlag(true);
          } else if (resp.data === 0 && !regexNickname.test(nickname)) {
            setNicknameMessage({
              icon: <BsInfoCircle />,
              message: " 닉네임의 형식이 일치하지 않습니다.",
            });
            setNicknameValidFlag(false);
          } else if (resp.data === 1) {
            setNicknameMessage({
              icon: <BsInfoCircle />,
              message: " 이미 존재하는 닉네임입니다.",
            });
            setNicknameValidFlag(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // 생년월일 유효성 검사
  const birthdayValidCheck = (birthday) => {
    let year = Number(birthday.substr(0, 4));
    let month = Number(birthday.substr(4, 2));
    let day = Number(birthday.substr(6, 2));

    let todayYear = new Date().getFullYear(); // 올해 연도

    if (birthday.length === 8) {
      // 연도의 경우 1950 보다 작거나 todayYear 보다 크다면 false를 반환
      if (year < 1950 || year > todayYear) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 연도를 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (month < 1 || month > 12) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 월을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (day < 1 || day > 31) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 일을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day === 31
      ) {
        setBirthdayMessage({
          icon: <BsInfoCircle />,
          message: " 일을 정확하게 입력해 주세요",
        });
        setBirthdayValidFlag(false);
        return false;
      } else if (month === 2) {
        let isleap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (day > 29 || (day === 29 && !isleap)) {
          setBirthdayMessage({
            icon: <BsInfoCircle />,
            message: " 일을 정확하게 입력해 주세요",
          });
          setBirthdayValidFlag(false);
          return false;
        } else {
          setBirthdayMessage({ icon: "", message: "" });
          setBirthdayValidFlag(true);
          setNewBirthday(birthday);
          return true;
        }
      } else {
        setBirthdayMessage({ icon: "", message: "" });
        setBirthdayValidFlag(true);
        setNewBirthday(birthday);
        return true;
      }
    } else {
      setBirthdayMessage({
        icon: <BsInfoCircle />,
        message: " 생년월일의 형식이 일치하지 않습니다",
      });
      setBirthdayValidFlag(false);
    }
  };

  // 비밀번호 수정 버튼 눌렀을 때
  const toggle = () => setModal(!modal);

  // 수정하기 버튼 눌렀을 때
  const toUpdate = () => {
    setShow(false);
  };

  // 취소 버튼 눌렀을 때
  const toCancel = () => {
    setShow(true);
    setNewNickname(member.nickname);
    setNicknameValidFlag(false);
    setNicknameMessage({ icon: "", message: "" });
    setNewBirthday(member.birthday);
    setBirthdayValidFlag(false);
    setBirthdayMessage({ icon: "", message: "" });
  };

  // 회원 정보 수정 (닉네임, 생년월일)
  const updateMyInfo = () => {
    if (nicknameValidFlag && birthdayValidFlag) {
      axios
        .put(
          `/api/member/${localStorage.getItem("userId")}`,
          {
            email: member.email,
            password: member.password,
            nickname: newNickname,
            birthday: newBirthday,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(function (resp) {
          setShow(true);
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
      alert("닉네임과 생년월일을 정확하게 입력해 주세요!");
    }
  };

  // 회원 탈퇴
  const dropOutMember = () => {
    if (
      window.confirm(
        "탈퇴 시 회원 정보 및 듀오 찾기에서 작성한 글, 댓글이 모두 삭제됩니다.\n정말 회원을 탈퇴하시겠습니까?"
      )
    ) {
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
            <Label className="mb-2">이메일 주소</Label>
            <Input type="email" value={member.email || ""} disabled />
          </div>
          <div className="mb-3">
            <Label className="mb-2">비밀번호</Label>
            <br />
            <Button color="primary" size="sm" onClick={toggle}>
              수정하기
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <UpdatePasswordModal toggle={toggle} member={member} />
            </Modal>
          </div>
          <div className="mb-3">
            <Label className="mb-2">닉네임</Label>
            {show && <Input value={member.nickname || ""} disabled />}
            {!show && (
              <div>
                <Input
                  placeholder={member.nickname}
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
            )}
          </div>
          <div className="mb-3">
            <Label className="mb-2">생년월일</Label>
            {show && <Input value={member.birthday || ""} disabled />}
            {!show && (
              <div>
                <Input
                  placeholder={member.birthday}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    birthdayValidCheck(e.target.value);
                  }}
                />
                <DivInfo>연도/월/일 순으로 입력해 주세요!</DivInfo>
                <DivValidCheck>
                  {birthdayMessage.icon}
                  {birthdayMessage.message}
                </DivValidCheck>
              </div>
            )}
          </div>
          <DivCenter className="mb-3">
            {show && (
              <Button color="primary" onClick={toUpdate}>
                수정하기
              </Button>
            )}{" "}
            {!show && (
              <Button color="primary" onClick={updateMyInfo}>
                수정 완료
              </Button>
            )}{" "}
            {!show && (
              <Button color="secondary" onClick={toCancel}>
                취소
              </Button>
            )}
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
