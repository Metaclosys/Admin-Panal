"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({ title }) {
  const data = [
    { name: "Mon", visit: 3000, click: 1398 },
    { name: "Tue", visit: 2000, click: 3800 },
    { name: "Wed", visit: 2780, click: 3908 },
    { name: "Thu", visit: 1898, click: 4800 },
    { name: "Fri", visit: 2390, click: 3800 },
    { name: "Sat", visit: 3490, click: 4300 },
    { name: "Sun", visit: 4000, click: 2400 },
  ];
  return (
    <div className={"h-80 bg-white p-10 rounded-lg"}>
      <h2 className={"text-xl font-bold text-black text-textSoft mb-5"}>
        {title}
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#151c2c", border: "none" }}
          />
          <Legend />
          <Line type="monotone" dataKey="visit" stroke="#8884d8" />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
