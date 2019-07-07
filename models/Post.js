const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Opinion } = require("./Shared");

const PostSchema = new Schema({
  ...Opinion,
  commentsCount: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
