const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Comment = require("../../models/Comment");

// @GET     api/comments/
// @desc    Get All Comments
// @access  Private
router.get("/", auth, (req, res) => {
  Comment.find()
    .sort({ date: 1 })
    .then(comments => res.json(comments));
});

// @POST    api/comments/:postid
// @desc    Create A Comment
// @access  Private
router.post("/:postid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const commentData = {
      content: req.body.content,
      post: req.params.postid,
      owner: req.user.id,
      authorName: user.username,
      authorGender: user.gender
    };
    if (req.body.image) commentData.image = image;

    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();

    res.json(savedComment);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/comments/:id
// @desc    Update A Comment
// @access  Private
router.put("/:id", auth, async (req, res) => {
  if (!req.body.content && !req.body.image)
    res.status(400).json({ msg: "Send correct data" });
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) res.status(404).json({ msg: "Comment does not exists" });
    const post = await Post.findById(comment.post);

    if (comment.owner !== req.user.id && post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    const updateData = { $set: { content: req.body.content } };
    if (req.body.image) updateData["$set"].image = req.body.image;

    await Comment.findByIdAndUpdate(req.params.id, updateData);
    const updatedComment = await Comment.findById(req.params.id);

    res.json(updatedComment);
  } catch (err) {
    console.log(err);
  }
});

// @DELETE  api/commets/:id
// @desc    Delete A Comment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) res.status(404).json({ msg: "Comment does not exists" });
    const post = await Post.findById(comment.post);

    if (comment.owner !== req.user.id && post.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
