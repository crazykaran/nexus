const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    name:{
      type:String
    },
    profilePictue:{
        type:String,
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema);
