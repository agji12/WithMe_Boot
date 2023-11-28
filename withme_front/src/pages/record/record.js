import {
  Container,
  InputGroup,
  Button,
  Input,
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import Navi from "../../components/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TierCard from "./tierCard";
import SummonerInfo from "./summonerInfo";

const IconImg = styled.img`
  width: 155px;
  height: 100%;
`;

const TierImg = styled.img`
  width: 100px;
  height: 100px;
`;

const Record = () => {
  const [summonerName, setSummonerName] = useState("");
  const [inputName, setInputName] = useState("");
  const [summonerInfo, setSummonerInfo] = useState([]);
  const [summonerTierSolo, setSummonerTierSolo] = useState([]);
  const [summonerTierFlex, setSummonerTierFlex] = useState([]);

  useEffect(() => {
    setSummonerInfo([]);
    setSummonerTierSolo([]);
    setSummonerTierFlex([]);
    axios
      .get(`record/searchRecord/${summonerName}`)
      .then(function (resp) {
        // 소환사 정보 입력
        setSummonerInfo(resp.data["summonerInfo"]);

        // 티어 정보 입력
        for (let i = 0; i < resp.data["summonerTier"].length; i++) {
          if (resp.data["summonerTier"][i].queueType === "RANKED_FLEX_SR") {
            setSummonerTierFlex(resp.data["summonerTier"][i]);
          } else if (
            resp.data["summonerTier"][i].queueType === "RANKED_SOLO_5x5"
          ) {
            setSummonerTierSolo(resp.data["summonerTier"][i]);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [summonerName]);

  const searchRecord = () => {
    console.log("------------------");

    //console.log(summonerInfo);
    //console.log(summonerTierSolo.tier);
    //console.log(summonerTierFlex);
    console.log(inputName);
    if (inputName !== "") {
      setSummonerInfo([]);
      setSummonerTierSolo([]);
      setSummonerTierFlex([]);
      axios
        .get(`record/searchRecord/${inputName}`)
        .then(function (resp) {
          setSummonerName(inputName);
          setInputName("");

          // 소환사 정보 입력
          setSummonerInfo(resp.data["summonerInfo"]);

          // 티어 정보 입력
          for (let i = 0; i < resp.data["summonerTier"].length; i++) {
            if (resp.data["summonerTier"][i].queueType === "RANKED_FLEX_SR") {
              setSummonerTierFlex(resp.data["summonerTier"][i]);
            } else if (
              resp.data["summonerTier"][i].queueType === "RANKED_SOLO_5x5"
            ) {
              setSummonerTierSolo(resp.data["summonerTier"][i]);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("소환사명을 입력해 주세요!");
    }
  };

  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-3">
          <InputGroup>
            <Input
              placeholder="소환사명을 입력해 주세요"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
            <Button color="outline-secondary" onClick={searchRecord}>
              검색
            </Button>
          </InputGroup>
        </div>
        <div className="mb-5">
          <SummonerInfo info={summonerInfo} />
        </div>
        <div className="mb-3">
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>솔로 랭크</CardHeader>
                <CardBody>
                  <Row>
                    <Col style={{ border: "1px solid pink" }}>
                      <TierImg
                        src={require(`../../assets/tierImages/` +
                          summonerTierSolo.tier +
                          `.png`)}
                      />
                    </Col>
                    <Col
                      style={{ border: "1px solid blue", textAlign: "right" }}
                    >
                      <h5>
                        {summonerTierSolo.tier} {summonerTierSolo.rank}
                      </h5>
                      <h6>{summonerTierSolo.leaguePoints} LP</h6>
                      <small>
                        {summonerTierSolo.wins}승 {summonerTierSolo.losses}패
                      </small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>자유 랭크</CardHeader>
                <CardBody>
                  <TierCard type={summonerTierFlex} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Record;
