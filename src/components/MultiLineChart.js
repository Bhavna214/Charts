// import React, { Component } from 'react'
// import Chart from 'react-google-charts'
// const LineData = [
//   ['x', 'easy', 'medium', 'hard'],
//   [0, 0, 0, 0],
//   [1, 10, 5, 0],
//   [2, 23, 15, 5],
//   [3, 17, 9, 6],
//   [4, 18, 10, 9],
//   [5, 9, 5, 7],
//   [6, 11, 3, 8],
//   [7, 27, 19, 14],
//   [8, 20, 20, 10],
// ]
// const LineChartOptions = {
//   hAxis: {
//     title: 'No. of attempts',
//   },
//   vAxis: {
//     title: 'Time Taken',
//   },
//   series: {
//     1: { curveType: 'function' },
//   },
// }
// class MultiLineChart extends Component {
//   render() {
//     return (
//       <div className="container mt-5">
//         <h2>React Google Line Chart Example</h2>
//         <Chart
//           width={'700px'}
//           height={'410px'}
//           chartType="LineChart"
//           loader={<div>Loading Chart</div>}
//           data={LineData}
//           options={LineChartOptions}
//           rootProps={{ 'data-testid': '2' }}
//         />
//       </div>
//     )
//   }
// }
// export default MultiLineChart