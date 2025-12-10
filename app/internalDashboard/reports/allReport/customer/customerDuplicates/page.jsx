"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CustomerDuplicates() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Home Phone",
      dataIndex: "homePhone",
      key: "homePhone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Billing Info",
      dataIndex: "billingInfo",
      key: "billingInfo",
    },
    {
      title: "# Duplicates",
      dataIndex: "numDuplicates",
      key: "numDuplicates",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      firstName: "abc",
      lastName: "xx",
      email: "xx",
      homePhone: "xx",
      address: "xx",
      billingInfo: "xx",
      numDuplicates: "xx",
    },
    {
      key: "2",
      firstName: "abc",
      lastName: "xx",
      email: "xx",
      homePhone: "xx",
      address: "xx",
      billingInfo: "xx",
      numDuplicates: "xx",
    },
    {
      key: "3",
      firstName: "abc",
      lastName: "xx",
      email: "xx",
      homePhone: "xx",
      address: "xx",
      billingInfo: "xx",
      numDuplicates: "xx",
    },
  ];

  return (
    <div className="p-6">
      {/* Report Criteria Section */}
      <div className="bg-[#F5F5F5] p-4 mb-6">
        <div className="text-sm font-medium mb-2">Report Criteria</div>
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
        <h2 className="text-lg font-medium">Customer Duplicates</h2>
        <div className="text-sm text-gray-500">
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
      </div>

      {/* Report Links */}
      <div className="mb-4 flex gap-4 text-sm text-blue-500">
        <a href="#" className="hover:underline">
          By Last Name & Email/Phone
        </a>
        <a href="#" className="hover:underline">
          By Last Name & Address
        </a>
        <a href="#" className="hover:underline">
          By Email/Phone Only
        </a>
        <a href="#" className="hover:underline">
          By Name & Billing Info
        </a>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto">
        <ReportTable columns={columns} data={data} scroll={{ x: true }} />
      </div>

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
