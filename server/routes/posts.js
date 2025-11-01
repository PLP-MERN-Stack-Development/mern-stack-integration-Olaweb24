const { body, validationResult } = require('express-validator');
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// GET single post by ID or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let post;

    // If it's a valid MongoDB ObjectId, search by ID
    if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
      post = await Post.findById(idOrSlug);
    }

    // If not found, search by slug
    if (!post) {
      post = await Post.findOne({ slug: idOrSlug });
    }

    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// Validation middleware
const validatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author ID is required'),
  body('category').notEmpty().withMessage('Category ID is required'),
  // Optional fields like tags, featuredImage can be ignored
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Create a new post
router.post('/', validatePost, async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Update an existing post
router.put('/:id', validatePost, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
