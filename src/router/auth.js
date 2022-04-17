const router = require("express").Router();
const User = require("../models/user");
const schema = require("../validations");
const bcrypt = require("bcryptjs/dist/bcrypt");

const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  // Lets validate the data before we a user
  const { name, email, password } = req.body;
  const { error } = schema.validate({ name, email, password });
  if (error) return res.status(400).send(error.details[0]?.message);

  const emailExit = await User.findOne({ email });
  if (emailExit) return res.status(400).send("Email already exits");
  //hash password
  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  console.log(user);
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Email is not found!");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong!");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});



module.exports = router;
