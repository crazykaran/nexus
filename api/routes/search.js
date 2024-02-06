const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    // console.log(query);
    const users = await User.find({ $text: { $search: query } });
    const posts = await Post.find({ $text: { $search: query } });
    // console.log(users,posts);

    res.status(200).json({users,posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
