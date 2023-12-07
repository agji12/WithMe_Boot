import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DivCenter = styled.div`
  margin-top: 200px;
  height: 200px;
  background-color: #f5f5f5;
  text-align: center;
`;

const NotFoundSummoner = () => {
  const location = useLocation();

  const searchName = location.state.searchName;
  return (
    <>
      <DivCenter>
        <br />
        <br />
        <h2>'{searchName}' 에 대한 결과를 찾을 수 없습니다.</h2>
        <br />
        <h5>다시 시도해 주시기 바랍니다.</h5>
      </DivCenter>
    </>
  );
};
export default NotFoundSummoner;
