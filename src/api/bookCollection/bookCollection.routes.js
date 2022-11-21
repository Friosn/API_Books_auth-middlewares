const CollectionRoutes = require("express").Router();

const isAuth = require("../../middlewares/auth.middleware");
const {
  getCollection,
  postCollection,
} = require("./bookCollection.controller");

CollectionRoutes.get("/collection", [isAuth], getCollection);
CollectionRoutes.post("/", [isAuth], postCollection);

module.exports = CollectionRoutes;
