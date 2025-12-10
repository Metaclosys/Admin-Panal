"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function ScheduleHistory() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Default Schedule",
      dataIndex: "defaultSchedule",
      key: "defaultSchedule",
      render: () => (
        <a href="#" className="text-blue-500 hover:underline">
          Default Schedule
        </a>
      ),
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      render: () => (
        <a href="#" className="text-blue-500 hover:underline">
          Schedule
        </a>
      ),
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      staff: "Adrian Brown",
      defaultSchedule: "Default Schedule",
      schedule: "Schedule",
    },
    {
      key: "2",
      staff: "Spot",
      defaultSchedule: "Default Schedule",
      schedule: "Schedule",
    },
    {
      key: "3",
      staff: "Alman Perez",
      defaultSchedule: "Default Schedule",
      schedule: "Schedule",
    },
  ];

  return (
    <div className="p-6">
      {/* Report Criteria Section */}
      <div className="bg-[#F5F5F5] p-4 mb-6">
        <div className="flex items-center gap-4">
          <Select
            defaultValue="Date Range:"
            style={{ width: 200 }}
            options={[
              { value: "thisMonth", label: "This Month" },
              { value: "lastMonth", label: "Last Month" },
              { value: "custom", label: "Custom Range" },
            ]}
            onChange={(value) => setDateRange(value)}
          />
          <Button type="primary" className="bg-blue-500">
            View Report
          </Button>
          <Button type="text" icon={<PrinterOutlined />} className="ml-auto">
            Print Report
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <div className="mb-6">
        <h2 className="text-lg font-medium">Schedule History</h2>
        <div className="text-sm text-gray-500">
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
        <div className="text-sm text-blue-500 mt-2">
          <a href="#" className="hover:underline">
            Back to Reports
          </a>
        </div>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
