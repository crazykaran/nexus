import "./post.css";
import { 
  // MoreVert,
  Favorite,
  FavoriteBorder,
  Comment,
  Bookmark,
  BookmarkBorder,
  LocalOffer
 } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comments from '../comments/Comments';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [commentOpen,setCommentOpen]=useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
    const checkBookmark=async()=>{
      try{
        const usr=await axios.get(process.env.REACT_APP_BACKEND_URL+"/users/?userId="+currentUser._id);
        setIsBookmarked(usr.data.bookmarks.includes(post._id));
      }
      catch(err){
        console.log(err);
      }
    }
    checkBookmark();
  }, [currentUser._id, post.likes,post._id,currentUser.bookmarks]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+`/users?userId=${post.userId}`);
        setUser(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(process.env.REACT_APP_BACKEND_URL+"/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const bookmarkHandler = () => {
    try {
      axios.put(process.env.REACT_APP_BACKEND_URL+"/users/" + post._id + "/bookmark", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="postTopRight">
            {
              isBookmarked
              ? <Bookmark onClick={bookmarkHandler} className="bookmarkIcon"/>
              : <BookmarkBorder onClick={bookmarkHandler} className="bookmarkIcon"/>
            }
          </div>
        </div>
        {
          post.tag &&
          <div className="tag">
            <LocalOffer className="tagIcon" htmlColor={"blue"}/>
            <span className="tagText">{post.tag}</span>
          </div>
        }
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {
              isLiked
              ? <Favorite htmlColor={"tomato"} onClick={likeHandler} className="likeIcon"/>
              : <FavoriteBorder onClick={likeHandler} className="likeIcon"/>
            }
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight" onClick={()=>setCommentOpen(!commentOpen)}>
            <Comment />
            <span className="postCommentText">comments</span>
          </div>
        </div>
            {commentOpen && <Comments postId={post._id}/>}
      </div>
    </div>
  );
}
