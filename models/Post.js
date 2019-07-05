const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Opinion } = require("./Shared");

const PostSchema = new Schema({
  ...Opinion
});

module.exports = Post = mongoose.model("post", PostSchema);
