const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
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

//@Route---------POST-----api/profile/
//@DESC ---------CREATE OR UPDATE USER PROFILE
//@ACCESS -------PRIVATE

router.post(
  "/",
  [
    auth,
    [
      body("status", "Status is Required").not().isEmpty(),
      body("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //build profile Object

    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;

    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //build social fields
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

//@Route---------GET-----api/profile/
//@DESC ---------USER ALL PROFILES
//@ACCESS -------PUBLIC

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SERVER ERROR");
  }
});

//@Route---------GET-----api/profile/user/:user_id
//@DESC ---------GET PROFILE BY USER ID
//@ACCESS -------PUBLIC

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res
        .status(401)
        .json({ msg: "There is no profile for this user.." });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(401).json({ msg: "Profile not found" });
    }
    res.status(500).send("SERVER ERROR");
  }
});

//@Route---------DELETE-----api/profile/
//@DESC ---------DELETE PROFILE , USER ,POST
//@ACCESS -------PRIVATE

router.delete("/", auth, async (req, res) => {
  try {
    /*-----@TODO - REMOVE USER PROFILE ------*/
    /*-----@USER - REMOVE USER --------------*/
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SERVER ERROR");
  }
});

//@Route---------PUT-----api/profile/experience
//@DESC ---------ADD PROFILE EXPERIENCE
//@ACCESS -------PRIVATE

router.put(
  "/experience",
  [
    auth,
    [
      body("title", "Title is Required").not().isEmpty(),
      body("company", "Company is Required").not().isEmpty(),
      body("from", "From Date is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);
module.exports = router;
