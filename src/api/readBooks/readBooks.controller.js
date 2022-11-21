const mongoose = require("mongoose");

const readBookSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    isbn: { type: Number, require: true, unique: true },
    genre: { type: String, require: true },
    author: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ReadBooks = mongoose.model("read", readBookSchema);
module.exports = ReadBooks;
