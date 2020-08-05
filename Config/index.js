require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB: process.env.MONGODB_URL,
  SECRET: process.env.JWT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};
