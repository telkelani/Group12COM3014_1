import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
const axios = require("axios");

const userServiceUrl = "http://localhost:4000";

const Profile = (props) => {
  const params = useParams();
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const userid = params.userid;
    axios
      .get(userServiceUrl + `/user/${userid}`)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.results);
          console.log("user");
          console.log(user);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.user]);

  const _calculateAge = (dateofbirth) => {
    console.log(dateofbirth);
    const ageDifference = Date.now() - new Date(dateofbirth);
    return Math.abs(new Date(ageDifference).getUTCFullYear() - 1970);
  };

  if (!loaded) {
    return <h1>loading...</h1>;
  } else {
    return (
      <Container className="text-center">
        <div className="card">
          <h1 className="display-1">{user.firstName + " " + user.lastName}</h1>
          <Container style={{ marginLeft: "46%" }}>
            <Avatar />
          </Container>

          <Container style={{ padding: "20px" }}>
            <Row>
              <Col>
                <b>Full Name</b>
              </Col>
              <Col>{user.firstName + " " + user.lastName}</Col>
            </Row>
            <Row>
              <Col>
                <b>Age</b>
              </Col>
              <Col>{_calculateAge(user.dateOfBirth)}</Col>
            </Row>
            <Row>
              <Col>
                <b>Email</b>
              </Col>
              <Col>{user.email}</Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
};

export default Profile;
