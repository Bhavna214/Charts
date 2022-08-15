import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import axios from "../axios";
import "../css/TeacherAnalytics.css";
import { Bar, Line } from "react-chartjs-2";
import MultiLineChart from "../components/MultiLineChart";
import { UserData } from "../data";
import LineChart from "./LineChart";

import { Chart } from "react-google-charts";

const TeacherAnalytics = () => {
  let [students, setStudents] = useState([{}]);
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");

  const [barData, setData] = useState({
    labels: "",
    datasets: [],
  });

  const [scoreData, setScoreData] = useState({
    labels: "",
    datasets: [],
  });

  const [sBadges, setSBadges] = useState("");

  // const [data, setData] = useState([
  //   ["Puzzle", "Easy", "Medium", "Hard"],
  //   ["P1", 0, 0, 0],
  //   ["P2", 0, 0, 0],
  //   ["P3", 0, 0, 0],
  //   ["P4", 0, 0, 0],
  //   ["P5", 0, 0, 0],
  //   ["P6", 0, 0, 0],
  //   ["P7", 0, 0, 0],
  // ]);

  // const [scoreData, setScoreData] = useState([
  //   ["Score", "Puzzle"],
  //   ["P1", 0],
  //   ["P2", 0],
  //   ["P3", 0],
  //   ["P4", 0],
  //   ["P5", 0],
  //   ["P6", 0],
  //   ["P7", 0],
  // ]);

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
      Accept: "*/*",
    };

    let reqOptions = {
      url: "/students",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response) {
      console.log(response.data);
      setStudents((students = response.data));
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  function studentInfo(e) {
    console.log(e);
    console.log(e.target.innerText);
    let id = e.target.innerText;
    students?.map((student) => {
      if (student._id === id) {
        console.log(student);
        setName((name = student.fullname));
        setEmail((email = student.email));
        setUsername((username = student._id));

        let scoreObject = {
          labels: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
          datasets: [
            {
              label: "Easy",
              data: [],
              borderColor: "rgb(75, 192, 192)",
              fill: true,
            },
            {
              label: "Medium",
              data: [],
              borderColor: "rgb(75, 192, 192)",
              fill: true,
            },
            {
              label: "Hard",
              data: [],
              borderColor: "rgb(75, 192, 192)",
              fill: true,
            },
          ],
        };

        let dataObject = {
          labels: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
          datasets: [
            {
              id: 1,
              label: "Easy",
              data: [],
              backgroundColor: ["rgba(83, 170, 85,0.8)"],
            },
            {
              id: 2,
              label: "Medium",
              data: [],
              backgroundColor: ["rgba(204, 136, 48,0.8)"],
            },
            {
              id: 3,
              label: "Hard",
              data: [],
              backgroundColor: ["rgba(196, 72, 41,0.8)"],
            },
          ],
        };

        student?.level?.map((obj, index) => {
          let timeArray = [];
          // let scoreArray=[];
          let puzzleTimeArray = obj.time;
          let scoreArray = obj.score[0];
          console.log(scoreArray);
          puzzleTimeArray.map((difficultyTimeArray) => {
            let avg =
              difficultyTimeArray.reduce((a, b) => a + b, 0) /
              difficultyTimeArray.length;
            timeArray.push(avg);
          });
          if(scoreArray){
            scoreArray.map((score, index) => {
              console.log(scoreObject.datasets[index].data.push(score));
            });
          }
          
          timeArray.map((value, index) => {
            dataObject.datasets[index].data.push(value);
          });
        });
        setData(dataObject);
        console.log(scoreObject);
        setScoreData(scoreObject);

        // let times = [["Puzzle", "Easy", "Medium", "Hard"]];
        //         let scores =[["Score", "Puzzle"]];

        //         student.level?.map((obj,index)=>{
        //           let timeArray=[];
        //           let scoreArray=[];
        //           let puzzleTimeArray = obj.time;
        //           let puzzle = `P${index+1}`;
        //           scoreArray.push(puzzle);
        //           scoreArray.push(Number(obj.score));
        //           scores.push(scoreArray);
        //           timeArray.push(puzzle)
        //           puzzleTimeArray.map((difficultyTimeArray)=>{
        //           let avg = difficultyTimeArray.reduce((a, b) => a + b, 0) / difficultyTimeArray.length;
        //           timeArray.push(avg);
        //           })
        //           times.push(timeArray)
        //         })

        //         console.log(times);
        //         setData(times);
        //         console.log(scores);
        //         setScoreData(scores);

        //  console.log(name);
      }
    });
  }

  return (
    <>
      <Navbar user="Teacher" />
      <div className="teacher-analytics">
        <div className="student-list">
          {students &&
            students.map((student) => {
              return (
                <div
                  onClick={studentInfo}
                  key={student._id}
                  className="studentListItem"
                >
                  <div className="Avatar"></div>
                  <div className="studentName">
                    <p>{student._id}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="student-analysis">
          <div className="time-analysis">
            {barData && (
              <Bar
                data={barData}
                width="auto"
                height={250}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Time Analysis",
                      padding: {
                        top: 5,
                        bottom: 0,
                      },
                    },
                  },
                  layout: {
                    top: 20,
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
              ></Bar>
            )}
          </div>

          <div className="score-analysis">
            {scoreData && (
              <Line
                data={scoreData}
                width="auto"
                height={250}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Score Analysis",
                      padding: {
                        top: 5,
                        bottom: 0,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  layout: {
                    top: 20,
                  },
                  maintainAspectRatio: false,
                }}
              />
            )}
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
