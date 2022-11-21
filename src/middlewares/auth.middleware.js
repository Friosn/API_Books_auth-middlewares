const jwt = require("jsonwebtoken");

const setError = require("../helper/error/handle.error");

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) return next(setError(401, "Unauthorized User"));

    const jwt = divideTokenHeader(authorization);
    if (typeof jwt !== "String") return next(jwt);
    let token;
    try {
      token = jwt.verify(jwt, req.app.get("secretKey"));
    } catch (error) {
      return next(setError(401, "Invalid token 👹"));
    }
    const auth = {
      id: token.id,
      name: token.name,
    };
    req.authority = auth;
    next();
  } catch (error) {
    return next(setError(500, "Token broke 💔"));
  }
};
//Now we have to split Bearer from the actual token, since they come together to put it in the isAuth function
const divideTokenHeader = (bearerToken) => {
  const splits = bearerToken.split(" ");
  if (splits.length !== 2 || splits[0] !== "Bearer")
    return setError(400, "Not Bearer");
  return splits[1];
};
