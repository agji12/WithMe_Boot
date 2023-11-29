import { Row, Col } from "reactstrap";
import styled from "styled-components";

const TierImg = styled.img`
  width: 100px;
  height: 100px;
`;

const RightCol = styled(Col)`
  text-align: right;
  margin: auto;
`;

const TierCard = ({ type }) => {
  return (
    <>
      <Row>
        <Col>
          <TierImg
            src={require(`../../../assets/tierImages/` + type.tier + `.png`)}
          />
        </Col>
        <RightCol>
          <h5>
            {type.tier} {type.rank}
          </h5>
          <h6>{type.leaguePoints} LP</h6>
          <small>
            {type.wins}승 {type.losses}패
          </small>
        </RightCol>
      </Row>
    </>
  );
};
export default TierCard;
