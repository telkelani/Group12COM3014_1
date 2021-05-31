const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.port || 4002;
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
// app.set("views", "./views");
// app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const rooms = {};

// app.get("/", (req, res) => {
//   res.render("index", { rooms: rooms });
// });

// app.post("/room", (req, res) => {
//   if (rooms[req.body.room] != null) {
//     return res.redirect("/");
//   }
//   rooms[req.body.room] = { users: {} };
//   res.redirect(req.body.room);
//   io.emit("room-created", req.body.room);
// });

// app.get("/:room", (req, res) => {
//   if (rooms[req.params.room] == null) {
//     return res.redirect("/");
//   }
//   res.render("room", { roomName: req.params.room });
// });

io.on("connection", (socket) => {
  let socketName = "";

  socket.on("new-user", (name) => {
    console.log(name);
    console.log(name + " has connected");
    // socket.join(room);
    // rooms[room].users[socket.id] = username;
    // socket.broadcast.emit("user-connected", username);
    socket.broadcast.emit("user-connected", name);
    socketName = name;
  });
  socket.on("message", (message) => {
    console.log(socketName + " has sent the message : " + message.message);
    // socket.broadcast.to(room).emit("chat-message", {
    // 	message: message,
    // 	username: rooms[room].users[socket.id],
    // });
    socket.broadcast.emit("message", {
      name: socketName,
      message: message,
    });
  });
  // socket.on("disconnect", () => {
  // 	getUserRooms(socket).forEach((room) => {
  // 		socket.broadcast
  // 		.to(room)
  // 		.emit("user-disconnected", rooms[room].users[socket.id]);
  // 		delete rooms[room].users[socket.id];
  // 	});
  // });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((usernames, [username, room]) => {
    if (room.users[socket.id] != null) usernames.push(username);
    return usernames;
  }, []);
}

http.listen(PORT, () => {
  console.log(`Server running and listening on ${PORT}`)});
