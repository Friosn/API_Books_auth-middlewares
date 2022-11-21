const UserRoutes = require("express").Router();

const { register, login, getUsers } = require("./user.controller");

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.get("/", getUsers);

module.exports = UserRoutes;
