const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const blogs = require("./routes/blogs");

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/blog-friends")
    .then(() => {
        console.log("Connected to database successfully...");
    });

app.use(express.json());
app.use("/api/users/", users);
app.use("/api/blogs/", blogs);





app.listen(port, () => {
    console.log("Listining on port 8080...");
})
