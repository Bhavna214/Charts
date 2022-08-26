import React from 'react'
import Navbar from './NavBar';
import "../css/Teacherhome.css"
import axios from '../axios'
import { useEffect, useState } from 'react';
import avatar from "../Assets/60111.jpg";
import gold from '../Assets/gold medal.png'
import silver from '../Assets/silver medal.png'
import bronze from '../Assets/bronze medal.png'
import Teacher_Notes from './Teacher_Notes';
]import Footer from './Footer'

const Teacherhome = () => {

  let [tData, setTData] = React.useState({});
  let [leaderBoardArray,setLeaderBoardArray]=useState([]);
  let [students, setStudents] = useState([{}]);

  React.useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("Teacher Data"))
    if (data) {
      setTData(tData = data);
      // console.log(tData);
    }
  }, [])

  const getStudents = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let reqOptions = {
      url: "/students/getAllStudents",
      method: "GET",
      headers: headersList,
    }

    let response = await axios.request(reqOptions);
    if (response) {
      console.log(response.data);
      setStudents(students = response.data);
    }

  }

  useEffect(() => {
    getStudents();
  }, [])

  const sortStudents =(array) =>{
    console.log(array.sort((a, b) => {
      return b.avg - a.avg;
    })
    )
    
  
  }




  const calculateLeaderBoardAvg = () => {
    console.log(students)

    let puzzleWiseScoreAvgArray = [];
    // let obj={};
    
    students?.map((student) => {
      let obj = {
        id : student._id,
        fullname:student.fullname,
        badges:[],
        avg : 0
      }
      let levelWiseAvgArray = [];
      student?.level?.map((level)=>{
        let levelScoreArray=[];
        if(level.score){
          levelScoreArray=level.score;
        }else{
          levelScoreArray=[0,0,0]
        }
        let avg =
              levelScoreArray.reduce((a, b) => a + b, 0) /
              levelScoreArray.length;
          levelWiseAvgArray.push(avg);
        obj.badges.push(level.badges);
      })

      let levelwiseAvg =
      levelWiseAvgArray.reduce((a, b) => a + b, 0) /
      levelWiseAvgArray.length;
      
      obj.avg=levelwiseAvg;
      
      puzzleWiseScoreAvgArray.push(obj)
      
    })
    console.log(puzzleWiseScoreAvgArray)
    setLeaderBoardArray(leaderBoardArray=puzzleWiseScoreAvgArray);
    console.log(leaderBoardArray)
    sortStudents(leaderBoardArray);
  }

  useEffect(() => {
    calculateLeaderBoardAvg();
  }, [students])

  let puzzleList=[]
  
  return (
    <div>

      <Navbar user="Teacher"></Navbar>

      <div className="teacher-main" style={{position: "relative"}}>
        <Teacher_Notes/>
        <div className="leftSideBar" style={{ color: "Black" }}>
          <div className="leaderBoardHeading">
              <h2>LEADERBOARD</h2>
          </div>
          <div className="headingContainer">
              <div className="infoHeadingContainer">
                  <h3>Student Name</h3>
                  <h3>Score</h3> 
              </div>
              <div className="badgesHeadingContainer">
                    <h3>Badges</h3>
              </div>
            </div>
          <div className="leaderBoard">
            <div className="lead">
            {/* <table >
                          <tr>
                            <th>Username</th>
                            <th>score</th>
                            <th>badges</th>
                          </tr>  */}
                {leaderBoardArray.map((student)=>{
                  return <div className="studentListItemHome">
                         <div className="Avatar"></div>
                        <div className="studentInfo">
                          <div className="studentName">
                          <p>{student.fullname}</p>
                          </div>
                          <div className="studentScore">
                            <span>{Number(student.avg.toFixed(2))}</span>
                          </div>
                        </div>
                        <div className="badges">
                          {student.badges.map((badge)=>{
                              return <div>
                                {badge === 'gold' &&
                                  <img src={gold} alt="" />
                                }
                                {
                                  badge==='silver' && 
                                  <img src={silver} alt="" />
                                }

                                {badge === 'bronze' && 
                                  <img src={bronze} alt="" />
                                }
                                </div>
                            })}
                          </div>
                        </div>
                    
                    
                  // return <>
                  //         <tr className="studentListItem">
                  //           <td>{student.fullname}</td>
                  //           <td>{student.avg}</td>
                  //           <td className='badgeList'>{student.badges.map((badge)=>{
                  //             return <p>{badge}</p>
                  //           })}</td>
                  //         </tr>
                  //         </>
                  
                })}
                {/* </table> */}
            </div>
            </div>
        </div>
    


        <div className="rightSideBar">
          <h4>MY PROFILE</h4>
          <div className="userAvatar">
                <img src={avatar} alt="" />
            </div>
          <table className='profile-bar'>
            <tr>
              <td className='bold'>Name:</td>
              <td className='data'>{tData.fullname}</td>
            </tr>
            <tr>
              <td className='bold'>Username:</td>
              <td className='data'>{tData._id}</td>
            </tr>
            <tr>
              <td className='bold'>Email:</td>
              <td className='data'>{tData.email}</td>
            </tr>
            <tr>
              <td className='bold'>Subject:</td>
              <td className='data'>{tData.subject}</td>
            </tr>
          </table>
        </div>
      </div>
      <Footer/>
      </div>
  )
}

export default Teacherhome
