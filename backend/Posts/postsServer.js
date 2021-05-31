const express = require("express");
const app = express();
const db = require("./db/db.js");

const PORT = process.env.PORT || 4001;
const postsRoute = require("./routes/posts");
const cors = require('cors')

//These two lines are needed to interpret response in JSON


// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//This is going to be the default endpoint, postsRoute handles all the routes
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});
app.use("/posts/api", postsRoute);

app.listen(PORT, () => console.log(`Server running and listening on ${PORT}`));
