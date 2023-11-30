import { Row, Col, Badge } from "reactstrap";
import styled from "styled-components";

const IconImg = styled.img`
  width: 155px;
  height: 100%;
`;

const SummonerInfo = ({ riotId, info }) => {
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
              "http://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" +
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
          <small style={{ fontWeight: "300" }}>( {info.name} )</small>
        </Col>
      </Row>
    </>
  );
};
export default SummonerInfo;
