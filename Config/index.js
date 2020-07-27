require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB: process.env.MONGODB_URL,
  SECRET: process.env.JWT_SECRET,
};
