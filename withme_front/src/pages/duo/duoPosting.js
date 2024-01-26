import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Input,
  InputGroup,
} from "reactstrap";
import styled from "styled-components";
import { BsMicFill } from "react-icons/bs";
import { BsMicMuteFill } from "react-icons/bs";
import PositionTitle from "./positionTitle";
import { useState } from "react";
import axios from "axios";

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
  margin-top: 5px;
  color: #757575;
`;

const DashedHr = styled.hr`
  border-style: dashed;
  margin-bottom: 8px;
`;

const SmallLight = styled.small`
  color: #757575;
`;

const DuoPosting = ({ duo, duoReplyList }) => {
  const [content, setContent] = useState("");

  const queueName = (queue) => {
    if (queue === 1001) {
      return <>빠른 대전</>;
    } else if (queue === 1002) {
      return <>솔로 랭크</>;
    } else if (queue === 1003) {
      return <>자유 랭크</>;
    } else if (queue === 1004) {
      return <>무작위 총력전</>;
    }
  };

  const tierName = (tier) => {
    if (tier === 101) {
      return "UNRANKED";
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

  const positionName = (position) => {
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

  const micIcon = (microphone) => {
    if (microphone === true) {
      return <BsMicFill />;
    } else {
      return <BsMicMuteFill />;
    }
  };

  const writeReply = () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용해 주세요!");
    } else {
      if (content !== "") {
        axios
          .post(
            "/api/duo/duoReply",
            {
              content: content,
              duoCode: duo[0].duoCode,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(function (resp) {
            setContent("");
            window.location.reload();
          })
          .catch(function (resp) {
            alert("글 작성을 다시 진행해 주시기 바랍니다.");
          });
      } else {
        alert("댓글을 입력해 주세요!");
      }
    }
  };

  const duoReply = (duoReplyList) => {
    let reply = [];
    for (let i = 0; i < duoReplyList.length; i++) {
      if (duo[0].duoCode === duoReplyList[i][0].duoCode) {
        reply.push(
          <small key={duoReplyList[i][0].duoReplyCode}>
            {duoReplyList[i][1].nickname}
          </small>
        );
        reply.push(" ");
        reply.push(
          <SmallLight key={-duoReplyList[i][0].duoReplyCode}>
            {duoReplyList[i][0].content}
            <br />
          </SmallLight>
        );
      }
    }
    return reply;
  };

  return (
    <>
      <Card style={{ width: "100%", position: "relative" }}>
        <CardBody>
          <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
            <Badge>{queueName(duo[0].queueCode)}</Badge>{" "}
            <PositionTitle code={duo[0].searchingPosition} />
            구해요
          </CardTitle>
          <CardSubtitle tag="h6">
            <TierImage
              src={require(`../../assets/tierImages/` +
                tierName(duo[0].tierCode) +
                `.png`)}
            />
            {tierName(duo[0].tierCode)}
          </CardSubtitle>
          <CardSubtitle className="mb-3" tag="h6">
            <PositionImage
              src={require(`../../assets/positionImages/` +
                positionName(duo[0].myPositionCode) +
                `.png`)}
            />{" "}
            <small>
              {duo[0].summonerName} ({duo[1].nickname})
            </small>{" "}
            {micIcon(duo[0].microphone)}
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
          <InputGroup>
            <Input
              placeholder="로그인 후 이용해 주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button color="primary" onClick={writeReply}>
              입력
            </Button>
          </InputGroup>
          <DashedHr />
          <div style={{ height: "73px", overflowY: "auto" }}>
            {duoReply(duoReplyList)}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default DuoPosting;
