const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./user.model");

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
    console.error("User register failed!");
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
    console.error("Login failed");
  }
};

module.exports = { register, login };