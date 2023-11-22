import { Container, InputGroup, Button, Input } from "reactstrap";
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
        <InputGroup>
          <Input placeholder="소환사명을 입력해 주세요" />
          <Button color="outline-secondary">검색</Button>
        </InputGroup>
        <small className="body-secondary">
          <BsInfoCircleFill /> 한글 이름의 경우 띄어쓰기를 꼭 해주세요!
        </small>
      </Container>
    </>
  );
};

export default Home;
