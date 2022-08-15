import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Navbar from "./NavBar";
import avatar from "../Assets/60111.jpg"
import "../css/Studenthome.css";

const Studenthome = () => {
  const [sData, setSData] = React.useState(null);
  const [barData, setData] = useState({
    labels: "",
    datasets: [],
  });

  const [scoreData, setScoreData] = useState({
    labels: "",
    datasets: [],
  });


  function studentInfo() {
    console.log(sData)
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
    sData?.level?.map((obj, index) => {
      let timeArray = [];
      // let scoreArray=[];
      let puzzleTimeArray = obj.time;
      let scoreArray = obj.score[0];
      console.log(scoreArray)
      puzzleTimeArray?.map((difficultyTimeArray) => {
        let avg =
          difficultyTimeArray.reduce((a, b) => a + b, 0) /
          difficultyTimeArray.length;
        timeArray.push(avg);
      });
      if(scoreArray){
        scoreArray?.map((score,index)=>{
          console.log(scoreObject.datasets[index].data.push(score))
        })
      }
      timeArray?.map((value, index) => {
        dataObject.datasets[index].data.push(value);
      });
    });
    setData(dataObject);
    console.log(scoreObject)
    setScoreData(scoreObject);
  }

  React.useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("Student Data"));
    if (data) {
      setSData(data);
    }
  }, []);

  useEffect(() => {
    studentInfo();
  }, [sData]);

  return (
    <div style={{ color: "white" }}>
      <Navbar user="Student"></Navbar>
      <div className="mainContainer">
        {/* student profile */}
        <div className="studentProfileContainer">
       
          <div className="userAvatar">
              <img src={avatar} alt="" />
          </div>

          <h1 className="profileTitle" >Hello {sData?._id} 🙌 </h1>

          <hr className="hr-17"/>

          <div className="infoContainer">
            <div className="basicInfo">
              <p>Name : {sData?.fullname}</p>
              <p>Username : {sData?._id}</p>
              <p>Email: {sData?.email}</p>
            </div>
          </div>
        </div>

        {/* student analytics */}
        <div className="studentAnalyticsContainer">
          <h1 className="performanceTitle">Your Performance</h1>
          {/* <div className="time-analysis"> */}
          {/* <Chart
                  chartType="Bar"
                  width="80%"
                  height="350px"
                  data={data}
                  options={options}
          /> */}

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
        </div>
    </div>
  );
};

export default Studenthome;
