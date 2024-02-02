const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdminRoutes = require("./routes/adminRoutes");
const TweetRoutes = require("./routes/tweetRoutes");
const UserRoutes = require("./routes/userRoutes");
require("dotenv").config();

const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello I am Up!");
})

// use the controller 
app.use('/admin', AdminRoutes);
app.use('/tweets', TweetRoutes);
app.use('/users', UserRoutes);

// establishing the connection
// before that run brew services start mongodb-community@7.0
// on your local device to develop locally.
mongoose
    .connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on ${port}`);
            // print success message once the connection is established.
            console.log("connection established");
        });
    })
    .catch((err) => {
        console.log(err);
    });