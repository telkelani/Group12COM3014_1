import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { Container, Form, Button } from "react-bootstrap";
const io = require("socket.io-client");

const Chat = (props) => {
  const socket = io("http://localhost:4002");
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setMessage(value);
    console.log(message);
  };

  const name = props.user.firstName + " " + props.user.lastName;

  const handleSend = () => {
    socket.emit("message", { name: name, message: message });
  };

  useEffect(() => {
    console.log(props);
    console.log(props.user.firstName + " " + props.user.lastName);
    console.log("PROPS");
    console.log(props);
    socket.emit("new-user", name);
    setMessages([
      ...messages,
      {
        name: props.user.firstName + " " + props.user.lastName,
        message: "Connected to the chat",
      },
    ]);
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, []);

  const RenderMessages = () => {
    const listMessages = messages.map((message) => (
      <li>{message.name + ": " + message.message}</li>
    ));

    return <ul>{listMessages}</ul>;
  };

  return (
    <Container className="chatbox">
      <div className="messagebox">
        <RenderMessages />
      </div>
      <div className="input-group">
        <Form.Control
          size="lg"
          type="text"
          onChange={handleChange}
          placeholder="Type something to say!"
        />
        <Button className="btn-default" onClick={handleSend}>
          Send
        </Button>
      </div>
      {/* </div> */}
    </Container>
  );
};

export default Chat;
