import { Container, Button, Modal } from "reactstrap";
import Navi from "../../components/nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import DuoModal from "./duoModal";
import DuoPosting from "./duoPosting";

const BtnDiv = styled.div`
  text-align: right;
`;

const DuoSearch = () => {
  const [modal, setModal] = useState(false);
  const [duoList, setDuoList] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get("/duo/duoSearch")
      .then(function (resp) {
        console.log(resp.data);
        setDuoList(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        <div className="mb-3">
          <h1 style={{ fontWeight: "bold" }}>듀오 찾기</h1>
        </div>
        <BtnDiv className="mb-5">
          <Button color="primary" onClick={toggle}>
            글 쓰기
          </Button>
        </BtnDiv>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <DuoModal toggle={toggle} />
          </Modal>
        </div>
        <div>
          <DuoPosting />
        </div>
      </Container>
    </>
  );
};
export default DuoSearch;
