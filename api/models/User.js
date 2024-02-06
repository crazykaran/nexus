const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique:true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/nexus-ca517.appspot.com/o/noAvatar.png?alt=media&token=25162b3a-b3c2-4791-9929-d099021b2f70",
    },
    coverPicture: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/nexus-ca517.appspot.com/o/noCover.png?alt=media&token=c4b4cbc6-daf9-4ad1-bf1a-d5ad378ffd40",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    bookmarks:{
      type:Array,
      default:[],
    },
  },
  { timestamps: true }
);
UserSchema.index({ username: 'text' });
module.exports = mongoose.model("User", UserSchema);
