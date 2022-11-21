const ToReadRoutes = require("express").Router();

const { getToRead, postToRead } = require("./booksToRead.controller");

ToReadRoutes.get("/toread", getToRead);
ToReadRoutes.post("/", postToRead);

module.exports = ToReadRoutes;
