module.exports.Opinion = {
  owner: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  likedBy: {
    type: [],
    default: [],
    required: true
  }
};
