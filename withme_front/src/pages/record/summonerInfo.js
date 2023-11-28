import { Row, Col, Badge } from "reactstrap";
import styled from "styled-components";

const IconImg = styled.img`
  width: 155px;
  height: 100%;
`;

const SummonerInfo = ({ info }) => {
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
          <h3 style={{ fontWeight: "bold" }}>{info.name}</h3>
        </Col>
      </Row>
    </>
  );
};
export default SummonerInfo;
