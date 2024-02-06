const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require('cors');
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentsRoute = require("./routes/comments");
const searchRoute = require("./routes/search");
dotenv.config();

//connecting to database
mongoose.connect(
  process.env.MONGO_URL
).then(()=>{
  console.log("connected to database");
}).catch((err)=>{console.log(err);});

// app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/search", searchRoute);
app.use("/api/comments", commentsRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
