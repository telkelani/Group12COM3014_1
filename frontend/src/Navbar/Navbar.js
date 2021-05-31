import React from "react";
import "./Navbar.scss";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

const axios = require("axios");
const loginServiceDetails = "http://localhost:4000";

const NavbarComponent = (props) => {
  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .post(loginServiceDetails + "/logout")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location.reload();
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const LoginStatus = () => {
    if (props.user === false) {
      return (
        <Form inline>
          <Nav.Link href="/login" style={{ color: "white" }}>
            Login
          </Nav.Link>
        </Form>
      );
    }

    return (
      <Form inline>
        <Nav.Link
          href={`/user/${props.user.userId}`}
          style={{ color: "white" }}
        >
          {props.user.firstName + " " + props.user.lastName}
        </Nav.Link>
        <Nav.Link href="/chat" style={{ color: "white" }}>
          Chats
        </Nav.Link>
        <Nav.Link onClick={handleLogout} style={{ color: "white" }}>
          Logout
        </Nav.Link>
      </Form>
    );
  };

  return (
    <div>
      <Navbar bg="navbar" variant="dark">
        <Navbar.Brand href="/">Pulse</Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        <LoginStatus />
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
