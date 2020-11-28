const express = require("express");
const router = express.Router();
const request = require("request");
const { body, validationResult } = require("express-validator");
const auth = require("../../Middleware/auth");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");
const Post = require("../../Models/Post");

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  WAKATIME_KEY,
} = require("../../Config");

//multer and cloudinary
const multer = require("multer");
const cloudinary = require("../../Config/cloudinaryConfig");
const uploadPhoto = require("../../Config/multer");

const upload = multer({
  storage: uploadPhoto.storage,
});
// console.log(cloudinary);
// console.log(upload);

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
      body("status", "status is required").not().isEmpty(),
      body("skills", "skills are required").not().isEmpty(),
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
      wakatimeusername,
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
    if (wakatimeusername) profileFields.wakatimeusername = wakatimeusername;
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

//@Route---------GET-----api/profile/
//@DESC ---------USER ALL PROFILES
//@ACCESS -------PUBLIC

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", [
      "name",
      "avatar",
      "email",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
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
    }).populate("user", ["name", "avatar", "email"]);
    if (!profile)
      return res
        .status(401)
        .json({ msg: "There is no profile for this user.." });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
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
    await Post.deleteMany({ user: req.user.id });
    /*-----@USER - REMOVE USER --------------*/
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (err) {
    console.error(err.message);
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
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

//@Route---------DELETE-----api/profile/experience:exp_id
//@DESC ---------DELETE EXPERIENCE FROM PROFILE
//@ACCESS -------PRIVATE

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

/*===============================PROFILE EDUCATION ======================================*/
//@Route---------PUT-----api/profile/education
//@DESC ---------ADD PROFILE EDUCATION
//@ACCESS -------PRIVATE

router.put(
  "/education",
  [
    auth,
    [
      body("school", "school is required").not().isEmpty(),
      body("degree", "degree is required").not().isEmpty(),
      body("fieldofstudy", "field of study  is required").not().isEmpty(),
      body("from", "from Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

//@Route---------DELETE-----api/profile/education:edu_id
//@DESC ---------DELETE education FROM PROFILE
//@ACCESS -------PRIVATE

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});
/*===============================END OF PROFILE EDUCATION ===============================*/

/*=========================GITHUB REPO STARTS HERE======================================*/
//@Route---------GET-----api/profile/github/:username
//@DESC ---------GET USER repos from github
//@ACCESS -------PUBLIC
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=10&
      sort=pushed&direction=full_name:desc&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}
      `,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode === 404) {
        res.status(404).json({ msg: "no github profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});
/*=========================GITHUB REPO ENDS HERE========================================*/

/*===================wakatime Api ===================================*/
router.get("/wakatime/:username", (req, res) => {
  try {
    let options = {
      uri: `https://wakatime.com/api/v1/users/${req.params.username}`,
      // Base-64 encode the API Key
      // https://wakatime.com/developers#introduction
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_KEY).toString("base64")}`,
        method: "GET",
        "user-agent": "node.js",
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode === 404) {
        res.status(404).json({ msg: "no Wakatime profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

/*====================wakatime stats =========================*/

router.get("/wakatime/:username/stats", (req, res) => {
  try {
    let options = {
      uri: `https://wakatime.com/api/v1/users/${req.params.username}/stats`,
      // Base-64 encode the API Key
      // https://wakatime.com/developers#introduction
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_KEY).toString("base64")}`,
        method: "GET",
        "user-agent": "node.js",
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode === 404) {
        res.status(404).json({ msg: "no Wakatime profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

/*--------------------------user agent -----------------*/

router.get("/wakatime/:username/user_agents", (req, res) => {
  try {
    let options = {
      uri: `https://wakatime.com/api/v1/users/${req.params.username}/user_agents`,
      // Base-64 encode the API Key
      // https://wakatime.com/developers#introduction
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_KEY).toString("base64")}`,
        method: "GET",
        "user-agent": "node.js",
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode === 404) {
        res.status(404).json({ msg: "no Wakatime profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

//photo upload

router.put(
  "/upload-photo/:id",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      var cloudPhoto = await cloudinary.v2.uploader.upload(req.file.path);
      const profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findByIdAndUpdate(
        req.params.id,
        {
          avatar: [cloudPhoto],
        },
        { new: true }
      );
      await (await user).save;
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR");
    }
  }
);

/*---------------SEARCH OPTIONS --------------------*/
router.get("/search/:skills", async (req, res) => {
  try {
    let regex = new RegExp(req.params.skills, "i");
    let skills = await Profile.find({ skills: regex });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
