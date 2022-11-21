const CollectionRoutes = require("express").Router();

const {
  getCollection,
  postCollection,
} = require("./bookCollection.controller");

CollectionRoutes.get("/collections", getCollection);
CollectionRoutes.post("/", postCollection);

module.exports = CollectionRoutes;
