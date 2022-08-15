import React from "react";
import ReactECharts from "echarts-for-react";
import "../echarts.less"

export default function Pie() {
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
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
