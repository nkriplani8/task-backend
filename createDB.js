const {Blog} = require('./models/blog');
const {User} = require('./models/user');
const mongoose = require("mongoose");
const Fawn = require("fawn");


mongoose.connect("mongodb://localhost/blog-friends").then(() => {
  console.log("Connected to database successfully...");
});


Fawn.init(mongoose);
const task = Fawn.Task();


var temp = 1;

insertComment(1,1);
async function insertComment(i, j) {
    let name = "user" + i;
    let title = "blog" + j;
    temp++;
    if (temp == 2000) return;
    const blog = await Blog.find({title: title});

    task
      .update(
        "blogs",
        { title: title },
        { $push: { commentsBy: name } }
      )
      .update(
        "users",
        { name: name },
        { $push: { commentedBlog: blog[0]._id } }
      )
      .run()
      .then(function () {
        console.log("done");
      })
      .catch(function (ex) {
        console.log(ex);
      });
      insertComment(
        Math.floor(Math.random() * 2000 + 1),
        Math.floor(Math.random() * 2000 + 1)
      );
}

createUser(1);
createBlog(1);

async function createUser(i) {
  let name = "user" + i;
  const user = new User({
    name: name,
  });
  await user.save();
  if (i == 5000) return;
  else createUser(i + 1);
}

async function createBlog(i) {
  let name = "blog" + i;
  const blog = new Blog({
    title: name,
  });
  await blog.save();
  if (i == 2000) return;
  else createBlog(i + 1);
}