"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function EmployeeDailyTips() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Number of Orders",
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
      title: "Service Charge",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "abc",
      numberOfOrders: "xx",
      amount: "xx",
      tipAmount: "xx",
      refunded: "xx",
      serviceCharge: "xx",
      total: "xx",
    },
    {
      key: "2",
      date: "abc",
      numberOfOrders: "xx",
      amount: "xx",
      tipAmount: "xx",
      refunded: "xx",
      serviceCharge: "xx",
      total: "xx",
    },
    {
      key: "3",
      date: "Total",
      numberOfOrders: "xx",
      amount: "xx",
      tipAmount: "xx",
      refunded: "xx",
      serviceCharge: "xx",
      total: "xx",
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
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />
    </div>
  );
}
