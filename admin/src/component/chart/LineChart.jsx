import React from "react";
import { Line } from "react-chartjs-2";
import ChartCom from "./ChartCom";
function LineChart({ options, data }) {
  return (
    <ChartCom>
      <Line options={options} data={data} />
      {/* <Line options={options} data={data} ref={refer} /> */}
    </ChartCom>
  );
}

export default LineChart;
