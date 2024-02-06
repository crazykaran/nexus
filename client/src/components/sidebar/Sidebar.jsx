import "./sidebar.css";
import {
  RssFeed,
  Chat,
  // PlayCircleFilledOutlined,
  // Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Settings,
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import Friend from "../friend/Friend";
import { useState ,useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

export default function Sidebar({menu}) {

  const {user}=useContext(AuthContext);
  const [followings,setFollowings]=useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+`/users?userId=${user._id}`);
        setFollowings(res.data.followings);
      }catch(err){
        console.log(err);
      }
    };
    fetchUser();
  }, [user._id]);

  return (
    <div className={`sidebar ${menu ? 'active' : 'inactive'}`}>
      <div className="sidebarWrapper">
          <Link style={{textDecoration:'none'}} to="/">
            <div className="sidebarListItem">
              <div className="sidebarIcon">
                <RssFeed htmlColor={"black"}  />
              </div>
              <span className="sidebarListItemText">Feed</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/messenger">
            <div className="sidebarListItem">
              <Chat htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </div>
          </Link>
          {/* <Link style={{textDecoration:'none'}} to="/videos">
            <div className="sidebarListItem">
              <PlayCircleFilledOutlined htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </div>
          </Link> */}
          {/* <Link style={{textDecoration:'none'}} to="/gropus">
            <div className="sidebarListItem">
              <Group htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </div>
          </Link> */}
          <Link style={{textDecoration:'none'}} to="/bookmarks">
            <div className="sidebarListItem">
              <Bookmark htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/tags/questions">
            <div className="sidebarListItem">
              <HelpOutline htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/tags/jobs">
            <div className="sidebarListItem">
              <WorkOutline htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/tags/events">
            <div className="sidebarListItem">
              <Event htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/tags/courses">
            <div className="sidebarListItem">
              <School htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </div>
          </Link>
          <Link style={{textDecoration:'none'}} to="/setting">
            <div className="sidebarListItem">
              <Settings htmlColor={"black"} className="sidebarIcon" />
              <span className="sidebarListItemText">Settings</span>
            </div>
          </Link>
        <hr className="sidebarHr" />
        <h4 className="following">Followings</h4>
        <ul className="sidebarFriendList">
        {
            followings.length
            ? followings.map((id) => (
              <Friend key={id} userId={id} />
            ))
            : <div className="noItems">Follow Someone</div>
          }
        </ul>
      </div>
    </div>
  );
}
