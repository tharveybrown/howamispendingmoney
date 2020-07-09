import React from "react";
// import "./styles.css";

import { Line } from "react-chartjs-2";

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14,
  },
};

const options = {
  responsive: true,
  legend: {
    position: "top",
  },
  elements: {
    line: {
      // A higher value makes the line look skewed at this ratio.
      tension: 0.3,
    },
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: false,
        // ticks: {
        //   callback(tick, index) {
        //     // Jump every 7 values on the X axis labels to avoid clutter.
        //     return index % 7 !== 0 ? "" : tick;
        //   },
        // },
      },
    ],
    yAxes: [
      {
        ticks: {
          suggestedMax: 45,
          callback(tick) {
            if (tick === 0) {
              return tick;
            }
            // Format the amounts using Ks for thousands.
            return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
          },
        },
      },
    ],
  },
  hover: {
    mode: "nearest",
    intersect: false,
  },
  tooltips: {
    custom: false,
    mode: "nearest",
    intersect: false,
  },
};

export default class ExpenseChart extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
    };
  }

  componentDidMount() {
    console.log("PURCHASES", this.props);
    // debugger;
    const data = {
      // Todo: need to map expense to date
      labels: this.props.purchases.map((p) => p.date.split("T")[0]),
      datasets: [
        {
          label: "Donations",
          data: this.props.donations.map((d) => d.amount),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Purchases",
          data: this.props.purchases.map((p) => p.amount),
          fill: false,
          borderColor: "#742774",
        },
      ],
    };
    this.setState({
      chartData: data,
    });
  }
  render() {
    return (
      <div className="">
        <Line
          width="600"
          height="300"
          data={this.state.chartData}
          legend={legend}
          options={options}
        />
      </div>
    );
  }
}
