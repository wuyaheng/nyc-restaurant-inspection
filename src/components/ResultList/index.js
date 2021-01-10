import React from "react";
import { Pie } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function ResultList(props) {

  const PieChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: true,
        reverse: true
      },
      plugins: {
        labels: {
          render: 'percentage',
          precision: 0,
          showZero: true,
          fontSize: 13,
          fontColor: '#fff',
          arc: false,
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Critical Flag',
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
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
                backgroundColor: ["#2A81CB","#CB2B3E"], 
              },
            ],
          }}
          options={options} 
        />
      );

  };



  return (
        <div className="card">
          <PieChart type="critical_flag" />
        </div>
  );
}

export default ResultList;
