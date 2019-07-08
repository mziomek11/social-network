const express = require("express");
const auth = require("../../middleware/auth");
const server = require("../../server");
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
  try {
    const { count, post } = req.query;

    const commentsToSkip = parseInt(count);
    const comments = await Comment.find({ post })
      .skip(commentsToSkip)
      .limit(2)
      .sort({ date: -1 });

    comments.reverse();
    const ownersData = await getDocsOwnersData(comments);
    const commentsWithAuthorData = getDocsWithAuthorData(comments, ownersData, [
      "post",
      "subCommentsCount"
    ]);
    res.json(commentsWithAuthorData);
  } catch (err) {
    console.log(err);
  }
});

// @POST    api/comments/:post
// @desc    Create A Comment
// @access  Private
router.post("/:post", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.post);
    if (!post) res.status(404).json({ msg: "Not found" });
    await Post.findOneAndUpdate(
      { _id: req.params.post },
      {
        $inc: {
          commentsCount: 1
        }
      }
    );

    const newComment = await createNewDoc(req, Comment, [
      { key: "post", value: post.id }
    ]);

    const commentWithAuthorData = getDocWithAuthorData(newComment, user, [
      "post",
      "subCommentsCount"
    ]);
    server.io.sockets.emit("commentAdd", commentWithAuthorData);
    res.json(commentWithAuthorData);
  } catch (e) {
    res.status(400).json({ msg: "Send correct data" });
  }
});

// @UPDATE  api/comments/:id
// @desc    Update A Comment
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const updatedComment = await updateDoc(req, res, Comment);
  server.io.sockets.emit("commentUpdate", updatedComment);
  res.json(updatedComment);
});

// @DELETE  api/commets/:id
// @desc    Delete A Comment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  await deleteDoc(req, res, comment, Comment, [SubComment], "comment", true);
  await Post.findOneAndUpdate(
    { _id: comment.post },
    {
      $inc: {
        commentsCount: -1
      }
    }
  );
  server.io.sockets.emit("commentDelete", {
    com: req.params.id,
    postId: comment.post
  });
  res.json({ succes: true });
});

module.exports = router;
