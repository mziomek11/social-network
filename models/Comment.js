const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Opinion } = require("./Shared");

const CommentSchema = new Schema({
  ...Opinion,
  post: {
    type: String,
    required: true
  },
  subCommentsCount: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
