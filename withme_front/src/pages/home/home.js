import { Container, InputGroup, Button, Input } from "reactstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import styled from "styled-components";
import Navi from "../../components/nav";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logo = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
`;

const Home = () => {
  const [summonerName2, setSummonerName2] = useState("");
  //const navigate = useNavigate;

  const searchRecord = () => {
    //navigate("/member/login");
  };

  return (
    <>
      <Navi />
      <Container>
        <Logo className="mb-3">With Me</Logo>
        <InputGroup>
          <Input
            placeholder="소환사명을 입력해 주세요"
            onChange={(e) => {
              setSummonerName2(e.target.value);
            }}
          />
          <Link to={`/test/${summonerName2}`} state={{ test: summonerName2 }}>
            <Button color="outline-secondary">검색</Button>
          </Link>
        </InputGroup>
        <small className="body-secondary">
          <BsInfoCircleFill /> 한글 이름의 경우 띄어쓰기를 꼭 해주세요!
        </small>
      </Container>
    </>
  );
};

export default Home;
