import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Record from "./pages/record/record";
import Login from "./pages/member/login";
import Signup from "./pages/member/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/record" element={<Record />} />
          <Route exact path="/member/login" element={<Login />} />
          <Route exact path="/member/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
