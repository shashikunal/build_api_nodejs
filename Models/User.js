const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: [""],
    },
  },
  { timestamps: true }
);

module.exports = User = model("user", UserSchema);
