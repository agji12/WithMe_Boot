import { Navigate, Outlet } from "react-router-dom";

const IsUserRoute = () => {
  if (!!localStorage.getItem("accessToken") === false) {
    alert(`로그인을 먼저 해주시기 바랍니다.`);
  }

  return !!localStorage.getItem("accessToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default IsUserRoute;
