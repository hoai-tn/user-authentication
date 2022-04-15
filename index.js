const express = require("express");
const app = express();
const port = 3000;
// connect to db
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT, { userNewUrlParser: true }, () => {
  console.log(" connected to db!");
});

const { auth } = require("./src/router/index");
app.use("/api/user", auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
