import { Row, Col, Badge } from "reactstrap";
import styled from "styled-components";

const IconImg = styled.img`
  width: 155px;
  height: 100%;
`;

const SummonerInfo = ({ ddragonVer, riotId, info }) => {
  return (
    <>
      <Row>
        <Col
          xs={2}
          style={{
            width: "180px",
          }}
        >
          <IconImg
            src={
              "http://ddragon.leagueoflegends.com/cdn/" +
              ddragonVer +
              "/img/profileicon/" +
              info.profileIconId +
              ".png"
            }
          />
        </Col>
        <Col>
          <Badge>{info.summonerLevel}</Badge>
          <h3 style={{ fontWeight: "bold" }}>
            {riotId.gameName}#{riotId.tagLine}
          </h3>
          <small style={{ color: "#757575" }}>( {info.name} )</small>
        </Col>
      </Row>
    </>
  );
};
export default SummonerInfo;
