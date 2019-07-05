const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const SubComment = require("../../models/SubComment");
const User = require("../../models/User");

//Utils
const {
  getDocsOwnersData,
  getDocsWithAuthorData,
  createNewDoc,
  getDocWithAuthorData,
  updateDoc,
  deleteDoc
} = require("./utils");

// @GET     api/posts
// @desc    Get All Posts
// @access  Private
router.get("", auth, async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  const ownersData = await getDocsOwnersData(posts);
  const postsWithAuthorData = getDocsWithAuthorData(posts, ownersData);

  res.json(postsWithAuthorData);
});

// @POST    api/posts
// @desc    Create A Post
// @access  Private
router.post("", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newPost = await createNewDoc(req, Post);
    const postWithAuthorData = getDocWithAuthorData(newPost, user);

    res.json(postWithAuthorData);
  } catch (e) {
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/posts/:id
// @desc    Update A Post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await updateDoc(req, res, Post);
});

// @DELETE  api/posts/:id
// @desc    Delete A Post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await deleteDoc(req, res, Post, [Comment, SubComment], "post");
});

module.exports = router;
