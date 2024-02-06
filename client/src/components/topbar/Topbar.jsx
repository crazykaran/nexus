import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link , useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { Menu } from "@material-ui/icons";
export default function Topbar({ menu , setMenu}) {
  const [query, setQuery] = useState('');
  const { user } = useContext(AuthContext);
  
  const history = useHistory();

  const handleClick = () => {
    history.push(`/search/${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };
  return (
    <div className="topbarContainer">
      <div className="menu" onClick={()=>setMenu(!menu)}>
        <Menu htmlColor="white"/>
      </div>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logotopbar">Nexus</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input
            placeholder="Search for friend or posts "
            className="searchInput"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress} tabIndex="0" 
          />
                <Search className="searchIcon" onClick={handleClick} />
          {/* {
              <Link to={`/search/${query}`}>
              </Link>
          } */}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger" className="topbarIconItem">
            <Chat htmlColor='white' />
            <span className="topbarIconBadge">2</span>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={ user.profilePicture }
            alt=""
            className="topbarImg "
          />
        </Link>
      </div>
    </div>
  );
}
