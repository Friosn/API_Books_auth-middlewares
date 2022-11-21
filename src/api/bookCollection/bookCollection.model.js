const mongoose = require("mongoose");

const bookCollectionSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    genre: { type: String, require: true },
    read: [
      { type: mongoose.Schema.Types.ObjectId, ref: "read", require: true },
    ],
    toread: [
      { type: mongoose.Schema.Types.ObjectId, ref: "toread", require: true },
    ],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("collection", bookCollectionSchema);

module.exports = Collection;
