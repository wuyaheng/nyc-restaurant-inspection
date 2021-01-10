import React from "react";
import { Pie, Line } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function ResultList(props) {

  var colorArray = [
    "#2A81CB",
    "#CB2B3E",
    "#c5baaf",
    "#cc8b86",
    "#84a59d",
    "#f7ede2",
  ];

  const PieChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: true,
      },
      plugins: {
        labels: {
          render: 'percentage',
          precision: 0,
          showZero: true,
          fontSize: 15,
          fontColor: '#fff',
          arc: false,
          // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Critical Flag'
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          }
        ],
        yAxes: [{
          ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1
          },
          stacked: true
      }]
      }
    };

    props.results.forEach((restaurant) => {
      const key = restaurant[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Pie
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]),
                backgroundColor: colorArray, 
              },
            ],
          }}
          options={options} 
        />
      );

  };



//   const LineChart = ({ type }) => {
//     const obj = {};

//     let options = {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'Number of Arrests Over Time'
//      },
//       scales: {
//         xAxes: [
//           {
//             gridLines: {
//               display: false,
//             }
//           }
//         ],
//         yAxes: [{
//           ticks: {
//               beginAtZero: true,
//               min: 0,
//               stepSize: 1
//           },
//           stacked: true
//       }]
//       }
//     };

//     props.results.forEach((arrest) => {
//       const key = arrest[type].substring(0, 10);
//       if (key)
//         if (obj[key]) {
//           obj[key] += 1;
//         } else {
//           obj[key] = 1;
//         }
//     });

//     let entries =
//       Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
//      return (
//         <Line
//           data={{
//             labels: entries.map((x) => x[0]),
//             datasets: [
//               {
//                 data: entries.map((x) => x[1]),
//                 backgroundColor: "#a4c3b2", 
//               },
//             ],
//           }} 
//           options={options} 
//         />
//       );

//   };


  return (
    <div className="container-fluid mb-2">
      <div className="row">
      <div className="col-md-12" style={{paddingLeft: "2px", paddingRight: "2px"}}>
        <div className="card">
          <PieChart type="critical_flag" />
          </div>
        </div>{" "}

      </div>{" "}
      {/* <div className="row mt-2">
      <div className="col-md-12" style={{paddingLeft: "2px", paddingRight: "2px"}}>
      <div className="card" style={{paddingBottom: "2px"}}>
        <LineChart type="arrest_date"/> 
      </div>
      </div>
      </div> */}
    </div>
  );
}

export default ResultList;
