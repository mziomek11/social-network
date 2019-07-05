const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Comment = require("../../models/Comment");
const SubComment = require("../../models/SubComment");

//Utils
const {
  getDocsOwnersData,
  getDocsWithAuthorData,
  createNewDoc,
  getDocWithAuthorData,
  updateDoc,
  deleteDoc
} = require("./utils");

// @GET     api/comments/
// @desc    Get All Comments
// @access  Private
router.get("/", auth, async (req, res) => {
  const comments = await Comment.find().sort({ date: 1 });
  const ownersData = await getDocsOwnersData(comments);
  const commentsWithAuthorData = getDocsWithAuthorData(comments, ownersData, [
    "post"
  ]);

  res.json(commentsWithAuthorData);
});

// @POST    api/comments/:post
// @desc    Create A Comment
// @access  Private
router.post("/:post", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.post);
    if (!post) res.status(404).json({ msg: "Not found" });

    const newComment = await createNewDoc(req, Comment, [
      { key: "post", value: post.id }
    ]);

    const commentWithAuthorData = getDocWithAuthorData(newComment, user, [
      "post"
    ]);

    res.json(commentWithAuthorData);
  } catch (e) {
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/comments/:id
// @desc    Update A Comment
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await updateDoc(req, res, Comment);
});

// @DELETE  api/commets/:id
// @desc    Delete A Comment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await deleteDoc(req, res, Comment, [SubComment], "comment", true);
});

module.exports = router;
