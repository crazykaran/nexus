import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./setting.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { storage } from "../../firebase";
import axios from "axios";
import { 
  PermMedia,
  Room,
  AccountCircle,
  Description,
  Cancel,
} from "@material-ui/icons";
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage'; 
import { v4 } from 'uuid';

export default function Setting() {
  const [ menu , setMenu ]=useState(false);
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  
  const [description, setDescription] = useState(user.description);
  const [city, setCity] = useState(user.city);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newProfile = {
      userId: user._id,
      description: description,
      city: city,
    };
    if (profile) {
      try{
        const imageref=ref(storage,`profilePicture/${profile.name + v4()}`);
        await uploadBytes(imageref,profile);
        const url = await getDownloadURL(ref(imageref));
        newProfile.profilePicture = url;
      }catch(err){
        console.log(err);
      }
    }
    if (cover) { 
      try{
        const imageref=ref(storage,`coverPicture/${cover.name + v4()}`);
        await uploadBytes(imageref,cover);
        const url = await getDownloadURL(ref(imageref));
        newProfile.coverPicture = url;
      }catch(err){
        console.log(err);
      }
    }
    try {
      await axios.put(process.env.REACT_APP_BACKEND_URL+"/users/"+user._id, newProfile);
      const info=await axios.get(process.env.REACT_APP_BACKEND_URL+`/users?userId=${user._id}`);
      localStorage.setItem("user", JSON.stringify(info.data));
      window.location.reload();
    } catch (err) {console.log(err);}
  };
  const handleLogout=()=>{
    localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <>
      <Topbar menu={menu} setMenu={setMenu} />
       <div className="settingContainer">
       <Sidebar menu={menu}/>
        <div className="setting">
        <form className="form" onSubmit={submitHandler}>

          <label htmlFor="profile" className="items uploadFile">
            <div className="head">
              <AccountCircle htmlColor="grey" className="shareIcon" />
              <span className="labels">Profile Picture</span>
            </div>
            <input
              type="file"
              id="profile"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </label>
          {profile && (
            <div className="container">
                <img className="imageProfile" src={URL.createObjectURL(profile)} alt="" />
                <Cancel className="cross" onClick={() => setProfile(null)} />
              </div>
            )}
          <hr className="shareHr" />

          <label htmlFor="cover" className="items uploadFile">
            <div className="head">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="labels">Cover Picture</span>
            </div>
            <input
              type="file"
              id="cover"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </label>
            {cover && (
            <div className="conntainer">
                <img className="imageCover" src={URL.createObjectURL(cover)} alt="" />
                <Cancel className="cross" onClick={() => setCover(null)} />
              </div>
            )}
          <hr className="shareHr" />

          <label htmlFor="city" className="items">
            <div className="head">
              <Room htmlColor="green"  />
              <div className="labels">City</div>
            </div>
            <input 
              id="city" 
              className="inputBox" 
              type="text" 
              placeholder= "enter city name" 
              value={city}
              onChange={(e)=>setCity(e.target.value)}
            />
            
          </label>


          <label htmlFor="description" className="items">
            <div className="head">
              <Description htmlColor="grey"  />
              <div className="labels">Description</div>
            </div>
            <textarea 
              name="description" 
              className="inputField" 
              id="description" 
              type="text" 
              value={description}
              placeholder="enter description"
              onChange={(e)=>setDescription(e.target.value)}
            />
          </label>

          <button className="submitButton" type="submit">
            Update Profile
          </button>
        </form> 
          <button className="submitButton" style={{backgroundColor:"red"}} onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Rightbar/>
      </div>
    </>
  );
}