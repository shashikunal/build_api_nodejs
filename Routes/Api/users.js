const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../Config");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator/");
const User = require("../../Models/User");

//@Route---------GET-----api/users
//@DESC ---------TEST ROUTE
//@ACCESS -------PUBLIC

router.post(
  "/",
  [
    body("name", "Name is Required").not().isEmpty(),
    body("email", "Please enter valid Email Address").isEmail(),
    body(
      "password",
      "Please enter a Password with minimum 6 character"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already Exits" }] });
      }
      const avatar = gravatar.url("email", {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      error({
        message: "server error",
        badge: true,
      });
      res.status(401).json({ msg: "server error" });
    }
  }
);
module.exports = router;
