import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  Input,
  Row,
  Col,
} from "reactstrap";
import styled from "styled-components";
import { BsMicFill } from "react-icons/bs";
import { BsMicMuteFill } from "react-icons/bs";
import QueueName from "../../components/queueName";
import PositionTitle from "./positionTitle";

const InputMemo = styled(Input)`
  height: 150px;
  font-size: small;
  resize: none;
`;

const TierImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

const PositionImage = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

const SmallDate = styled.small`
  float: right;
  font-weight: 200;
  margin-top: 5px;
`;

const DashedHr = styled.hr`
  border-style: dashed;
  margin-bottom: 8px;
`;

const DuoPosting = ({ duo }) => {
  console.log(duo);

  const tierImg = (tier) => {
    if (tier === 101) {
      return "UNRANK";
    } else if (tier === 102) {
      return "IRON";
    } else if (tier === 103) {
      return "BRONZE";
    } else if (tier === 104) {
      return "SILVER";
    } else if (tier === 105) {
      return "GOLD";
    } else if (tier === 106) {
      return "PLATINUM";
    } else if (tier === 107) {
      return "EMERALD";
    } else if (tier === 108) {
      return "DIAMOND";
    } else if (tier === 109) {
      return "MASTER";
    } else if (tier === 110) {
      return "GRANDMASTER";
    } else if (tier === 111) {
      return "CHALLENGER";
    }
  };

  const positionImage = (position) => {
    if (position === 0) {
      return "fill";
    } else if (position === 1) {
      return "top";
    } else if (position === 2) {
      return "jungle";
    } else if (position === 3) {
      return "middle";
    } else if (position === 4) {
      return "bottom";
    } else if (position === 5) {
      return "utility";
    }
  };

  const micImg = (microphone) => {
    if (microphone === true) {
      return <BsMicFill />;
    } else {
      return <BsMicMuteFill />;
    }
  };

  return (
    <>
      <Card style={{ width: "100%", position: "relative" }}>
        <CardBody>
          <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
            <Badge>
              <QueueName code={duo[0].queueCode} />
            </Badge>{" "}
            <PositionTitle code={duo[0].searchingPosition} />
            구해요
          </CardTitle>
          <CardSubtitle tag="h6">
            <TierImage
              src={require(`../../assets/tierImages/` +
                tierImg(duo[0].tierCode) +
                `.png`)}
            />
            {tierImg(duo[0].tierCode)}
          </CardSubtitle>
          <CardSubtitle className="mb-3" tag="h6">
            <PositionImage
              src={require(`../../assets/positionImages/` +
                positionImage(duo[0].myPositionCode) +
                `.png`)}
            />{" "}
            <small>
              {duo[0].summonerName} ({duo[1].nickname})
            </small>{" "}
            {micImg(duo[0].microphone)}
            <SmallDate>{duo[0].regDate.substr(5, 5)}</SmallDate>
          </CardSubtitle>
          <InputMemo
            id="memo"
            name="memo"
            type="textarea"
            value={duo[0].memo || ""}
            readOnly
          />
          <hr />
          <Row className="row-cols-auto g-3">
            <Col>
              <Input placeholder="로그인 후 이용해 주세요" />
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Button color="primary">입력</Button>
            </Col>
          </Row>
          <DashedHr />
        </CardBody>
      </Card>
    </>
  );
};
export default DuoPosting;
