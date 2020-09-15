const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
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
      // let salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);
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

/*============================forgot password ==============================*/
router.post("/forgot-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      errors: [{ msg: "There is no email address associated with account" }],
    });
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  //Create Reset url
  const resetUrl = `${req.protocol}://localhost:3000/api/users/reset-password/${resetToken}`;

  //Message
  const message = `you are receiving this email because you or some one else has requested the reset of a 
  password. Please make a PUT request to: \n\n <a href="${resetUrl}">${resetUrl}</a>
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });
    res.status(201).json("EMAIL SENT");
  } catch (err) {
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json("EMAIL COULD NOT BE SENT");
  }
  res.status(201).json(user);
});

/*================================RESET PASSWORD PUT REQUEST=====================*/
router.put("/reset-password/:resettoken", async (req, res) => {
  // GEt hashed  token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(401).json({
      errors: [{ msg: "Invalid Token or token expired" }],
    });
  }
  //SET NEW PASSWORD
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return res.status(201).json(user);
});
module.exports = router;
