const mongoose = require("mongoose");

const booksToReadSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    isbn: { type: String, require: true, unique: true },
    genre: { type: String, require: true },
    author: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ToRead = mongoose.model("toread", booksToReadSchema);
module.exports = ToRead;
