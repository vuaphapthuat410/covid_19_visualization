import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";
const DeathsChart = (props) => {
  const ref = useRef();
  const color = "#1D2A41";
  const status = props.status;
  // console.log("lmao", props);
  useEffect(() => {
    var myChart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: Object.keys(status["deaths"]).map((res) => res.substr(0, 5)),
        datasets: [
          {
            label: "Số ca tử vong",
            data: Object.values(status["deaths"]),
            backgroundColor: ["rgba(9, 42, 65, 0.0)"],
            borderColor: [color],
            pointBorderColor: color,
            borderWidth: 3,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Số ca tử vong",
          fontSize: 14,
          fontColor: color,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              stacked: false,
              ticks: {
                maxTicksLimit: 5,
              },
            },
          ],
        },
      },
    });
    // thêm cái props.status ở đây để mỗi khi cái props status nó đổi thì nó sẽ chạy lại cái trên
    // nếu ko có thì nó load lần đầu xong có thay đổi nó cũng kệ vì props thay đổi chứ ko phải state thay đổi
  }, [props.status]);

  return <canvas ref={ref}></canvas>;
};

export default DeathsChart;
