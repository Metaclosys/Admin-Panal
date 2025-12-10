"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function SplitStaffTipsChecker() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Staff Name",
      dataIndex: "staffName1",
      key: "staffName1",
    },
    {
      title: "Staff Name",
      dataIndex: "staffName2",
      key: "staffName2",
    },
    {
      title: "Tip Amount",
      dataIndex: "tipAmount",
      key: "tipAmount",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "abc",
      order: "xx",
      staffName1: "xx",
      staffName2: "xx",
      tipAmount: "xx",
    },
    {
      key: "2",
      date: "abc",
      order: "xx",
      staffName1: "xx",
      staffName2: "xx",
      tipAmount: "xx",
    },
    {
      key: "3",
      date: "Total",
      order: "xx",
      staffName1: "xx",
      staffName2: "xx",
      tipAmount: "xx",
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
        <h2 className="text-lg font-medium">Split Staff Tips Checker</h2>
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
      <ReportTable
        columns={columns}
        data={data}
        className="[&_.ant-table-row:last-child]:font-bold"
      />

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
