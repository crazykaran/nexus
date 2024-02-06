import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import ad from "../../assets/image.jpg"
import Friend from "../friend/Friend";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [followers,setFollowers]=useState([]);

  useState(()=>{
    const fetchFollowers=async()=>{
      try{
        const usr=await axios.get(process.env.REACT_APP_BACKEND_URL+"/users/?userId="+currentUser._id);
        setFollowers(usr.data.followers);
      }catch(err){
        console.log(err);
      }
    }
    fetchFollowers();
  },[]);

  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id));
  },[user?._id,currentUser.followings]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if(user._id){
          const friendList = await axios.get(process.env.REACT_APP_BACKEND_URL+"/users/friends/" + user._id);
          setFriends(friendList.data);
        }
          
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if(user){
        if (followed) {
        await axios.put(process.env.REACT_APP_BACKEND_URL+`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(process.env.REACT_APP_BACKEND_URL+`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
      }
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
        <>
        <a href="https://3d-shirtcustomizer.netlify.app/" target="_blank" rel="noopener noreferrer">
          <img className="rightbarAd" src={ad} alt="this is an ad." />
        </a>
        <h4 className="rightbarTitle">You Might Know Them</h4>
        <ul className="rightbarFriendList">
          {
            followers.length
            ? followers.map((id) => (
              <Friend key={id} userId={id} />
            ))
            : <div className="noItems">No suggestions Currently</div>
          }
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <>
          <button className="rightbarButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
          <Link to={`/messenger/${user._id}`} style={{textDecoration:"none"}}>
            <button className="rightbarButton">
              Message
            </button>
          </Link>
          </>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div> */}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div key={friend.username}>
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
