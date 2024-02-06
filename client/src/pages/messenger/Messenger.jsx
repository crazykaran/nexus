import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]); //users on left panel
  const [currentChat, setCurrentChat] = useState(null);   //currently focussed user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const userId=useParams().userId;
  useEffect(() => {
    const newConversation=async()=>{
      try{
        const conv=await axios.get(process.env.REACT_APP_BACKEND_URL+`/conversations/find/${user._id}/${userId}`);
        if(!conv.data){
          try{
            const conversation=await axios.post(process.env.REACT_APP_BACKEND_URL+"/conversations/",{
              senderId:userId,
              receiverId:user._id,
            })
            setCurrentChat(conversation.data);
          }catch(err){
            console.log(err);
          }
        }else{
          setCurrentChat(conv.data);
        }
        
      }catch(err){
        console.log(err);
      }
    }
    if(userId && userId!=="all"){newConversation();}
  }, [userId,user._id]);

  //establishing socket connection 
  useEffect(() => {
    socket.current = io("wss://nexussocket.onrender.com");
    // socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //get incoming messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //set righbar with onlline users that we follow
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  //set leftbar with friend that have chatted before
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  //fetching previous messages when user is selected
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  //sending message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  //for scrolling when a new message comes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c,index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m,index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}