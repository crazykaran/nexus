const router = require("express").Router();
const Comments = require("../models/Comments");

//create a comment

router.post("/", async (req, res) => {
  const newCmt = new Comments(req.body);
  try {
    const savedCmt = await newCmt.save();
    res.status(200).json(savedCmt);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
