const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../Middleware/auth");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");

//@Route---------POST-----api/posts
//@DESC ---------CREATE POST
//@ACCESS -------PRIVATE

router.post(
  "/",
  [
    auth,
    [body("title", "title is required").not().isEmpty()],
    [body("text", "text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findById(req.user.id).select("-password");
      console.log(user);
      let newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(401).send("SERVER ERROR");
    }
  }
);

//@Route---------GET-----api/posts
//@DESC ---------GET POSTS
//@ACCESS -------PUBLIC

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(401).send("SERVER ERROR");
  }
});

//@Route---------GET-----api/posts/:id
//@DESC ---------GET POSTS
//@ACCESS -------private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(401).send("SERVER ERROR");
  }
});

//@Route---------DELETE-----api/posts/:id
//@DESC ---------DELETE POSTS
//@ACCESS -------private
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not Authorized" });
    }
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(401).send("SERVER ERROR");
  }
});

//@Route---------PUT-----api/posts/like/:id
//@DESC ---------LIKE A POSTS
//@ACCESS -------private'
router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(401).send("SERVER ERROR");
  }
});

//@Route---------PUT-----api/posts/unlike/:id
//@DESC ---------UNLIKE A POSTS
//@ACCESS -------private'
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    let removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(401).send("SERVER ERROR");
  }
});

//@Route---------POST-----api/posts/comments/:id
//@DESC ---------CREATE COMMENTS
//@ACCESS -------PRIVATE

router.post(
  "/comments/:id",
  [auth, [body("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findById(req.user.id).select("-password");
      let post = await Post.findById(req.params.id);

      let newComments = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComments);
      post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(401).send("SERVER ERROR");
    }
  }
);

//@Route---------DELETE-----api/posts/comments/:id/:comment_id
//@DESC ---------DELETE COMMENTS
//@ACCESS -------PRIVATE

router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    //pull out comments
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //make sure comments exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exits" });
    }
    //check users
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(401).send("SERVER ERROR");
  }
});

module.exports = router;
