"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import {
  DownloadOutlined,
  RedoOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CustomerPaymentDetailReport() {
  const [dateRange, setDateRange] = useState("This Month");

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Order#",
      dataIndex: "order",
      // sorter: (a, b) => a.order.localeCompare(b.order),
    },
    {
      title: "Cust Fname",
      dataIndex: "custFname",
    },
    {
      title: "Cust Lname",
      dataIndex: "custLname",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
    },
    {
      title: "Payment Name",
      dataIndex: "paymentName",
    },
    {
      title: "CC Number",
      dataIndex: "ccNumber",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Cash Register",
      dataIndex: "cashRegister",
    },
  ];

  const mockData = [
    {
      key: "1",
      date: "xxx",
      order: "xxx",
      custFname: "xxx",
      custLname: "xxx",
      paymentType: "xxx",
      paymentName: "xxx",
      ccNumber: "xxx",
      amount: "xxx",
      cashRegister: "xxx",
    },
    {
      key: "2",
      date: "xxx",
      order: "xxx",
      custFname: "xxx",
      custLname: "xxx",
      paymentType: "xxx",
      paymentName: "xxx",
      ccNumber: "xxx",
      amount: "xxx",
      cashRegister: "xxx",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Report Criteria</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <span className="block mb-2 text-black">Date Range</span>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-[200px]"
              options={[
                { value: "This Month", label: "This Month" },
                { value: "Last Month", label: "Last Month" },
              ]}
            />
          </div>
          <Button type="primary" shape="round" size="large" className="bg-[#0F172A] ml-4">
            View Report
          </Button>
          {/* Action Buttons */}
        </div>
      <div className="flex gap-2">
        <Button icon={<DownloadOutlined />} className="flex items-center" />
        <Button icon={<RedoOutlined />} className="flex items-center" />
        <Button icon={<PrinterOutlined />} className="flex items-center" />
      </div>
      </div>

      {/* Back to Reports Link */}
      <div className="mb-4">
        <a className="text-blue-500 hover:underline cursor-pointer">
          Back to Reports
        </a>
      </div>

      {/* Date Range Display */}
      <div className="text-sm text-gray-600 mb-4">
        Jan 6, 2025 - Jan 6, 2025
      </div>

      {/* Results Table */}
      <ReportTable columns={columns} data={mockData} loading={false} />

      
    </div>
  );
}
