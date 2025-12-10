"use client";
import React, { useState } from "react";
import ReportTable from "../../../../../component/dashboard/table/reportTables";
import Link from "next/link";
import { Line } from "@ant-design/charts";
import { DatePicker, Button, Typography, Space, Divider } from "antd";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const SalesByTime = () => {
  const [dateRange, setDateRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("simple");

  // Sample data for the table
  const [salesData, setSalesData] = useState([
    {
      key: "1",
      status: "Booked",
      "9:00 AM": "abc",
      "9:15 AM": "xxx",
      "9:30 AM": "abc",
      "9:45 AM": "abc",
      "9:50 AM": "xxx",
      "10:00 AM": "xxx",
      "10:10 AM": "xxx",
      "10:15 AM": "abc",
      "10:30 AM": "xxx",
      "10:40 AM": "xxx",
    },
    {
      key: "2",
      status: "Cancelled",
      "9:00 AM": "abc",
      "9:15 AM": "xxx",
      "9:30 AM": "abc",
      "9:45 AM": "abc",
      "9:50 AM": "xxx",
      "10:00 AM": "xxx",
      "10:10 AM": "xxx",
      "10:15 AM": "abc",
      "10:30 AM": "xxx",
      "10:40 AM": "xxx",
    },
    {
      key: "3",
      status: "Checked-In",
      "9:00 AM": "abc",
      "9:15 AM": "xxx",
      "9:30 AM": "abc",
      "9:45 AM": "abc",
      "9:50 AM": "xxx",
      "10:00 AM": "xxx",
      "10:10 AM": "xxx",
      "10:15 AM": "abc",
      "10:30 AM": "xxx",
      "10:40 AM": "xxx",
    },
    {
      key: "4",
      status: "Confirmed",
      "9:00 AM": "abc",
      "9:15 AM": "xxx",
      "9:30 AM": "abc",
      "9:45 AM": "abc",
      "9:50 AM": "xxx",
      "10:00 AM": "xxx",
      "10:10 AM": "xxx",
      "10:15 AM": "abc",
      "10:30 AM": "xxx",
      "10:40 AM": "xxx",
    },
    {
      key: "5",
      status: "No Show",
      "9:00 AM": "abc",
      "9:15 AM": "xxx",
      "9:30 AM": "abc",
      "9:45 AM": "abc",
      "9:50 AM": "xxx",
      "10:00 AM": "xxx",
      "10:10 AM": "xxx",
      "10:15 AM": "abc",
      "10:30 AM": "xxx",
      "10:40 AM": "xxx",
    },
  ]);

  // Define columns for the table
  const columns = [
    {
      title: "Status Name",
      dataIndex: "status",
      fixed: "left",
      width: 120,
    },
    {
      title: "9:00 AM",
      dataIndex: "9:00 AM",
    },
    {
      title: "9:15 AM",
      dataIndex: "9:15 AM",
    },
    {
      title: "9:30 AM",
      dataIndex: "9:30 AM",
    },
    {
      title: "9:45 AM",
      dataIndex: "9:45 AM",
    },
    {
      title: "9:50 AM",
      dataIndex: "9:50 AM",
    },
    {
      title: "10:00 AM",
      dataIndex: "10:00 AM",
    },
    {
      title: "10:10 AM",
      dataIndex: "10:10 AM",
    },
    {
      title: "10:15 AM",
      dataIndex: "10:15 AM",
    },
    {
      title: "10:30 AM",
      dataIndex: "10:30 AM",
    },
    {
      title: "10:40 AM",
      dataIndex: "10:40 AM",
    },
  ];

  // Sample data for the line chart
  const chartData = [
    { time: "9:00 AM", status: "Booked", value: 10 },
    { time: "9:15 AM", status: "Booked", value: 15 },
    { time: "9:30 AM", status: "Booked", value: 20 },
    { time: "9:00 AM", status: "Cancelled", value: 5 },
    { time: "9:15 AM", status: "Cancelled", value: 8 },
    { time: "9:30 AM", status: "Cancelled", value: 12 },
    { time: "9:00 AM", status: "Checked-In", value: 7 },
    { time: "9:15 AM", status: "Checked-In", value: 11 },
    { time: "9:30 AM", status: "Checked-In", value: 16 },
  ];

  const chartConfig = {
    data: chartData,
    xField: "time",
    yField: "value",
    seriesField: "status",
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };

  const handleViewReport = () => {
    if (!dateRange) {
      return;
    }
    setLoading(true);
    // Add logic to fetch and update sales data based on date range
    console.log("Fetching report for date range:", dateRange);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4">
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-md">
        <Title level={5}>Report Criteria</Title>
      </div>

      <div className="my-4">
        <Space direction="vertical" size="middle" className="w-max">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Text type="secondary" className="block mb-1">
                Date Range
              </Text>
              <RangePicker
                className="w-full"
                placeholder={["From", "To"]}
                onChange={setDateRange}
              />
            </div>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleViewReport}
              disabled={!dateRange}
              className="bg-[#0f3460] text-white"
            >
              View Report
            </Button>
          </div>
        </Space>
      </div>

      {/* Report Header */}
      <Space direction="vertical" className="w-full mb-4">
        <Title level={4}>Sales By Time Report</Title>
        <Text type="secondary">
          {dateRange
            ? `${dateRange[0].format("MMM DD, YYYY")} - ${dateRange[1].format(
                "MMM DD, YYYY"
              )}`
            : "No date range selected"}
        </Text>
        <Link href="/internalDashboard/reports" className="text-blue-500">
          Back to Reports
        </Link>
      </Space>

      {/* View Toggle */}
      <Space className="mb-4">
        <Button
          type={viewMode === "simple" ? "primary" : "default"}
          onClick={() => setViewMode("simple")}
          className={`bg-transparent border-none underline ${
            viewMode === "simple" ? "text-blue-500" : "text-black"
          }`}
        >
          Simple View
        </Button>
        <Button
          type={viewMode === "detailed" ? "primary" : "default"}
          onClick={() => setViewMode("detailed")}
          className={`bg-transparent border-none underline ${
            viewMode === "detailed" ? "text-blue-500" : "text-black"
          }`}
        >
          Detailed View
        </Button>
      </Space>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <ReportTable columns={columns} data={salesData} loading={loading} />
      </div>

      {/* Graph Section */}
      <div className="mt-8">
        <Title level={4}>Appointments by Time</Title>
        <div className="h-[400px]">
          <Line {...chartConfig} />
        </div>
      </div>

      {/* Timestamp */}
      <Divider />
      <Text type="secondary">
        {new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
          dateStyle: "short",
          timeStyle: "medium",
        })}{" "}
        EST
      </Text>
    </div>
  );
};

export default SalesByTime;
