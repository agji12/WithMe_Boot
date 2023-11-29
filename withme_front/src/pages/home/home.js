import { Container, InputGroup, Button, Input } from "reactstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import styled from "styled-components";
import Navi from "../../components/nav";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Logo = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
`;

const Home = () => {
  const navigate = useNavigate();
  const [summonerName, setSummonerName] = useState("");
  let summonerTierSolo = [];
  let summonerTierFlex = [];
  let soloState = false;
  let flexState = false;

  const onClickSearch = () => {
    if (summonerName !== "") {
      axios
        .get(`record/searchRecord/${summonerName}`)
        .then(function (resp) {
          // 티어 정보 유무 확인 및 분리
          for (let i = 0; i < resp.data["summonerTier"].length; i++) {
            if (resp.data["summonerTier"][i].queueType === "RANKED_FLEX_SR") {
              summonerTierFlex = resp.data["summonerTier"][i];
              flexState = true;
            } else if (
              resp.data["summonerTier"][i].queueType === "RANKED_SOLO_5x5"
            ) {
              summonerTierSolo = resp.data["summonerTier"][i];
              soloState = true;
            }
          }

          navigate("/record", {
            state: {
              summonerName: summonerName,
              summonerInfo: resp.data["summonerInfo"],
              summonerTierSolo: summonerTierSolo,
              summonerTierFlex: summonerTierFlex,
              soloState: soloState,
              flexState: flexState,
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
              setSummonerName(e.target.value);
            }}
          />
          <Button color="outline-secondary" onClick={onClickSearch}>
            검색
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
