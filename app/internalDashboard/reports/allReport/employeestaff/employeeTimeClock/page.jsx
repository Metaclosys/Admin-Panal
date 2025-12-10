"use client";
import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function EmployeeTimeClockReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Work Details",
      dataIndex: "workDetails",
      key: "workDetails",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      employee: "abc",
      startDate: "xx",
      endDate: "xx",
      workDetails: "xx",
    },
    {
      key: "2",
      employee: "abc",
      startDate: "xx",
      endDate: "xx",
      workDetails: "xx",
    },
    {
      key: "3",
      employee: "abc",
      startDate: "xx",
      endDate: "xx",
      workDetails: "xx",
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
        <h2 className="text-lg font-medium">Employee Time Clocks</h2>
        <div className="text-sm text-gray-500">
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
      </div>

      {/* Report Options */}
      <div className="mb-4">
        <Space>
          <Button type="text" className="text-blue-500">
            Display All Employees Together
          </Button>
          <Button type="text">Display One Employee Per Page</Button>
        </Space>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
