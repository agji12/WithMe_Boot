import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import SummonerInfo from "./info/summonerInfo";
import TierCard from "./tier/tierCard";
import NoTierCard from "./tier/noTierCard";
import MatchCard from "./match/matchCard";

const Record = () => {
  const location = useLocation();

  const ddragonVer = location.state.ddragonVer;
  const riotId = location.state.riotId;
  const summonerInfo = location.state.summonerInfo;
  const summonerTierSolo = location.state.summonerTierSolo;
  const summonerTierFlex = location.state.summonerTierFlex;
  const soloState = location.state.soloState;
  const flexState = location.state.flexState;
  const matchList = location.state.matchList;

  localStorage.removeItem("searchName"); // 검색 완료 후 localStorage에 담은 검색 이름 삭제

  const [matchInfo, setMatchInfo] = useState({
    puuid: riotId.puuid,
    start: 10,
    count: 5,
  });
  const [additionalMatchList, setAdditionalMatchList] = useState([]);

  const additionalMatch = () => {
    axios
      .get(`/record/additionalMatch`, { params: matchInfo })
      .then(function (resp) {
        let matchCardList = [];
        {
          resp.data.map((match, i) =>
            matchCardList.push(
              <MatchCard
                ddragonVer={ddragonVer}
                riotId={riotId}
                match={match}
                key={i}
              />
            )
          );
        }

        setMatchInfo({
          ...matchInfo,
          start: matchInfo.start + matchInfo.count,
        });
        setAdditionalMatchList([...additionalMatchList, matchCardList]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-5">
          <SummonerInfo
            ddragonVer={ddragonVer}
            riotId={riotId}
            info={summonerInfo}
          />
        </div>
        <div className="mb-3">
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>솔로 랭크</CardHeader>
                <CardBody>
                  {soloState && <TierCard type={summonerTierSolo} />}
                  {!soloState && <NoTierCard />}
                </CardBody>
              </Card>
              <br />
            </Col>
            <Col>
              <Card>
                <CardHeader>자유 랭크</CardHeader>
                <CardBody>
                  {flexState && <TierCard type={summonerTierFlex} />}
                  {!flexState && <NoTierCard />}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          {matchList.map((match, i) => (
            <MatchCard
              ddragonVer={ddragonVer}
              riotId={riotId}
              match={match}
              key={i}
            />
          ))}
        </div>
        <div>{additionalMatchList}</div>
        <div>
          <Card>
            <Button color="#f8f9fa" onClick={additionalMatch}>
              <FaPlus color="#a1a1a1" />
            </Button>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Record;
