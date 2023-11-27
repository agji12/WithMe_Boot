import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import top from "../../assets/positionImages/top.png";
import jungle from "../../assets/positionImages/jungle.png";
import middle from "../../assets/positionImages/middle.png";
import bottom from "../../assets/positionImages/bottom.png";
import utility from "../../assets/positionImages/utility.png";
import fill from "../../assets/positionImages/fill.png";

const ImgSelect = styled.img`
  width: 25px;
  height: 25px;
`;

const DuoModal = ({ toggle }) => {
  const [duo, setDuo] = useState({
    summonerName: "",
    queueCode: 0,
    tierCode: 0,
    myPositionCode: null,
    searchingPosition: [],
    memo: "",
    microphone: false,
  });
  const [summonerNameValid, setSummonerNameValid] = useState(false);
  const [queueCodeValid, setQueueCodeValid] = useState(false);
  const [tierCodeValid, setTierCodeValid] = useState(false);

  const onCheckboxBtnClick = (selected) => {
    const index = duo.searchingPosition.indexOf(selected);

    if (index < 0) {
      duo.searchingPosition.push(selected);
    } else {
      duo.searchingPosition.splice(index, 1);
    }
    setDuo({ ...duo, searchingPosition: [...duo.searchingPosition] });
  };

  const writeDuoSearch = () => {
    let summonerNameFlag = false;
    let queueCodeFlag = false;
    let tierCodeFlag = false;
    let myPositionCodeFlag = false;
    let searchingPositionFlag = false;

    // 소환사 이름, 큐 타입, 본인 티어, 나의 포지션, 찾는 포지션 유효성 검사
    if (duo.summonerName === "") {
      setSummonerNameValid(true);
      summonerNameFlag = false;
    } else {
      setSummonerNameValid(false);
      summonerNameFlag = true;
    }

    if (duo.queueCode === 0) {
      setQueueCodeValid(true);
      queueCodeFlag = false;
    } else {
      setQueueCodeValid(false);
      queueCodeFlag = true;
    }

    if (duo.tierCode === 0) {
      setTierCodeValid(true);
      tierCodeFlag = false;
    } else {
      setTierCodeValid(false);
      tierCodeFlag = true;
    }

    if (duo.myPositionCode === null) {
      myPositionCodeFlag = false;
    } else {
      myPositionCodeFlag = true;
    }

    if (duo.searchingPosition.length === 0) {
      searchingPositionFlag = false;
    } else {
      searchingPositionFlag = true;
      duo.searchingPosition.sort();
    }

    if (
      summonerNameFlag &&
      queueCodeFlag &&
      tierCodeFlag &&
      myPositionCodeFlag &&
      searchingPositionFlag
    ) {
      // searchingPosition : 배열 -> String 변환
      axios
        .post(
          "/duo/duoSearch",
          {
            summonerName: duo.summonerName,
            queueCode: duo.queueCode,
            tierCode: duo.tierCode,
            myPositionCode: duo.myPositionCode,
            searchingPosition: duo.searchingPosition.toString(),
            memo: duo.memo,
            microphone: duo.microphone,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (resp) {
          toggle();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("필수 입력 칸을 채워주세요!");
    }
  };

  return (
    <>
      <ModalHeader toggle={toggle}>듀오 찾기</ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <FormGroup floating>
            <Input
              invalid={summonerNameValid}
              id="summonerName"
              placeholder="summonerName"
              onChange={(e) => {
                setDuo({ ...duo, summonerName: e.target.value });
              }}
            />
            <Label for="summonerName">소환사 이름</Label>
          </FormGroup>
        </div>
        <div>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  invalid={queueCodeValid}
                  defaultValue={0}
                  type="select"
                  onChange={(e) => {
                    setDuo({ ...duo, queueCode: e.target.value });
                  }}
                >
                  <option value="0" disabled hidden>
                    큐 타입
                  </option>
                  <option value="1001">빠른 대전</option>
                  <option value="1002">솔로 랭크</option>
                  <option value="1003">자유 랭크</option>
                  <option value="1004">무작위 총력전</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  invalid={tierCodeValid}
                  defaultValue={0}
                  type="select"
                  onChange={(e) => {
                    setDuo({ ...duo, tierCode: e.target.value });
                  }}
                >
                  <option value="0" disabled hidden>
                    본인 티어(솔랭기준)
                  </option>
                  <option value="101">UNRANK</option>
                  <option value="102">아이언</option>
                  <option value="103">브론즈</option>
                  <option value="104">실버</option>
                  <option value="105">골드</option>
                  <option value="106">플래티넘</option>
                  <option value="107">에매랄드</option>
                  <option value="108">다이아몬드</option>
                  <option value="109">마스터</option>
                  <option value="110">그랜드마스터</option>
                  <option value="111">챌린저</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="mb-3">
          <small className="text-body-secondary">나의 포지션</small>
          <br />
          <ButtonGroup>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 0 })}
              active={duo.myPositionCode === 0}
            >
              <ImgSelect src={fill} />
            </Button>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 1 })}
              active={duo.myPositionCode === 1}
            >
              <ImgSelect src={top} />
            </Button>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 2 })}
              active={duo.myPositionCode === 2}
            >
              <ImgSelect src={jungle} />
            </Button>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 3 })}
              active={duo.myPositionCode === 3}
            >
              <ImgSelect src={middle} />
            </Button>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 4 })}
              active={duo.myPositionCode === 4}
            >
              <ImgSelect src={bottom} />
            </Button>
            <Button
              outline
              onClick={() => setDuo({ ...duo, myPositionCode: 5 })}
              active={duo.myPositionCode === 5}
            >
              <ImgSelect src={utility} />
            </Button>
          </ButtonGroup>
        </div>
        <div className="mb-3">
          <small className="text-body-secondary">찾는 포지션</small>
          <br />
          <ButtonGroup>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(0)}
              active={duo.searchingPosition.includes(0)}
            >
              <ImgSelect src={fill} />
            </Button>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(1)}
              active={duo.searchingPosition.includes(1)}
            >
              <ImgSelect src={top} />
            </Button>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(2)}
              active={duo.searchingPosition.includes(2)}
            >
              <ImgSelect src={jungle} />
            </Button>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(3)}
              active={duo.searchingPosition.includes(3)}
            >
              <ImgSelect src={middle} />
            </Button>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(4)}
              active={duo.searchingPosition.includes(4)}
            >
              <ImgSelect src={bottom} />
            </Button>
            <Button
              outline
              onClick={() => onCheckboxBtnClick(5)}
              active={duo.searchingPosition.includes(5)}
            >
              <ImgSelect src={utility} />
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <FormGroup floating>
            <Input
              id="memo"
              placeholder="memo"
              type="textarea"
              onChange={(e) => {
                setDuo({ ...duo, memo: e.target.value });
              }}
              style={{ height: "100px" }}
            />
            <Label for="memo">메모</Label>
          </FormGroup>
        </div>
        <div>
          <FormGroup switch>
            <Input
              type="switch"
              role="switch"
              onChange={(e) => {
                setDuo({ ...duo, microphone: e.target.checked });
                console.log(e.target.checked);
              }}
            />
            <Label check>마이크 여부</Label>
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={writeDuoSearch}>
          글 등록하기
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </>
  );
};
export default DuoModal;
