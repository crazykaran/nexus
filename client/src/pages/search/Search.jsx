import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Post from "../../components/post/Post";
import axios from 'axios';
import "./search.css"
import { useParams , Link  } from 'react-router-dom';
import { useState ,useEffect ,useContext } from "react";
import {
  RssFeed,
  Group
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
 
export default function Search() {
  const [ menu , setMenu ]=useState(false);
    const query=useParams().query;
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL+`/search?query=${query}`);
        // console.log(response);
        setUsers(response.data.users);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <Topbar menu={menu} setMenu={setMenu} />
      <div className="homeContainer">
      <Sidebar menu={menu}/>
        <div className="searchResults">
          <div className="headContainer">
            <Group className="icon" />
            <div className="heading"> People </div>
          </div>
              {
                users.length ?(
                  users.map((res) => (
                    res.username!==user.username && (<div key={res._id} className="searchResult">
                    <Link to={`/profile/${res.username}`} >
                      <img alt="" src={res.profilePicture}
                          className="image"
                      />
                    </Link>
                    <span className="username">{res.username}</span>
                  </div>)
                    ))
                ):(
                  <div className="emptySearch"> No result found !! </div>
                )
              }
          <div className="headContainer">
            <RssFeed className="icon" />
            <div className="heading"> Posts </div>
          </div>
          
          {
            posts.length ?(
              posts.map((p) => (
                <Post key={p._id} post={p} />
              ))
            ):(
              <div className="emptySearch"> No result found !! </div>
            )
          }
          
        </div>
        <Rightbar/>
      </div>
    </>
  );
}
