const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");

//@Route---------GET-----api/profile/me
//@DESC ---------GET USER PROFILE
//@ACCESS -------PRIVATE

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    res.json(profile);
    console.log(profile);
  } catch (error) {
    console.error(error);
    res.status(401).send("SERVER ERROR");
  }
});
module.exports = router;
