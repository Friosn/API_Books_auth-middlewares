const jwt = require("jsonwebtoken");

const setError = require("../helper/error/handle.error");

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.json(setError(401, "Unauthorized User 🚨"));

  //Now we have to split Bearer from the actual token, since they come together to put it in the isAuth function

  const splits = authorization.split(" ");

  if (splits.length !== 2 || splits[0] !== "Bearer")
    return setError(400, "Not Bearer");

  const jwtStringify = splits[1];
  try {
    var token = jwt.verify(jwtStringify, req.app.get("secretKey"));
  } catch (error) {
    return next(setError(401, "Invalid token 👹"));
  }
  const auth = {
    id: token.id,
    name: token.name,
  };

  req.authority = auth;

  next();
};

module.exports = isAuth;
