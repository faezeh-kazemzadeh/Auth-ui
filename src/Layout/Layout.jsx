import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header } from "./index";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
