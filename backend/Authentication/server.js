const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;
const bcrypt = require("bcrypt");
const User = require("./db.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const _ = require("lodash");
// app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.urlencoded());
app.use(express.json());
// app.use(cookieParser());
app.use(
  session({
    secret: "foo",
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:pass@cluster0.j4nfh.mongodb.net/PostDatabase?retryWrites=true&w=majority",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:pass@cluster0.j4nfh.mongodb.net/PostDatabase?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  //Extract user details from request body
  let { firstName, lastName, email, password, dateOfBirth } = req.body;

  console.log(firstName, lastName, email, password, dateOfBirth);

  //If email already exists don't let the account be created
  const emailExists = await User.find({ email: email });
  if (emailExists.length > 0) {
    return res.status(200).send({
      error:
        "An account with that email already exists. Please try another email or login.",
    });
  }

  //Hash the password with bcrypt, 10 salt rounds
  password = await bcrypt.hash(password, 10);

  //Create a new mongoose User model with the details and save it
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
  });

  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: "Oops, something went wrong" });
    }
    return res.sendStatus(200);
  });
});

app.post("/login", async (req, res) => {
  console.log("HI");
  //Extract email and password from request body
  let { email, password } = req.body;

  //Check if email exists in the database
  const user = await User.find({ email: email });
  if (user.length == 0) {
    return res.status(403).send({ error: "No user with that email found." });
  }

  //Check if the password is correct
  bcrypt.compare(password, user[0].password, (err, result) => {
    if (result === false) {
      return res
        .status(403)
        .send({ error: "The password you have entered is incorrect." });
    }

    //Do session stuff here
    req.session.userId = user[0].id;
    return res.sendStatus(200);
  });
});

app.post("/isLoggedIn", (req, res) => {
  console.log(req);
  //Return unauthorized if cookie not included in header
  if (!req.headers.cookie) {
    return res.status(401).send({ error: "Cookie not sent with request" });
  }

  //Extract session ID from the cookie in the header
  let sessionId = req.headers.cookie.split("=")[1].split(".")[0];
  sessionId = sessionId.substring(4, sessionId.length);

  //Check if a session with that ID exists in the database of sessions
  MongoClient.connect(url, (err, client) => {
    console.log("Connected successfully to server");
    const db = client.db("PostDatabase");
    const collection = db.collection("sessions");

    collection.find({ _id: sessionId }).toArray(async (err, docs) => {
      console.log(docs);
      if (docs.length === 0) {
        return res.status(401).send({ error: "Session not found" });
      }
      if (docs[0]._id === sessionId) {
        const userId = req.session.userId;
        const user = await User.findById(userId).exec();
        return res.status(200).send({
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        });
      }
      return res.status(401).send({ error: "Session not found" });
    });
  });
});

app.post("/logout", (req, res) => {
  console.log("hi");
  req.session.destroy();
  return res.sendStatus(200);
});

app.get("/user/:userid", async (req, res) => {
  const userid = req.params.userid;
  console.log(req.session);

  User.findById(userid, (err, results) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    console.log(results);
    return res.status(200).send({ results });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
