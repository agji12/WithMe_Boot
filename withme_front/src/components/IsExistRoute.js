import { Navigate, Outlet } from "react-router-dom";

const IsExistRoute = () => {
  console.log(!!localStorage.getItem("searchName"));
  if (!!localStorage.getItem("searchName") === false) {
    alert("검색창을 통해 검색해 주시기 바랍니다.");
  }

  return !!localStorage.getItem("searchName") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default IsExistRoute;
