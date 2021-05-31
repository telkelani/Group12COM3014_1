const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

//ENABLE CORS



//GET ALL POSTS
router.get("/all", async (request, response) => {
  try {
    const Posts = await Post.find();
    response.json(Posts);
  } catch (err) {
    response.json({ message: err });
  }
});

router.get("/search", async (request, response) => {
  const query = request.query;
  if (query.start_date && query.end_date) {
    const startDate = new Date(query.start_date);
    const endDate = new Date(query.end_date);
    Post.find(
      {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
      function (_, results) {
        if (!results.length) {
          response.send("Articles Not Found");
        } else {
          response.json(results);
        }
      }
    );
  } else {
    //GET POSTS BY TITLE (Like not exact match)

    const titleQuery = query.title;
    console.log(titleQuery);
    Post.find({ title: new RegExp(titleQuery, "i") }, function (_, results) {
      if (!results.length) {
        response.send("Title Not Found");
      } else {
        response.json(results);
      }
    });
  }
});

//GET BACK SPECIFIC POST
router.get("/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.json(post); //ADD await as this may take some time to come from database
  } catch (err) {
    response.json({ message: err });
  }
});

//GET POST BY USER
router.get("/user/:userid", async (request, response) => {
  try {
    const PostsbyUser = await Post.findOne({ "user.user_id":  request.params.userid} )
    response.json(PostsbyUser);
  } catch (err) {
    response.json({ message: err });
  }
});

//DELETE POST
router.delete("/:id", async (request, response) => {
  try {
    const removedPost = await Post.remove({ _id: request.params.id });
    response.json(removedPost);
  } catch (err) {
    response.json({ message: err });
  }
});

//SUBMIT POST
router.post("/newpost", async (request, response) => {
  const submittedPost = request.body;
  const currentUser = submittedPost.user
  
  try {
    const now = new Date();
    const newPost = new Post({
        title: submittedPost.title,
        post: submittedPost.post,
        user: {
          user_id: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName
        },
        createdAt: now,
      });
    const savedPost = await newPost.save();
    response.json(savedPost);
  } catch (err) {
    response.json({ error_message: err });
  }
});

//DELETE POST
router.delete("/:id", async (request, response) => {
  try {
    const removedPost = await Post.deleteOne({ _id: request.params.id });
    response.json(removedPost);
  } catch (err) {
    response.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:id", async (request, response) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: request.params.id },
      {
        $set: {
          title: request.body.title,
          post: request.body.post,
          createdAt: new Date(),
        },
      }
    );
    response.json(updatePost);
  } catch (err) {
    response.json({ message: err });
  }
});

module.exports = router;
