const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Opinion } = require("./Shared");

const CommentSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  ...Opinion
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
