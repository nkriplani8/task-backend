const express = require('express');
const router = express.Router();
const { Blog, validate } = require("../models/blog");
const { User } = require('../models/user');
const mongoose = require('mongoose');
const Fawn = require("fawn");
const Joi = require("joi");


Fawn.init(mongoose);
const task = Fawn.Task();

router.get('/', async(req, res) => {
    const blog = await Blog.find();
    res.send(blog);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const blog = new Blog({
      title: req.body.content,
    });
    try {
      const result = await blog.save();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
});

router.put('/:id/comment', async(req, res) => {

    const {error} = validateFunc(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.status(404).send("Blog not found");
    const user = User.findOne(req.body.username);

    task
    .update("blogs", {_id: blog._id} , {$push :{commentsBy : req.body.username}})
    .update("users", {name: req.body.username} , {$push: {commentedBlog : blog._id }})
    .run()
    .then(function(result){
        res.send(result);
    }).catch(function(ex){
        res.status(500).send(ex);
    });

});

function validateFunc(req){
    const schema = Joi.object({
        username: Joi.string().min(4).required()
    });
    return schema.validate(req);
}

module.exports = router;