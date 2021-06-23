const mongoose = require("mongoose");
const Joi = require("joi");

const Blog = mongoose.model(
  "blogs",
  mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    commentsBy: {
      type: Array,
      default: [],
    },
  })
);

function validateFun(blog) {
  const schema = Joi.object({
    content: Joi.string().min(4).required(),
  });
  return schema.validate(blog);
}

module.exports.Blog = Blog;
module.exports.validate = validateFun;
