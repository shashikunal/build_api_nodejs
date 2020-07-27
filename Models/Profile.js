const { Schema, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    githubusername: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
          require: true,
        },
        company: {
          type: String,
          require: true,
        },
        location: {
          type: String,
          require: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = Profile = model("profile", ProfileSchema);
