const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model("users", mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    commentedBlog: {
        type: Array,
        default: [],
    }
}));

function validateFun(user) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateFun;
