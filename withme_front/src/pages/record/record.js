import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { useLocation } from "react-router-dom";
import Navi from "../../components/nav";

import TierCard from "./tier/tierCard";
import NoTierCard from "./tier/noTierCard";
import SummonerInfo from "./summonerInfo";

const Record = () => {
  const location = useLocation();
  console.log(location);
  const summonerName = location.state.summonerName;
  const summonerInfo = location.state.summonerInfo;
  const summonerTierSolo = location.state.summonerTierSolo;
  const summonerTierFlex = location.state.summonerTierFlex;
  const soloState = location.state.soloState;
  const flexState = location.state.flexState;
  //const [inputName, setInputName] = useState("");

  /*
  const searchRecord = () => {
    
    console.log(inputName);
    if (inputName !== "") {
      setSummonerInfo([]);
      setSummonerTierSolo([]);
      setSummonerTierFlex([]);
      summonerName = inputName;
      
    } else {
      alert("소환사명을 입력해 주세요!");
    }
  };
  */
  return (
    <>
      <Navi />
      <Container
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        style={{ marginTop: 50 }}
      >
        {/*
        <div className="mb-3">
          <InputGroup>
            <Input
              placeholder="소환사명을 입력해 주세요"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />    
              <Button color="outline-secondary" onClick={searchRecord}>
                검색
              </Button>
          </InputGroup>
        </div>
            */}
        <div className="mb-5">
          <SummonerInfo info={summonerInfo} />
        </div>
        <div className="mb-3">
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>솔로 랭크</CardHeader>
                <CardBody>
                  {soloState && <TierCard type={summonerTierSolo} />}
                  {!soloState && <NoTierCard />}
                </CardBody>
              </Card>
              <br />
            </Col>
            <Col>
              <Card>
                <CardHeader>자유 랭크</CardHeader>
                <CardBody>
                  {flexState && <TierCard type={summonerTierFlex} />}
                  {!flexState && <NoTierCard />}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Record;
