const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const { DB, PORT } = require("./Config");

const app = express();

let StartApp = async () => {
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    success({ message: `successfully database connected ${DB}`, badge: true });
    app.listen(PORT, (err) => {
      if (err) {
        error({ message: err, badge: true });
      } else {
        success({
          message: `App is running on port number ${PORT}`,
          badge: true,
        });
      }
    });
  } catch (err) {
    error({ message: `unable to connect mongodb`, badge: true });
  }
};

StartApp();
