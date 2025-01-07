import React from "react";
import { Pie } from "react-chartjs-2";
import ChartCom from "./ChartCom";
function PieChart({ options, data }) {
  return (
    <ChartCom>
      <Pie options={options} data={data} />
    </ChartCom>
  );
}

export default PieChart;
