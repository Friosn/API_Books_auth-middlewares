const ReadBooksRoutes = require("express").Router();

const { getRead, postRead } = require("./readBooks.controller");

ReadBooksRoutes.get("/read", getRead);
ReadBooksRoutes.post("/", postRead);

module.exports = ReadBooksRoutes;
