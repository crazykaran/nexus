const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    tag:{
      type:String
    },
    location:{
      type:String,
    },
    feeling:{
      type:String,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
PostSchema.index({ desc: 'text' });
PostSchema.index({ tag: 'text' });
module.exports = mongoose.model("Post", PostSchema);
