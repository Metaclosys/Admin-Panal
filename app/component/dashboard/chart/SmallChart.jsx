"use client";
import React from "react";
import { Card } from "antd";
import { Area, Column } from "@ant-design/plots";

function SmallChart({ title, type, data, loading }) {
  const baseConfig = {
    data,
    padding: [20, 20, 20, 30],
    xField: type === "area" ? "date" : "name",
    yField: type === "area" ? undefined : "value",
    color: "#1677ff",
    height: 160,
    tooltip: {
      showTitle: true,
      formatter: (datum) => {
        return {
          name: type === "area" ? datum.type : "Value",
          value: datum.value
        };
      }
    }
  };

  const areaConfig = {
    ...baseConfig,
    seriesField: "type",
    data: data?.reduce(
      (acc, item) => [
        ...acc,
        ...(item.date ? [
          { date: item.date, value: item.lastMonth || 0, type: "Last Month" },
          { date: item.date, value: item.thisMonth || 0, type: "This Month" }
        ] : [])
      ],
      []
    ) || [],
    yField: "value",
    legend: {
      position: "bottom",
    },
    smooth: true,
    areaStyle: {
      fillOpacity: 0.2,
    },
    color: ["#1677ff", "#1d233b"],
    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#1d233b",
        lineWidth: 2,
      },
    },
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };

  const barConfig = {
    ...baseConfig,
    columnWidthRatio: 0.6,
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${Math.round(v)}`,
      },
    },
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    meta: {
      value: {
        alias: 'Count'
      }
    }
  };

  return (
    <Card
      title={title}
      className="h-[240px] w-full overflow-hidden"
      styles={{
        header: { fontSize: "1.25rem", fontWeight: "bold" },
        body: { padding: "10px", height: "calc(100% - 55px)" }
      }}
      loading={loading}
    >
      <div className="w-full h-full">
        {type === "area" && data && <Area {...areaConfig} />}
        {type === "bar" && data && <Column {...barConfig} />}
      </div>
    </Card>
  );
}

export default SmallChart;
