import { Container, Button, Modal, Row, Col, ButtonGroup } from "reactstrap";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import DuoModal from "./duoModal";
import DuoPosting from "./duoPosting";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axiosInstance from "../../components/axiosInstance";

const BtnDiv = styled.div`
  text-align: right;
`;

const DuoSearch = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [duoList, setDuoList] = useState([]);
  const [duoReplyList, setDuoReplyList] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const toggle = () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용해 주세요!");
    } else {
      setModal(!modal);
    }
  };

  useEffect(() => {
    // inView가 true일때만 실행
    if (inView) {
      getDuoSearch();
    }
  }, [inView]);

  // 지정한 타겟 div가 보일 때마다 서버와 통신해서 데이터 가져옴
  const getDuoSearch = () => {
    axiosInstance
      .get(`/api/duo/duoSearch/${page}`)
      .then(function (resp) {
        setDuoList([...duoList, ...resp.data["duoList"]]);
        setDuoReplyList([...duoReplyList, ...resp.data["duoReplyList"]]);
        setPage((page) => page + 1);
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          navigate("/serverError", {
            state: {
              errorStatus: error.response.status,
            },
          });
        } else {
          console.log(error.response.status);
        }
      });
  };

  const autoPost = () => {
    for (let i = 700; i < 800; i++) {
      axios
        .post(
          "/api/duo/auto",
          { summonerName: "test" + i },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-5">
          <h1 style={{ fontWeight: "bold" }}>듀오 찾기</h1>
        </div>
        <div className="mb-3" style={{ textAlign: "left" }}>
          <Row>
            <Col style={{ textAlign: "left" }}>
              <ButtonGroup className="my-2" size="sm">
                <Button
                  outline
                  onClick={() => setRSelected(1)}
                  active={rSelected === 1}
                >
                  빠른 대전
                </Button>
                <Button
                  outline
                  onClick={() => setRSelected(2)}
                  active={rSelected === 2}
                >
                  솔로 랭크
                </Button>
                <Button
                  outline
                  onClick={() => setRSelected(3)}
                  active={rSelected === 3}
                >
                  자유 랭크
                </Button>
                <Button
                  outline
                  onClick={() => setRSelected(4)}
                  active={rSelected === 4}
                >
                  무작위 총력전
                </Button>
              </ButtonGroup>
            </Col>
            <Col style={{ textAlign: "right" }}>
              {/* 
              <Button color="primary" onClick={autoPost}>
                자동 글 쓰기
              </Button>
              */}
              <Button color="primary" onClick={toggle}>
                글 쓰기
              </Button>
            </Col>
          </Row>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <DuoModal toggle={toggle} />
          </Modal>
        </div>
        <div>
          <Row xs={1} md={2} lg={3} xl={3}>
            {duoList.map((duo, i) => (
              <Col key={i}>
                <DuoPosting duo={duo} duoReplyList={duoReplyList} />
                <br />
              </Col>
            ))}
            <div ref={ref}></div>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default DuoSearch;
