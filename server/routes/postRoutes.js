const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Post = require("../models/chits");
const User = require("../models/user");

// Middleware to authenticate routes
router.use(fetchuser);

// Create a new post
router.post("/create", async (req, res) => {
  try {
    const { desc, fileSize, close, tag } = req.body;

    const newPost = await Post.create({
      desc,
      fileSize,
      close,
      tag,
      user: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts
router.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Get post by ID
// router.get("/getPostById/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update post by ID
// router.put("/updatePost/:id", async (req, res) => {
//   try {
//     let postId = await Post.findById(req.params.id);
//     if (!postId) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     const { desc, fileSize, close, tag } = req.body;

//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       { desc, fileSize, close, tag },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json(updatedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Delete post by ID
router.delete("/deletePost/:id", async (req, res) => {
  try {
    let postId = await Post.findById(req.params.id);

    if (!postId) {
      return res.status(404).json({ message: "Post not found" });
    }

    postId = await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
