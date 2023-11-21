import { Container, InputGroup, Form, Button } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import styled from "styled-components";
import Navi from "../../components/nav";

const Logo = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
`;

const Home = () => {
  return (
    <>
      <Navi />
      <Container>
        <Logo className="mb-3">With Me</Logo>
        <InputGroup className="inputBox">
          <Form.Control
            placeholder="소환사명을 입력해 주세요"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="searchBtn">
            Button
          </Button>
        </InputGroup>
        <small className="body-secondary">
          <BsInfoCircleFill /> 한글 이름의 경우 띄어쓰기를 꼭 해주세요!
        </small>
      </Container>
    </>
  );
};

export default Home;
