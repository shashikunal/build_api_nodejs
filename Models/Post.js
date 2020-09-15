const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
    },
    name: {
      type: String,
    },
    avatar: {
      type: [""],
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        text: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Post = model("post", PostSchema);
