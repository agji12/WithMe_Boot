import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Duo from "./pages/duo/duoSearch";
import Login from "./pages/member/login";
import Signup from "./pages/member/signup";
import Record from "./pages/record/record";
import NotFoundSummoner from "./pages/error/record/notFoundSummoner";
import Navi from "./components/nav";
import { useEffect } from "react";
import IsExistRoute from "./components/IsExistRoute";
import IsLoginRoute from "./components/IsLoginRoute";

function App() {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expireTime");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const expireTime = localStorage.getItem("expireTime");

    let logoutTimer;
    if (accessToken && expireTime) {
      const remainingTime = expireTime - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, []);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navi />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/duo" element={<Duo />} />
          <Route element={<IsExistRoute />}>
            <Route exact path="/record" element={<Record />} />
          </Route>
          <Route element={<IsLoginRoute />}>
            <Route exact path="/member/login" element={<Login />} />
          </Route>
          <Route exact path="/member/signup" element={<Signup />} />
          <Route path="/notFound" element={<NotFoundSummoner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
