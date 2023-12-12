import { Container, InputGroup, Button, Input } from "reactstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logo = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
`;

const Home = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  let summonerTierSolo = [];
  let summonerTierFlex = [];
  let soloState = false;
  let flexState = false;

  const onClickSearch = () => {
    if (searchName !== "") {
      axios
        .get(
          process.env.REACT_APP_DB_HOST + `/record/searchRecord/${searchName}`
        )
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
          // localStorage에 담아 검색창에서의 검색과 url에서의 검색 구분
          localStorage.setItem("searchName", searchName);

          navigate(`/record`, {
            state: {
              ddragonVer: resp.data["ddragonVer"],
              riotId: resp.data["riotId"],
              summonerInfo: resp.data["summonerInfo"],
              summonerTierSolo: summonerTierSolo,
              summonerTierFlex: summonerTierFlex,
              soloState: soloState,
              flexState: flexState,
              matchList: resp.data["matchList"],
            },
          });
        })
        .catch(function (error) {
          //console.log(error);
          navigate("/notFound", {
            state: {
              searchName: searchName,
            },
          });
        });
    }
  };

  return (
    <>
      <Container>
        <Logo className="mb-3">With Me</Logo>
        <InputGroup>
          <Input
            placeholder="소환사 이름 # tag"
            onChange={(e) => {
              setSearchName(e.target.value);
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
