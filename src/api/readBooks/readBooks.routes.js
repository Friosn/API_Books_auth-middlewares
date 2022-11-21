const ReadBooksRoutes = require("express").Router();

const { getRead, postRead } = require("./readBooks.controller");
const isAuth = require("../../middlewares/auth.middleware");

ReadBooksRoutes.get("/read", getRead);
ReadBooksRoutes.post("/", [isAuth], postRead);

module.exports = ReadBooksRoutes;
