import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import axios from '../axios'
import "../css/TeacherAnalytics.css"
import '../components/StudentInfo'
import '../components/MultiLineChart'
import MultiLineChart from "../components/MultiLineChart";
import { UserData } from '../data';
import LineChart from "./LineChart";


import { Chart } from "react-google-charts";

const TeacherAnalytics = () => {

  let [students, setStudents] = useState([{}]);
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");

  const [sBadges, setSBadges] = useState("");

  const [data, setData] = useState([
    ["Puzzle", "Easy", "Medium", "Hard"],
    ["P1", 0, 0, 0],
    ["P2", 0, 0, 0],
    ["P3", 0, 0, 0],
    ["P4", 0, 0, 0],
    ["P5", 0, 0, 0],
    ["P6", 0, 0, 0],
    ["P7", 0, 0, 0],
  ]);

  const [scoreData, setScoreData] = useState([
    ["Score", "Puzzle"],
    ["P1", 0],
    ["P2", 0],
    ["P3", 0],
    ["P4", 0],
    ["P5", 0],
    ["P6", 0],
    ["P7", 0],
  ]);


  const options = {
    chart: {
      title: "Time Analytics",
      subtitle: "For all difficulty levels at each puzzle",
    },
    vAxis: {
      title: "Time Taken",
    },
    colors: ["#BF7B35", "#401e07", "#dfbb97"],
  };

  const scoreOptions = {
    title: "Score Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };


  const getStudents = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let reqOptions = {
      url: "/students",
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



  function studentInfo(e) {
    console.log(e)
    console.log(e.target.innerText);
    let id = e.target.innerText;
    students?.map((student) => {
      if (student._id === id) {
        setName(name = student.fullname);
        setEmail(email = student.email);
        setUsername(username = student._id);

        let times = [["Puzzle", "Easy", "Medium", "Hard"]];
                let scores =[["Score", "Puzzle"]];

                student.level?.map((obj,index)=>{
                  let timeArray=[];
                  let scoreArray=[];
                  let puzzleTimeArray = obj.time;
                  let puzzle = `P${index+1}`;
                  scoreArray.push(puzzle);
                  scoreArray.push(Number(obj.score));
                  scores.push(scoreArray);
                  timeArray.push(puzzle)
                  puzzleTimeArray.map((difficultyTimeArray)=>{
                  let avg = difficultyTimeArray.reduce((a, b) => a + b, 0) / difficultyTimeArray.length;
                  timeArray.push(avg);
                  })
                  times.push(timeArray)
                })
                
                console.log(times);
                setData(times);
                console.log(scores);
                setScoreData(scores);

        //  console.log(name);
      }
    })


  }



  return (
    <>
      <Navbar user="Teacher" />
      <div className="teacher-analytics">
        <div className="student-list">
          {
            students && students.map((student) => {
              return <div onClick={studentInfo} key={student._id} className="studentListItem">
                <div className="Avatar"></div>
                <div className="studentName">
                  <p>{student._id}</p>
                </div>
              </div>
            })
          }

        </div>
        <div className="student-analysis">
          <div className="time-analysis">
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
          </div>

          <div className="score-analysis">
          <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={scoreData}
                    options={scoreOptions}
                />
          </div>
        </div>
        <div className="student-panel">
          {
            <div className="infoContainer">
              <p>{name}</p>
              <p>{email}</p>
              <p>{username}</p>
            </div>

          }
        </div>
      </div>
    </>
  );
};

export default TeacherAnalytics;
