"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function DailyTipsReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Employee Group",
      dataIndex: "employeeGroup",
      key: "employeeGroup",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Employee Level",
      dataIndex: "employeeLevel",
      key: "employeeLevel",
    },
    {
      title: "Number Of Orders",
      dataIndex: "numberOfOrders",
      key: "numberOfOrders",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tip Amount",
      dataIndex: "tipAmount",
      key: "tipAmount",
    },
    {
      title: "Refunded",
      dataIndex: "refunded",
      key: "refunded",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Total CC Tips",
      dataIndex: "totalCCTips",
      key: "totalCCTips",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      employeeGroup: "abc",
      employeeName: "xx",
      employeeLevel: "xx",
      numberOfOrders: "xx",
      amount: "xx",
      tipAmount: "xx",
      refunded: "xx",
      total: "xx",
      totalCCTips: "xx",
    },
    {
      key: "2",
      employeeGroup: "abc",
      employeeName: "xx",
      employeeLevel: "xx",
      numberOfOrders: "xx",
      amount: "xx",
      tipAmount: "xx",
      refunded: "xx",
      total: "xx",
      totalCCTips: "xx",
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
        <h2 className="text-lg font-medium">Daily Tips Report</h2>
        <div className="text-sm text-gray-500">
          <p>Santa Barbara - San Jose</p>
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
      </div>

      {/* Report Sections */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">All Employees</div>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />
    </div>
  );
}
