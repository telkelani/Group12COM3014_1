import "./Home.scss";
import React, { useEffect, useState } from "react";
import JumboTronComponent from "../Jumbotron/JumbotronComponent";
import Thread from "../Thread/Thread";

const axios = require("axios");
const postsServiceUrl = "http://localhost:4001";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(postsServiceUrl + "/posts/api/all").then((response) => {
      response.data.forEach((post) => {
        setPosts((posts) => [...posts, post].reverse())
        //Reverses them so the recently added one comes up first
        console.log(post.user);
      });
      console.log(posts);
    });
  }, []);
  const ListNames = () => {
    const listNames = posts.map((post) => {
      return (
        <li key={post._id}>
          <Thread title={post.title} body={post.post} user={post.user} createdAt={post.createdAt} />
        </li>
      );
    });

    return <ul>{listNames}</ul>;
  };
  return (
    <div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <JumboTronComponent />
        <div style={{ display: "inline-block" }}>
          <ListNames></ListNames>
        </div>
      </div>
    </div>
  );
};

export default Home;
