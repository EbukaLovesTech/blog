const express = require("express");
const { Post } = require("../models");

const router = express.Router();

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await Post.create({ title, content, published });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all published blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { published: true } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Publish a blog post
router.put("/:id/publish", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.published = true;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
