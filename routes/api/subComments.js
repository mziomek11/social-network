const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const SubComment = require("../../models/SubComment");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @GET     api/subcomments/
// @desc    Get All SubComments
// @access  Private
router.get("/", auth, (req, res) => {
  SubComment.find()
    .sort({ date: 1 })
    .then(subComments => res.json(subComments));
});

// @POST    api/subcomments/:commentid
// @desc    Create A SubComment
// @access  Private
router.post("/:commentid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const comment = await Comment.findById(req.params.commentid);

    const subCommentData = {
      content: req.body.content,
      post: comment.post,
      comment: req.params.commentid,
      owner: req.user.id,
      authorName: user.username,
      authorGender: user.gender
    };
    if (req.body.image) subCommentData.image = image;

    const newSubComment = new SubComment(subCommentData);
    const savedSubComment = await newSubComment.save();

    res.json(savedSubComment);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/subcomments/:id
// @desc    Update A SubComment
// @access  Private
router.put("/:id", auth, async (req, res) => {
  if (!req.body.content && !req.body.image)
    res.status(400).json({ msg: "Send correct data" });
  try {
    const subComment = await SubComment.findById(req.params.id);
    if (!subComment) res.status(404).json({ msg: "Sub comment does not exists" });

    const post = await Post.findById(subComment.post);

    if (subComment.owner !== req.user.id && post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    const updateData = { $set: { content: req.body.content } };
    if (req.body.image) updateData["$set"].image = req.body.image;

    await SubComment.findByIdAndUpdate(req.params.id, updateData);
    const updatedSubComment = await SubComment.findById(req.params.id);

    res.json(updatedSubComment);
  } catch (err) {
    console.log(err);
  }
});

// @DELETE  api/subcomments/:id
// @desc    Delete A SubComment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const subComment = await SubComment.findById(req.params.id);
    if (!subComment) res.status(404).json({ msg: "Sub Comment does not exists" });
    const post = await Post.findById(subComment.post);
    if (subComment.owner !== req.user.id && post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    await SubComment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
