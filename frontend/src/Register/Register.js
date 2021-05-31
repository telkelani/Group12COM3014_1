import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
const axios = require("axios");

const loginServiceDetails = "http://localhost:4000";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
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

  const handleSubmit = () => {
    validateFields();

    axios
      .post(loginServiceDetails + "/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.error) {
            return setError(response.data.error);
          }

          setError("");
          history.push("/login");
          history.go();
        } else {
          setError(response.body.error);
        }
      })
      .catch((error) => {
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
    <div>
      <Container>
        <div id="loginform">
          <DisplayError />
          <h2 className="text-center">Register an account</h2>
          <Form>
            <Form.Group>
              <Form.Label>Forename</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                placeholder="Jon"
                onChange={handleChange}
              />
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                placeholder="Doe"
                onChange={handleChange}
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                onChange={handleChange}
                id="dateOfBirth"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          <a href="/login">Want to login?</a>
        </div>
      </Container>
    </div>
  );
};

export default Register;
