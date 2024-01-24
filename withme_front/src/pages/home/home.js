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
  let searchName = "";
  const [searchNameInput, setSearchNameInput] = useState("");
  let summonerTierSolo = [];
  let summonerTierFlex = [];
  let soloState = false;
  let flexState = false;

  const onClickSearch = () => {
    if (searchNameInput !== "") {
      searchName = searchNameInput;
      if (searchNameInput.includes("#")) {
        searchName = searchNameInput.replace("#", "%23");
      }
      axios
        .get(`/api/record/searchRecord/${searchName}`)
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
          console.log(error);
          if (error.response.status === 404) {
            navigate("/notFound", {
              state: {
                searchName: searchName,
              },
            });
          } else if (error.response.status === 500) {
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
      <Container>
        <Logo className="mb-3">With Me</Logo>
        <InputGroup>
          <Input
            placeholder="소환사 이름 # tag"
            onChange={(e) => {
              setSearchNameInput(e.target.value);
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
