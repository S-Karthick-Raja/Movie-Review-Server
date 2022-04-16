const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const asynHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/users");
const generateToken = require("../Utility/generateTokken");

const usersRoute = express.Router();

//Register
usersRoute.post(
  "/register",
  asynHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error("User Exist");
    }
    const userCreated = await User.create({ fullname, email, password });
    res.json({
      _id: userCreated._id,
      fullname: userCreated.fullname,
      password: userCreated.password,
      email: userCreated.email,
      token: generateToken(userCreated._id),
    });
  })
);

//Login
usersRoute.post(
  "/login",
  asynHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
      //set status code
      res.status(200);

      res.json({
        _id: user._id,
        fullname: user.fullname,
        password: user.password,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

module.exports = usersRoute;
