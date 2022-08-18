import axios from "../../axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import avatar from "../../Assets/60111.jpg"

export default function ConversationMentee({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let [followers, setFollowers] = useState([]);
  let [followings, setFollowings] = useState([]);

  useEffect(() => {
    let friendId = "";
    console.log(conversation);
    const receiverId = conversation.members.find((m) => m !== currentUser._id);
    currentUser.followers?.map((follower) => {
      if (follower === `${receiverId}`) {
        friendId = receiverId;
      }
    });
    const getUser = async () => {
      try {
        const res = await axios("/students?userId=" + friendId);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
  
  {user &&
         <>
      <div className="conversation">
        <div className="avatar">
          <img src={avatar} alt="" />
        </div>
        {/* <p>{user?.fullname}</p> */}
        <span className="conversationName">{user?.fullname}</span> 
      </div>
      </>
      }
    </>
  );
}
