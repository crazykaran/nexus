import "./share.css";
import Error from '../error/Error';
import {
  PermMedia,
  Cancel,
  LocalOffer
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { storage } from "../../firebase";
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage'; 
import { v4 } from 'uuid';

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [err,setErr]=useState('');
  const [tag, setTag] = useState('');
  
  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      tag:tag
    };
    if (file) {
      try{
        const imageref=ref(storage,`posts/${file.name + v4()}`);
        await uploadBytes(imageref,file);
        const url = await getDownloadURL(ref(imageref));
        newPost.img=url;
      }catch(err){
        console.log(err);
      }
    }
    if(file || newPost.desc){
      try {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts", newPost);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }else{
        setErr("Add description or image to Post");
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture}
            alt=""
          />
          <textarea
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Upload Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LocalOffer htmlColor="blue" className="shareIcon" />
              <input type="text" className="custom-select" 
              onChange={(e)=>{setTag(e.current.value)}}
              placeholder="enter tags"/>
            </div>
              {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>  */}
          </div>


          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
      <Error message={err}/>
    </div>
  );
}
