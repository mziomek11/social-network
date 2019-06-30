const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Post = require("../../models/Post");
const User = require("../../models/User");

// @GET     api/posts
// @desc    Get All Posts
// @access  Private
router.get("", auth, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @POST    api/posts
// @desc    Create A Post
// @access  Private
router.post("", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const authorName = user.username;

    const postData = {
      content: req.body.content,
      owner: req.user.id,
      authorName
    };
    if (req.body.image) postData.image = image;

    const newPost = new Post(postData);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @GET     api/posts/:id
// @desc    Get One Post
// @access  Private
router.get("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ msg: "Post does not exists" }));
});

// @UPDATE  api/posts/:id
// @desc    Update A Post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  if (!req.body.content && !req.body.image)
    res.status(400).json({ msg: "Send correct data" });
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ msg: "Post does not exists" });
    if (post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    const updateData = { $set: { content: req.body.content } };
    if (req.body.image) updateData["$set"].image = req.body.image;
    await Post.findByIdAndUpdate(req.params.id, updateData);
    const updatedPost = await Post.findById(req.params.id);

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
  }
});

// @DELETE  api/posts/:id
// @desc    Delete A Post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ msg: "Post does not exists" });
    if (post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
