const mongoose = require("mongoose");
const databaseURI =
  "mongodb+srv://admin:pass@cluster0.j4nfh.mongodb.net/PostDatabase?retryWrites=true&w=majority/PostDatabase";
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const User = db.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: String,
});

module.exports = User;
