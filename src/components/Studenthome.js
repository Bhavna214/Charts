import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Navbar from "./NavBar";
import avatar from "../Assets/60111.jpg"
import "../css/Studenthome.css";
import gold from '../Assets/gold medal.png'
import silver from '../Assets/silver medal.png'
import bronze from '../Assets/bronze medal.png'
import diksha from "../Assets/diksha.png";
import ncert from "../Assets/ncert.png";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import Footer from './Footer'

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
  let [attempted,setAttempted]=useState([]);
  let [badges,setBadges]=useState([]);


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
    let attemptArray=[];
    let badgeArray=[];
    sData?.level?.map((obj, index) => {
      let timeArray = [];
      // let scoreArray=[];
      console.log(obj)
      if(obj.badges!==""){
        badgeArray.push(obj.badges);
        attemptArray.push(true);
      }else{
        attemptArray.push(false);
      }
      let puzzleTimeArray = obj.time;
      let scoreArray = obj.score;
      console.log(scoreArray)
      puzzleTimeArray?.map((difficultyTimeArray) => {
        let avg =
          difficultyTimeArray.reduce((a, b) => a + b, 0) /
          difficultyTimeArray.length;
        timeArray.push(avg);
      });
      if(scoreArray){
        console.log(scoreArray);
        scoreArray?.map((score,index)=>{
          console.log(scoreObject.datasets[index].data.push(score))
        })
      }
      timeArray?.map((value, index) => {
        dataObject.datasets[index].data.push(value);
      });
    });
    setAttempted(attemptArray);
    console.log(attemptArray)
    setBadges(badgeArray)
    setData(dataObject);
    console.log(scoreObject)
    setScoreData(scoreObject);
  }
  
  function  closeNotes() {
    let cont = document.getElementById("notesContainer")
    cont.style.display="none";
  }

  


  function generatePdf(event) {
    let cont = document.getElementById("studentAnalyticsContainer");

    let jspdf = new jsPDF("p","pt","a4");
    // jspdf.html(cont,(pdf)=>{pdf.save("Analysis.pdf")})
    jspdf.html(cont,{callback:function(pdf){pdf.save("Analysis.pdf")}})

    // let index = 1;
    // // create new pdf object
    // // if don't choose compress as true you will end up with a large pdf file
    // let pdf = new jsPDF({
    //   orientation: "landscape",
    //   unit: "px",
    //   format: "a4",
    //   compress: true,
    // });
    // // search for the html element(s) you need
    // const canvas = document.querySelectorAll(".pdfContainer");
    // console.log(canvas)
    // // here my size are in pixels since I configured that in the obj instance
    // let pageWidth = 400;
    // let pageHeight = 400;
    // // let index = 1;
    // // traverse the array of canvas
    // canvas.forEach((canva: HTMLCanvasElement) => {
    //   // I added some options among others I added the type of the compression
    //   // method: FAST
    //   pdf?.addImage(
    //     canva,
    //     "PNG",
    //     10,
    //     10,
    //     pageWidth,
    //     pageHeight,
    //     `img${index}`,
    //     "FAST"
    //   );
    //   // so as to not end up with an extra pdf page at the end of the iteration
    //   if (index < canvas.length) {
    //     pdf.addPage();
    //   }
    //   index++;
    // });

    // // download the pdf
    // pdf.save("Reporte.pdf");
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
 <div onClick={generatePdf} className="downloadPdf">
        <span>Download</span>
        <PictureAsPdfIcon></PictureAsPdfIcon>
      </div>
      <div id="notesContainer" className="notesContainer">
      <span className="crossMark" onClick={closeNotes}>	&#10060;</span>
        <h3>Notes</h3>
        <ul className="notesContainerUl">
          <li>
              <span><img src={diksha}/></span>
              <div className="linkContainer">
              <span>Computer Science</span>
              <p>https://diksha.gov.in/ncert/play/collection/do_313004530830401536139?contentType=TextBook</p>       
              </div>     
          </li>
          <li>
              <span><img src={ncert}/></span>
              <div className="linkContainer">
              <span>Computer Science</span>
              <p>https://diksha.gov.in/ncert/play/collection/do_313004530830401536139?contentType=TextBook</p>       
              </div>             
          </li>
          <li>
              <span><img src={diksha}/></span>
              <div className="linkContainer">
              <span>Computer Science</span>
              <p>https://diksha.gov.in/ncert/play/collection/do_313004530830401536139?contentType=TextBook</p>       
              </div>            
          </li>
          <li>
              <span><img src={ncert}/></span>
              <div className="linkContainer">
              <span>Computer Science</span>
              <p>https://diksha.gov.in/ncert/play/collection/do_313004530830401536139?contentType=TextBook</p>       
              </div>              
          </li>

        </ul>
      </div>
      <div className="mainContainer">
        {/* student profile */}
        <div className="leftContainer">
        <div className="singlestudentProfileContainer">
       
          <div className="userAvatar">
              <img src={avatar} alt="" />
          </div>

          <h1 className="profileTitle" >Hello {sData?._id} 🙌 </h1>

          <hr className="hr-17"/>

          <div className="infoContainerStudent">
            <div className="basicInfoStudent">
              <p><span className="basicInfoSpan">Name : </span>{sData?.fullname}</p>
              <p><span className="basicInfoSpan">Username : </span>{sData?._id}</p>
              <p><span className="basicInfoSpan">Email : </span>{sData?.email}</p>
            </div>
            <p className="attemptList"><span className="attemptSpan">Puzzles Status </span> <p className="puzzleList"> {attempted.map((puzzle,index)=>{return puzzle? <span className="attempt">P{index+1}<span className="symbol" >✔</span></span>:<span  className="attempt">P{index+1}<span className="symbol">❌</span></span> })}</p></p>
                <p className="attemptList"><span className="attemptSpan">Badges</span> <p className="puzzleList"> {badges.map((badge,index)=>{return  <>
                {badge==='gold' && 
                <span className="attempt"><img src={gold}/></span>
                }
                {badge==='silver' && 
                <span className="attempt"><img src={silver}/></span>
                }
                {badge==='bronze' && 
                <span className="attempt"><img src={bronze}/></span>
                }
                </>
                })}</p></p>
          </div>
        </div>
        </div>

        {/* student analytics */}
        <div id="studentAnalyticsContainer" className="studentAnalyticsContainer">
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
        <Footer/>
    </div>
  );
};

export default Studenthome;
