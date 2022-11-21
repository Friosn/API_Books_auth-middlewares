const dotenv = require("dotenv");

dotenv.config();
const mongoose = require("mongoose");

const { setError } = require("../error/handle.error");

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { host, name } = db.connection;
    console.log(
      `Conected to the data-base: ${name} || in the host: ${host} 🚀 🌕`
    );
  } catch (error) {
    console.error(setError(511, "We could not connect with the data-base 😣"));
  }
};

module.exports = connect;
