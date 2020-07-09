import React, { useState, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          // width: 150,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  legend: {
    position: "top",
  },
  title: {
    display: true,
    text: "Expense Categories",
    fontSize: 20,
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

export default function CategoryChart({ categories }) {
  // Declare a new state variable, which we'll call "count"
  // let [chartData, setData] = useState({});

  const data = {
    labels: categories.map((k) => k.category),

    datasets: [
      {
        label: "Category",
        backgroundColor: [
          "#01E396",
          "#775DD0",
          "#FF4560",
          "#FFB01A",
          "#008FFB",
        ],
        hoverBackgroundColor: [
          "#7EFFCF",
          "#AE98FF",
          "#FF899B",
          "#FFE973",
          "#003350",
        ],
        data: categories.map((k) => -1 * k.amount),
      },
    ],
  };
  // return setData((chartData = data));

  return (
    <>
      <Doughnut width={400} height={300} data={data} options={options} />
    </>
  );
}
