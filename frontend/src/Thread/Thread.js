import React from "react";
import "./Thread.scss";

const Thread = (props) => {
  

  const handleThumbsUpClick = (e) => {
    console.log("Thumbs up pressed!");
    e.stopPropagation();
  };

  const handleThumbsDownClick = (e) => {
    console.log("Thumbs down pressed!");
    e.stopPropagation();
  };

  const handleCommentsClick = (e) => {
    console.log("Thumbs down pressed!");
    e.stopPropagation();
  };

  const handleClick = () => {
    console.log("bye");
  };

  //Display time on post
  const displayTimePosted = (time) => {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone //Gets client timezone
    const localeString = new Date(time).toLocaleString({timeZone: clientTimeZone})
    
    return localeString
  }
  return (
    <div className="thread" onClick={handleClick}>
      <h1 id="title">
        {props.title}
        <p className="lead">
          Posted by {props.user.firstName + " " + props.user.lastName } <br />
          Created At {displayTimePosted(props.createdAt)}
        </p>

      </h1>

      <p>{props.body}</p>

      <div id="footer">
        <img
          style={{ width: "30px", height: "30px", margin: "5px" }}
          onClick={handleThumbsUpClick}
          src="/thumbs-up-regular.svg"
        />
        <img
          style={{ width: "30px", height: "30px", margin: "5px" }}
          onClick={handleThumbsDownClick}
          src="/thumbs-down-regular.svg"
        />
        <a style={{ fontSize: "20px", margin: "10px" }}> 8 Likes</a>
        <a
          style={{ fontSize: "20px", margin: "10px" }}
          onClick={handleCommentsClick}
          href="/"
        >
          2 Comments
        </a>
      </div>
    </div>
  );
};

export default Thread;
