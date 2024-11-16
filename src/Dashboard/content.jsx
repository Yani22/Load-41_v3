import classNames from "classnames";
import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";


const Content = (props) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": props.isOpen })}
    >
      <NavBar toggle={props.toggle} uid={props?.uid} />
      <SideBar />
      <Outlet />
    </Container>
  );
}

export default Content;