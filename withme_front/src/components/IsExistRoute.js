import { Navigate } from "react-router-dom";
import Record from "../pages/record/record";

const IsExistRoute = () => {
  if (!!localStorage.getItem("searchName") === false) {
    alert("검색창을 통해 검색해 주시기 바랍니다.");
  }

  return !!localStorage.getItem("searchName") ? (
    <Record />
  ) : (
    <Navigate to="/" />
  );
};
export default IsExistRoute;
