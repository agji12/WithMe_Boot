import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import Navi from "../navbar/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import FirstPage from "./signupPages/firstPage";
import SecondPage from "./secondPage";

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
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [firstPage, setFirstPage] = useState(true);

  const onClickShow = (aa) => {
    console.log(aa);
    setUsername(aa);
    setShow(true);
    setFirstPage(false);
    console.log(username);
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
        <div>{firstPage && <FirstPage onClickShow={onClickShow} />}</div>
        <div>{show && <SecondPage />}</div>
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
