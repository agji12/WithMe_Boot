import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import TierCard from "../record/tier/tierCard";
import NoTierCard from "../record/tier/noTierCard";

const Test = () => {
  const location = useLocation();
  console.log(location);
  const summonerName = location.state.summonerName;
  const summonerInfo = location.state.summonerInfo;
  const summonerTierSolo = location.state.summonerTierSolo;
  const summonerTierFlex = location.state.summonerTierFlex;
  const soloState = location.state.soloState;
  const flexState = location.state.flexState;

  return (
    <>
      HI :{location.state.soloState} : {location.state.flexState}
      {summonerName} {summonerInfo.accountId} {summonerInfo.profileIconId}
      <img
        src={
          "http://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/" +
          summonerInfo.profileIconId +
          ".png"
        }
      />
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
    </>
  );
};
export default Test;
