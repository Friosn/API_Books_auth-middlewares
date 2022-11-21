const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connect } = require("./helper/database/connect");
const UserRoutes = require("./api/user/user.routes");
const ReadBooksRoutes = require("./api/readBooks/readBooks.routes");
const ToReadRoutes = require("./api/booksToRead/booksToRead.routes");
const CollectionRoutes = require("./api/bookCollection/bookCollection.routes");
const setError = require("./helper/error/handle.error");

connect(); //Allways before the proccess.env

const app = express();
//----------------Now we'll define our headers wich will be always the same for now, so we can copy-paste--------------------

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//And the header configuration
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);
//We also want a transition- limit in our app; so... 1mb is a lot, we normally will put less
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.set("secretKey", process.env.SECRET_KEY_JWT); //we will normally delete the one assigned at the beggining and put directly this one

//--------------------------------------------------

app.use("/future", ToReadRoutes);
app.use("/past", ReadBooksRoutes);
app.use("/", CollectionRoutes);
app.use("/users", UserRoutes);
app.use("*", (req, res, next) => next(setError(404, "Route not defined")));

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error 🤢");
});

app.disable("x-powered-by"); //Like that anybody will be able to know with which lenguage was this app made

//Now we connect to the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port : http://localhost:${process.env.PORT}`); //this PORT would also be directly substituted by process.env.PORT for more anonymity
});
