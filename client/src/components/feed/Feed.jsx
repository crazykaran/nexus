import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username , tag ,bookmarks}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchPosts = async () => {
      let res;
      if(tag){
        res= await axios.get(process.env.REACT_APP_BACKEND_URL+"/posts/tag/"+tag);
      }else if(username){
        res= await axios.get(process.env.REACT_APP_BACKEND_URL+"/posts/profile/" + username);
      }else if(bookmarks){
        res=await axios.get(process.env.REACT_APP_BACKEND_URL+"/posts/bookmarks/"+user._id);
      }else{
        res=await axios.get(process.env.REACT_APP_BACKEND_URL+"/posts/timeline/" + user._id);
      }
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id,tag,bookmarks]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        
        {
          posts.length
          ?
          posts.map((p) => (
            <Post key={p._id} post={p} />
          ))
          :<div className="noitems">No Post available</div>
        }
      </div>
    </div>
  );
}
