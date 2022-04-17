const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
// connect to db
const mongoose = require("mongoose");
// mongoose.connect(process.env.DB_CONNECT, { userNewUrlParser: true  }, () => {
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to db!");
});

//middleware
app.use(express.json());

const { auth, post } = require("./src/router");
app.use("/api/user", auth);

app.use("/api/post", post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
