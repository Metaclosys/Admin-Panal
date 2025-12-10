"use client";
import React from "react";
import { Card } from "antd";
import { Line } from "@ant-design/charts";

function Chart({
  title,
  subtitle,
  percentageChange,
  period,
  dateRange,
  loading,
}) {
  const data = [
    { name: "Mon", visit: 3000, click: 1398 },
    { name: "Tue", visit: 2000, click: 3800 },
    { name: "Wed", visit: 2780, click: 3908 },
    { name: "Thu", visit: 1898, click: 4800 },
    { name: "Fri", visit: 2390, click: 3800 },
    { name: "Sat", visit: 3490, click: 4300 },
    { name: "Sun", visit: 4000, click: 2400 },
  ];

  // Transform data first
  const transformedData = data.reduce((acc, item) => {
    acc.push(
      { name: item.name, value: item.visit, category: "Visits" },
      { name: item.name, value: item.click, category: "Clicks" }
    );
    return acc;
  }, []);

  const config = {
    data: transformedData,
    xField: "name",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "wave",
        duration: 1000,
      },
    },
    theme: "light",
    autoFit: true,
    height: 350,
  };

  return (
    <Card
      title={
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">{subtitle}</span>
            <span
              className={`text-sm ${
                percentageChange && percentageChange.toString().startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {percentageChange}% {period}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{dateRange}</p>
        </div>
      }
      className="h-[500px] w-full overflow-hidden"
      styles={{
        header: { padding: "16px" },
        body: { padding: "20px", height: "calc(100% - 120px)" },
      }}
      loading={loading}
    >
      <div className="w-full h-full">
        <Line {...config} height={350} />
      </div>
    </Card>
  );
}

export default Chart;
