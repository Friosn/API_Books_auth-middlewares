const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./user.model");
const setError = require("../../helper/error/handle.error");

//We'll do the register now
const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicateCheck = await User.findOne({
      username: newUser.username,
    });
    if (userDuplicateCheck) return next("User exists already");

    const newUserToDB = newUser.save();
    return res.json({
      status: 201,
      message: "User created successfully",
      data: newUserToDB,
    });
  } catch (error) {
    return next(setError(500, "Registration failed"));
  }
};

//Now we'll make a function for the login
const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ username: req.body.username });
    let token;
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //this function compares both passwords, the one already in the DB and the one that the user is writting, both encrypted
      userInfo.password = null;

      //this is the token structure, made with the library jsonwebtoken
      token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        req.app.get("secretKey"),
        { expiresIn: "2h" }
      );
      return res.json({
        status: 200,
        message: "Welcome to your BookWishList!",
        user: userInfo,
        token: token,
      });
    } else {
      return next("Password is not correct");
    }
  } catch (error) {
    return next(setError(500, "Login failed"));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(setError(500, "No users to recover"));
  }
};

module.exports = { register, login, getUsers };
