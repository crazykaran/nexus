import './comments.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
const Comments=({postId})=>{
    const {user} =useContext(AuthContext);
    const [comments,setComments]=useState([]);
    const [msg,setMsg]=useState('');
    const [update,setUpdate]=useState(false);
    useEffect(()=>{
        const fetchComments= async()=>{
            try{
                const res=await axios.get(process.env.REACT_APP_BACKEND_URL+`/comments/${postId}`);
                setComments(
                    res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );
            }catch(err){
                console.log(err);
            }
        }
        fetchComments();
    },[postId,update]);

    const handleClick=async (e)=>{
        e.preventDefault();
        const newCmt={
            postId:postId,
            name:user.username,
            profilePictue:user.profilePicture,
            desc:msg,
        }
        try {
            setMsg('');
            await axios.post(process.env.REACT_APP_BACKEND_URL+"/comments", newCmt);
            setUpdate(!update);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="commentContainer">
                <div className="write">
                    <img className='img' src={user.profilePicture} alt=''/>
                    <input 
                        onChange={(e)=>{setMsg(e.target.value)}} 
                        type='text' 
                        value={msg}
                        placeholder='write a comment' 
                        className='input'
                    />
                    <button className='btn' onClick={handleClick}>Post</button>
                </div>
            {
            comments.map(comment=>(
                <div key={comment._id} className="comment">
                    <Link to={`/profile/${comment.name}`}>
                        <img className='imgCmt' src={comment.profilePictue} alt=''/>
                    </Link>
                    <div className="info">
                        <span className='name'>{comment.name}</span>
                        <p className='desc' >{comment.desc}</p>
                    </div>
                    <span className='date' >{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                </div>
            ))
            }
        </div>
    )
}
export default Comments;