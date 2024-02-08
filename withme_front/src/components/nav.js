import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import axios from "axios";

const LinkGray = styled(Link)`
  color: gray;
  text-decoration: none;
`;

const ItemPadding = styled(NavItem)`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
`;

const Navi = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, []);

  const logout = () => {
    axios
      .post("/api/member/logout", localStorage.getItem("userId"), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then(function (resp) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expireTime");
        localStorage.removeItem("userId");
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar {...args} expand="lg" className="bg-body-tertiary">
        <NavbarBrand href="/">With Me</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <ItemPadding>
              <LinkGray to={"/"}>홈</LinkGray>
            </ItemPadding>
            <ItemPadding>
              <LinkGray to={"/duo"}>듀오 찾기</LinkGray>
            </ItemPadding>
            {loginState && (
              <ItemPadding>
                <LinkGray to={"/member/myInfo"}>내정보</LinkGray>
              </ItemPadding>
            )}
            {loginState && (
              <ItemPadding>
                <LinkGray onClick={logout}>로그아웃</LinkGray>
              </ItemPadding>
            )}
            {!loginState && (
              <NavItem
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingRight: "8px",
                }}
              >
                <LinkGray to={"/member/login"}>로그인</LinkGray>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
