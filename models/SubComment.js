const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Opinion } = require("./Shared");

const SubCommentSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  ...Opinion
});

module.exports = SubComment = mongoose.model("subcomments", SubCommentSchema);
