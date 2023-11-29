import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Duo from "./pages/duo/duoSearch";
import Login from "./pages/member/login";
import Signup from "./pages/member/signup";
import Record from "./pages/record/record";
import Test from "./pages/home/test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/duo" element={<Duo />} />
          <Route exact path="/record" element={<Record />} />
          <Route path="/test" element={<Test />} />
          <Route exact path="/member/login" element={<Login />} />
          <Route exact path="/member/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
