const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const { success, error } = require("consola");
const path = require("path");

const { DB, PORT } = require("./Config");
var bodyParser = require("body-parser");

const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/public/", express.static(path.join(__dirname, "../public")));

let StartApp = async () => {
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
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

//define routes
app.use("/api/users", require("./Routes/Api/users"));
app.use("/api/profile", require("./Routes/Api/profile"));
app.use("/api/auth", require("./Routes/Api/auth"));
app.use("/api/posts", require("./Routes/Api/posts"));

StartApp();
