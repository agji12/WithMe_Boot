import { useState } from "react";
import { Row, Col } from "reactstrap";
import styled from "styled-components";

const TierImg = styled.img`
  width: 100px;
  height: 100px;
`;

const TierCard = ({ type }) => {
  const [state, setState] = useState();

  return (
    <>
      <Row>
        <Col style={{ border: "1px solid pink" }}>
          <TierImg
            src={require(`../../assets/tierImages/` + type.tier + `.png`)}
          />
        </Col>
        <Col style={{ border: "1px solid blue", textAlign: "right" }}>
          <h5>
            {type.tier} {type.rank}
          </h5>
          <h6>{type.leaguePoints} LP</h6>
          <small>
            {type.wins}승 {type.losses}패
          </small>
        </Col>
      </Row>
    </>
  );
};
export default TierCard;
