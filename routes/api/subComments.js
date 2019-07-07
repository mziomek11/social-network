const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const SubComment = require("../../models/SubComment");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
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

// @GET     api/subcomments/
// @desc    Get All SubComments
// @access  Private
router.get("/", auth, async (req, res) => {
  const subComments = await SubComment.find().sort({ date: 1 });
  const ownersData = await getDocsOwnersData(subComments);
  const subCommentsWithAuthorData = getDocsWithAuthorData(
    subComments,
    ownersData,
    ["post", "comment"]
  );

  res.json(subCommentsWithAuthorData);
});

// @POST    api/subcomments/:commentid
// @desc    Create A SubComment
// @access  Private
router.post("/:comment", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const comment = await Comment.findById(req.params.comment);
    if (!comment) res.status(404).json({ msg: "Not found" });

    const newSubComment = await createNewDoc(req, SubComment, [
      { key: "post", value: comment.post },
      { key: "comment", value: comment.id }
    ]);
    const subCommentWithAuthorData = getDocWithAuthorData(newSubComment, user, [
      "post",
      "comment"
    ]);

    res.json(subCommentWithAuthorData);
  } catch (e) {
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/subcomments/:id
// @desc    Update A SubComment
// @access  Private
router.put("/:id", auth, async (req, res) => {
 await updateDoc(req, res, SubComment);
});

// @DELETE  api/subcomments/:id
// @desc    Delete A SubComment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  const subComment = await SubComment.findById(req.params.id);
  await deleteDoc(req, res, subComment, SubComment, [], "", true);
  res.json({succes: true});
});

module.exports = router;
