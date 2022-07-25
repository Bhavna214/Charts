import { useState } from "react";
import "./App.css";
// import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { UserData } from "./data";
import { LineData } from "./LineData";
import NavBar from "./components/NavBar";

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.level),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.Solved),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          // "#f3ba2f",
          // "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: LineData.map((data) => data.puzzle),
    datasets: [
      {
        label: "Time",
        data: LineData.map((data) => data.time),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div> */}
      <div className="graphContainer">
        <div className="lineChart" >
          <LineChart chartData={lineData} />
        </div>
        <div className="pieChart" >
          <PieChart chartData={userData} />
        </div>
      </div>
    </div>

  );
}

export default App;