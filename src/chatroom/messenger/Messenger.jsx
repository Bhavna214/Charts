import "./messenger.css";
// import Topbar from "../topbar/Topbar";
import Conversation from "../conversations/Conversation";
import ConversationMentee from "../conversations/ConversationMentee";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import { io } from "socket.io-client";
import Navbar from "../../components/NavBar";
var FA = require('react-fontawesome')

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  let [user, setUser] = useState({});


  const getUpdatedUser = async (userId)=>{
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let data = {
      username:`${userId}`
    };
    let bodyContent = JSON.stringify(data);

    let reqOptions = {
      url: `/students/getStudent`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      console.log(response.data);
      // alert("conversation created");
      setUser((user = response.data));
      console.log("user=======");
      console.log(user);
      // sessionStorage.setItem("Student Data", JSON.stringify(response.data));
    } else {
      alert("error");
    }
  }

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("Student Data"));
    console.log(data);
    if (data) {
      // getUpdatedUser(data._id);
      setUser((user = data));
      console.log("user=======");
      console.log(user);
      
    }

    socket.current = io("ws://localhost:8900");
    // socket.current = io();
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      //   setOnlineUsers(
      //     user.followings.filter((f) => users.some((u) => u.userId === f))
      //   );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

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
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* <Topbar /> */}
      {/* <Navbar/> */}
      <FA name="rocket" />
      <div className="messenger">
        <div className="chatMenuLeft">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}

            <div className="chatMenuHeading">
              <p>Mentors</p>
            </div>

            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} className="activeChat">
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
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
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
        </div>
        <div className="chatMenuRight">
          <div className="chatMenuWrapperRight">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <div className="chatMenuHeading">
              <p>Mentees</p>
            </div>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <ConversationMentee conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
           <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> 
          </div>
        </div> */}
      </div>
    </>
  );
}
