const mongoose = require("mongoose");

module.exports.Blog = mongoose.model(
  "blogs",
  mongoose.Schema({
    content: {
      type: String,
      require: true,
    },
    commentsBy: {
      type: Array,
      default: [],
    },
  })
);


