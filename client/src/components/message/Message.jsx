import "./message.css";
// import { format } from "timeago.js";
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Message({ message, own }) {

  const { user } = useContext(AuthContext);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ user?.profilePicture }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</div>
    </div>
  );
}
