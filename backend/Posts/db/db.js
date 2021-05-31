const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:pass@cluster0.j4nfh.mongodb.net/PostDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connected to Posts DB")
}
    )