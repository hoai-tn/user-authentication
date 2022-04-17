const router = require("express").Router();
const User = require("../models/user");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, (req, res) => {
//   const { email } = req.params;
//   const user = User.findOne({ email });

//   if (!user) return res.status(400).send("Email is not found!");
  res.send("hi there!");
});
module.exports = router;
