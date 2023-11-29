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

const NoTierCard = () => {
  return (
    <>
      <Row>
        <Col>
          <TierImg src={require(`../../../assets/tierImages/UNRANKED.png`)} />
        </Col>
        <RightCol>
          <h5>UNRANK</h5>
        </RightCol>
      </Row>
    </>
  );
};
export default NoTierCard;
