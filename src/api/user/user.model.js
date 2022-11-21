const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emoji: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//now we'll preSave the password hashing it  with the number of encriptions asked
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
