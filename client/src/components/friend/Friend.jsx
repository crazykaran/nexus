import "./friend.css";
import { useState , useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Friend({userId}) {

  const [user,setUser]=useState({});

  useEffect(()=>{
    const func=async ()=>{
      const u=await axios.get(process.env.REACT_APP_BACKEND_URL+`/users/?userId=${userId}`);
      setUser(u.data);
    }
    func();
  },[userId]);
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
        <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
