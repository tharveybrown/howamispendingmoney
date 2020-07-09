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
  maintainAspectRatio: false,
  legend: {
    position: "top",
  },
  elements: {
    line: {
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
    const sortDates = (a, b) => {
      var keyA = new Date(a.date),
        keyB = new Date(b.date);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    };
    const data = {
      // Todo: need to map expense to date
      labels: this.props.purchases
        .sort((a, b) => {
          var keyA = new Date(a.date),
            keyB = new Date(b.date);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        .map((p) => p.date.split("T")[0]),
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Donations",
          data: this.props.donations
            .sort((a, b) => sortDates(a, b))
            .map((d) => -1 * d.amount),
          fill: "start",
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,
        },
        {
          label: "Purchases",
          data: this.props.purchases
            .sort((a, b) => sortDates(a, b))
            .map((p) => -1 * p.amount),
          fill: "start",
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgba(255,65,105,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgba(255,65,105,1)",
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: "rgba(255,65,105,1)",
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
          width={500}
          height={300}
          data={this.state.chartData}
          legend={legend}
          options={options}
        />
      </div>
    );
  }
}
