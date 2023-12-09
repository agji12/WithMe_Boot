import { Navigate, Outlet } from "react-router-dom";

const IsLoginRoute = () => {
  const userId = localStorage.getItem("userId");
  if (!!localStorage.getItem("accessToken") === true) {
    alert(
      `이미 ${userId} 계정으로 로그인하셨습니다\n다른 계정으로 로그인하려면 로그아웃을 먼저 해주시기 바랍니다.`
    );
  }

  return !!localStorage.getItem("accessToken") ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};
export default IsLoginRoute;
