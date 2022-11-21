const mongoose = require("mongoose");

const readBookSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    isbn: { type: Number, require: true, unique: true },
    genre: { type: String, require: true },
    author: { type: String, require: true },
    note: { type: Number, enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

const ReadBooks = mongoose.model("read", readBookSchema);
module.exports = ReadBooks;
