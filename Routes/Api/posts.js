const express = require("express");
const router = express.Router();

//@Route---------GET-----api/posts
//@DESC ---------TEST ROUTE
//@ACCESS -------PUBLIC

router.get("/", (req, res) => res.send("Posts routes"));
module.exports = router;
