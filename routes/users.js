const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const { Blog } = require("../models/blog");

var temp = [];

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
  });
  try {
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/level/:level", async (req, res) => {
  let ans = [];

  try {
    const user = await User.findById(req.params.id);
    for (id in user.commentedBlog) {
      const blog = await Blog.findById(user.commentedBlog[id]);
      ans = ans.concat(blog.commentsBy);
      ans = ans.filter(unique);
      const index = ans.indexOf(user.name);
      ans.splice(index, 1);
    }
    if (req.params.level > 1) {
      for (let i = 2; i <= req.params.level; i++) {
        let temp = ans;
        ans = await getFriends(user, temp);
      }
    }
    temp = [];
    res.send(ans);
  } catch (error) {
    res.send(`${error}`);
  }
});

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

async function getFriends(user, ans) {
  temp = temp.concat(ans);
  let result = [];
  let bid = [];
  for (i = 0; i < ans.length; i++) {
    const users = await User.find({ name: ans[i] });
    for (id in users[0].commentedBlog) {
      if(!bid.includes(String(users[0].commentedBlog[id]))){
        const blog = await Blog.findById(users[0].commentedBlog[id]);
        bid.push(String(users[0].commentedBlog[id]));
        if (!blog.commentsBy.includes(user.name)) {
          result = result.concat(blog.commentsBy);
        }
      }
      
    }
  }
  result = result.filter(unique);

  for(var i in temp){
    if(result.indexOf(temp[i]) > -1){
      const index = result.indexOf(temp[i]);
      result.splice(index,1);
    }
  }


  return result;
}

module.exports = router;
