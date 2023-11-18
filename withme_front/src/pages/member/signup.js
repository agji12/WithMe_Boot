import { Container, Input, Col, Button } from "reactstrap";
import { BsArrowRight } from "react-icons/bs";
import Navi from "../navbar/nav";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
        <div className="mb-3">
          <Col lg={8}>
            <Label htmlFor="username" className="mb-2">
              이메일 주소
            </Label>
            <br></br>
            <Input id="username" placeholder="name@example.com" />
          </Col>
        </div>
        <BtnDiv className="mb-3">
          <Col lg={8}>
            <Button color="primary">다음</Button>
          </Col>
        </BtnDiv>
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
