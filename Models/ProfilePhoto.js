const { Schema, model } = require("mongoose");
const ProfilePhoto = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    profile_photo: String,
  },
  { timestamps: true }
);

module.exports = model("profile_photo", ProfilePhoto);
