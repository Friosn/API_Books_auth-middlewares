const ToReadRoutes = require("express").Router();

const isAuth = require("../../middlewares/auth.middleware");
const { getToRead, postToRead } = require("./booksToRead.controller");

ToReadRoutes.get("/toread", getToRead);
ToReadRoutes.post("/", [isAuth], postToRead);

module.exports = ToReadRoutes;
