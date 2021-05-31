import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.scss";

const axios = require("axios");
const loginServiceDetails = "http://localhost:4000";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData((data) => ({
      ...data,
      [id]: value,
    }));
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields();

    axios
      .post(
        loginServiceDetails + "/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.error) {
            return setError(response.data.error);
          }
          console.log(response);

          setError("");
          history.push("/");
          history.go();
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.log(error);
      });
  };

  const validateFields = () => {
    return true;
  };

  const DisplayError = () => {
    if (error === "") {
      return null;
    }
    return <p className="text-center text-danger">{error}</p>;
  };

  return (
    <Container>
      <div id="loginform">
        <DisplayError />
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              id="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <a href="/register">Want to register?</a>
      </div>
    </Container>
  );
};

export default Login;
