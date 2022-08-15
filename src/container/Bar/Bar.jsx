import React from "react";
import ReactECharts from "echarts-for-react";
import "../echarts.less"

export default function Bar() {
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["星期一", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "访问人数",
        type: "bar",
        barWidth: "40%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };
  const getOption = () => {
    return option;
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      className="echarts"
    >
      <ReactECharts style={{ width: "800px" }} option={getOption()} />
    </div>
  );
}
