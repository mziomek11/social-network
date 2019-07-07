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
  let count = req.query.count;
  try {
    count = parseInt(count);
  } catch (err) {
    return res.json({ error: true });
  }

  console.time("fetchign psots");
  const posts = await Post.find()
    .limit(4)
    .skip(count)
    .sort({ date: -1 });
  const ownersData = await getDocsOwnersData(posts);
  const postsWithAuthorData = getDocsWithAuthorData(posts, ownersData, [
    "commentsCount"
  ]);

  let comments = [];
  for (let i = 0; i < posts.length; i++) {
    const commentsToSkip = Math.max(posts[i].commentsCount - 2, 0);
    const postComments = await Comment.find({ post: posts[i].id })
      .limit(2)
      .skip(commentsToSkip);
    comments = [...comments, ...postComments];
  }

  const commentsOwnersData = await getDocsOwnersData(comments);
  const commentsWithAuthorData = await getDocsWithAuthorData(
    comments,
    commentsOwnersData,
    ["post"]
  );

  res.json({ posts: postsWithAuthorData, comments: commentsWithAuthorData });
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
  const post = await Post.findById(req.params.id);
  await deleteDoc(req, res, post, Post, [Comment, SubComment], "post");
  res.json({ succes: true });
});

module.exports = router;
