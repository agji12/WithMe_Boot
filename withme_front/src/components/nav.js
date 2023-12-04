import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navi = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">With Me</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/duo">듀오 찾기</Nav.Link>
            {loginState && (
              <Nav.Link href="/member/myInformation">내정보</Nav.Link>
            )}
            {loginState && <Nav.Link onClick={logout}>로그아웃</Nav.Link>}
            {!loginState && <Nav.Link href="/member/login">로그인</Nav.Link>}
            {!loginState && <Nav.Link href="/member/signup">회원가입</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
