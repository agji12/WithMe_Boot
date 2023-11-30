import { Row, Col, Card, CardBody } from "reactstrap";
import styled from "styled-components";

const IconImg = styled.img`
  width: 70px;
  height: 70px;
`;

const ColZero = styled(Col)`
  padding: 0px;
`;

const ColSix = styled(Col)`
  padding-left: 6px;
  padding-right: 6px;
  color: #d91a1a;
`;

const ColDisplay = styled(Col)`
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const SmallLight = styled.small`
  font-weight: 300;
`;

const MatchCard = ({ riotId, match }) => {
  console.log(match);

  const queueType = (queue) => {
    if (queue === 420) {
      return "솔로 랭크";
    } else if (queue === 430) {
      return "일반";
    } else if (queue === 440) {
      return "자유 랭크";
    } else if (queue === 450) {
      return "무작위 총력전";
    } else if (queue === 490) {
      return "빠른 대전";
    } else {
      return "another";
    }
  };

  const gameEndTime = (time) => {
    let date = new Date(time);

    let format =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return <SmallLight>{format}</SmallLight>;
  };

  const playTime = (startTime, endTime) => {
    let startDate = new Date(startTime);
    let endDate = new Date(endTime);
    let diff = endDate - startDate;

    let minute = Math.floor(diff / (1000 * 60));
    diff -= minute * (1000 * 60);
    let second = Math.floor(diff / 1000);

    return (
      <SmallLight>
        {minute}분 {second}초
      </SmallLight>
    );
  };

  const isWin = (riotId, participants) => {
    for (let i = 0; i < participants.length; i++) {
      if (
        riotId.gameName === participants[i].riotIdGameName &&
        riotId.tagLine === participants[i].riotIdTagline
      ) {
        if (participants[i].teamEarlySurrendered) {
          return <small className="text-secondary">다시하기</small>;
        } else if (participants[i].win) {
          return <small className="text-primary">승리</small>;
        } else {
          return <small className="text-danger">패배</small>;
        }
      }
    }
  };

  const getSearchSummonerInfo = (riotId, participants) => {
    for (let i = 0; i < participants.length; i++) {
      if (
        riotId.gameName === participants[i].riotIdGameName &&
        riotId.tagLine === participants[i].riotIdTagline
      ) {
        return (
          <>
            <Col xs="auto">
              <IconImg
                src={
                  "http://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/" +
                  participants[i].championName +
                  ".png"
                }
              />
            </Col>
            <Col xs="auto" lg={2} xl={2} style={{ marginLeft: "20px" }}>
              <Row>
                <ColZero xs="auto" className="fs-5">
                  {participants[i].kills} /
                </ColZero>
                <ColSix xs="auto" className="fs-5" style={{}}>
                  {participants[i].deaths}
                </ColSix>
                <ColZero xs="auto" className="fs-5 text">
                  / {participants[i].assists}
                </ColZero>
              </Row>
            </Col>
          </>
        );
      }
    }
  };

  const getParticipantsInfo = (participants) => {
    let team1 = [];
    let team2 = [];
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].teamId === 100) {
        team1.push(
          participants[i].riotIdGameName + "#" + participants[i].riotIdTagline
        );
      } else if (participants[i].teamId === 200) {
        team2.push(
          participants[i].riotIdGameName + "#" + participants[i].riotIdTagline
        );
      }
    }
    return (
      <>
        <ColDisplay xs="auto">
          <SmallLight>{team1[0]}</SmallLight>
          <br />
          <SmallLight>{team1[1]}</SmallLight>
          <br />
          <SmallLight>{team1[2]}</SmallLight>
          <br />
          <SmallLight>{team1[3]}</SmallLight>
          <br />
          <SmallLight>{team1[4]}</SmallLight>
        </ColDisplay>
        <ColDisplay xs="auto" style={{ margin: "auto" }}>
          VS
        </ColDisplay>
        <ColDisplay>
          <SmallLight>{team2[0]}</SmallLight>
          <br />
          <SmallLight>{team2[1]}</SmallLight>
          <br />
          <SmallLight>{team2[2]}</SmallLight>
          <br />
          <SmallLight>{team2[3]}</SmallLight>
          <br />
          <SmallLight>{team2[4]}</SmallLight>
        </ColDisplay>
      </>
    );
  };

  return (
    <>
      <Card className="my-2">
        <CardBody>
          <Row>
            <Col xs={4} md={3} xl={2}>
              {queueType(match.queueId)}
              <br />
              {gameEndTime(match.gameEndTimestamp)}
              <hr style={{ marginTop: "5px", marginBottom: "5px" }} />
              {isWin(riotId, match.participants)}
              <br />
              {playTime(match.gameStartTimestamp, match.gameEndTimestamp)}
            </Col>
            {getSearchSummonerInfo(riotId, match.participants)}
            {getParticipantsInfo(match.participants)}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default MatchCard;
