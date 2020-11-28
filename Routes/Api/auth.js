const express = require("express");
const auth = require("../../Middleware/auth");
const User = require("../../Models/User");
//auth
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../Config");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//@Route---------GET-----api/auth
//@DESC ---------TEST ROUTE
//@ACCESS -------PUBLIC

router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @POST ROUTE
//@Route---------POST-----api/auth
//@DESC ---------TEST ROUTE
//@ACCESS -------Private
router.post(
  "/",
  [
    [
      body("email", "Please enter valid email address").isEmail(),
      body("password", "Password is Required").exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email not found please register" }] });
      }

      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password is Not matching!" }] });
      }

      let payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
