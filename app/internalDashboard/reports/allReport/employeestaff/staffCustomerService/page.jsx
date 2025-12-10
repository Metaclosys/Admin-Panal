"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function StaffCustomerService() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Employee Group",
      dataIndex: "employeeGroup",
      key: "employeeGroup",
    },
    {
      title: "Tech Name",
      dataIndex: "techName",
      key: "techName",
    },
    {
      title: "Tech Name",
      dataIndex: "techName2",
      key: "techName2",
    },
    {
      title: "Number of Customers",
      dataIndex: "numberOfCustomers",
      key: "numberOfCustomers",
    },
    {
      title: "Number of Services",
      dataIndex: "numberOfServices",
      key: "numberOfServices",
    },
    {
      title: "Total Service Revenue",
      dataIndex: "totalServiceRevenue",
      key: "totalServiceRevenue",
    },
    {
      title: "Number of Products",
      dataIndex: "numberOfProducts",
      key: "numberOfProducts",
    },
    {
      title: "Total Products Revenue",
      dataIndex: "totalProductsRevenue",
      key: "totalProductsRevenue",
    },
    {
      title: "Average Customer Spending",
      dataIndex: "avgCustomerSpending",
      key: "avgCustomerSpending",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      employeeGroup: "abc",
      techName: "xx",
      techName2: "xx",
      numberOfCustomers: "xx",
      numberOfServices: "xx",
      totalServiceRevenue: "xx",
      numberOfProducts: "xx",
      totalProductsRevenue: "xx",
      avgCustomerSpending: "xx",
    },
    {
      key: "2",
      employeeGroup: "abc",
      techName: "xx",
      techName2: "xx",
      numberOfCustomers: "xx",
      numberOfServices: "xx",
      totalServiceRevenue: "xx",
      numberOfProducts: "xx",
      totalProductsRevenue: "xx",
      avgCustomerSpending: "xx",
    },
    {
      key: "3",
      employeeGroup: "abc",
      techName: "xx",
      techName2: "xx",
      numberOfCustomers: "xx",
      numberOfServices: "xx",
      totalServiceRevenue: "xx",
      numberOfProducts: "xx",
      totalProductsRevenue: "xx",
      avgCustomerSpending: "xx",
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
        <h2 className="text-lg font-medium">Staff Customer Service</h2>
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
      <div className="overflow-x-auto">
        <ReportTable columns={columns} data={data} scroll={{ x: true }} />
      </div>

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
