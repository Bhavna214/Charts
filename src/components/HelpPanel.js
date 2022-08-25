import React from "react";
import { useState } from "react";
import axios from "../axios";
import "../css/helpPanel.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import gold from "../Assets/gold medal.png";
import silver from "../Assets/silver medal.png";
import bronze from "../Assets/bronze medal.png";
import Messenger from "../chatroom/messenger/Messenger";
const HelpPanel = () => {
  let [user, setUser] = useState({});
  let navigate = useNavigate();
  let [levelList, setLevelList] = useState([{}]);
  let [students, setStudents] = useState([]);
  let badgeArray = ["", "bronze", "silver", "gold"];
  const [neededChat,setNeededChat]=useState(false);
  const displayList = (lvl) => {
    let myBadge = user.level[lvl - 1].badges;
    console.log(myBadge);
    //    console.log(students)
    let levelWiseList = [];
    students?.map((student) => {
      let puzzleBadge = student.level[lvl - 1].badges;
      if (puzzleBadge === "gold") {
        if (badgeArray.indexOf(puzzleBadge) >= badgeArray.indexOf(myBadge)) {
          console.log("entered");
          levelWiseList.push(student);
        }
      } else {
        if (badgeArray.indexOf(puzzleBadge) > badgeArray.indexOf(myBadge)) {
          console.log("entered");
          levelWiseList.push(student);
        }
      }
    });

    console.log(levelWiseList);
    setLevelList((levelList = levelWiseList));
  };

  const getStudents = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "/students/getAllStudents",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      // console.log(response.data);
      setStudents((students = response.data));
    }
  };

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
      alert("conversation created");
      setUser((user = response.data));
      sessionStorage.setItem("Student Data", JSON.stringify(response.data));
    } else {
      alert("error");
    }
  }

  const createConversation = async (senderId, receiverId) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let data = {
      senderId: `${senderId}`,
      receiverId: `${receiverId}`,
    };
    let bodyContent = JSON.stringify(data);

    let reqOptions = {
      url: `/conversations`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      console.log(response.data);
      alert("conversation created");
      getUpdatedUser(user._id);
    } else {
      alert("error");
    }
  };

  const makeFollowRequest = async (student) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let data = {
      userId: `${user._id}`,
    };
    let bodyContent = JSON.stringify(data);

    let reqOptions = {
      url: `/students/follow/${student._id}`,
      method: "PUT",
      headers: headersList,
      data: bodyContent,
    };
    try{
      let response = await axios.request(reqOptions);
    if (response) {
      console.log(response);
      alert("Followed");
      createConversation(user._id, student._id);
    } else{
      alert("error");
    }
    }catch(e){
      alert("You Already Follow This Mentor");
    }

    
  };

  function openChat() {
    setNeededChat(true);
    let chatContainer = document.getElementById("chatContainer");
    chatContainer.setAttribute('style', 'display:block !important');
    // navigate("/student/helproom/chat", { replace: true });
  }

  function closeChat(){
    setNeededChat(false);
    let chatContainer = document.getElementById("chatContainer");
    chatContainer.setAttribute('style', 'display:none !important');
  }

  React.useEffect(() => {
    getStudents();
    let data = JSON.parse(sessionStorage.getItem("Student Data"));
    console.log(data);
    if (data) {
      setUser((user = data));
      console.log("user=======");
      console.log(user);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mainContainerHelp">
        {/* <div id="chatMainContainer" className="chatMainContainer"> */}
        { neededChat && 
        <div id="chatContainer" lassName="chatContainer">
          <span className="crossMark" onClick={closeChat}>	&#10060;</span>
               <Messenger/>
        </div>}
        {/* </div> */}
        <div className="topContainer">
          <div className="levelTopContainer">
            <div>
              <p>Levels</p>
            </div>
          </div>
          <div className="listTopContainer">
            <div>
              <p>Mentors List</p>
            </div>
          </div>
          
        </div>
        <div className="chatBtnContainer">
          <button className="chatBtn" onClick={openChat}>
            Chat
          </button>
          </div>
        <div className="subMainContainer">
        <div className="leftContainerHelp">
          <div className="levelListContainer">
            <div className="tempContainer1">
            <p
              onClick={() => {
                displayList(1);
              }}
            >
              level 1
            </p>
            <p
              onClick={() => {
                displayList(2);
              }}
            >
              level 2
            </p>
            <p
              onClick={() => {
                displayList(3);
              }}
            >
              level 3
            </p>
            <p
              onClick={() => {
                displayList(4);
              }}
            >
              level 4
            </p>
            <p
              onClick={() => {
                displayList(5);
              }}
            >
              level 5
            </p>
            <p
              onClick={() => {
                displayList(6);
              }}
            >
              level 6
            </p>
            <p
              onClick={() => {
                displayList(7);
              }}
            >
              level 7
            </p>
            </div>
          </div>
        </div>
        <div className="rightContainer">
          <div className="listContainer">
            <div className="tempContainer">
              {levelList.map((student) => {
                return (
                  <>
                    {student.fullname ? (
                      <div key={student._id} className="studentList">
                        <p>{student.fullname}</p>
                        <div className="imageContainer">
                          {student?.level?.map((lvl, index) => {
                            return (
                              <div key={index}>
                                {lvl.badges === "gold" && (
                                  <img src={gold} alt="" />
                                )}
                                {lvl.badges === "silver" && (
                                  <img src={silver} alt="" />
                                )}

                                {lvl.badges === "bronze" && (
                                  <img src={bronze} alt="" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {student.fullname && (
                          <button
                            className="followBtn"
                            onClick={() => {
                              makeFollowRequest(student);
                            }}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    ) : (
                      <h2>Click on the level to view possible mentors</h2>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HelpPanel;
