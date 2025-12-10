"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CustomerSummary() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Usage",
      dataIndex: "customerUsage",
      key: "customerUsage",
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
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Service Total",
      dataIndex: "serviceTotal",
      key: "serviceTotal",
    },
    {
      title: "Product Total",
      dataIndex: "productTotal",
      key: "productTotal",
    },
    {
      title: "Tip",
      dataIndex: "tip",
      key: "tip",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "abc",
      customerName: "xxx",
      customerUsage: "xxx",
      employeeName: "abc",
      employeeLevel: "xxx",
      service: "xxx",
      product: "xxx",
      serviceTotal: "xxx",
      productTotal: "abc",
      tip: "xxx",
      tax: "xxx",
    },
    {
      key: "2",
      date: "abc",
      customerName: "xxx",
      customerUsage: "xxx",
      employeeName: "abc",
      employeeLevel: "xxx",
      service: "xxx",
      product: "xxx",
      serviceTotal: "xxx",
      productTotal: "abc",
      tip: "xxx",
      tax: "xxx",
    },
    {
      key: "3",
      date: "abc",
      customerName: "xxx",
      customerUsage: "xxx",
      employeeName: "abc",
      employeeLevel: "xxx",
      service: "xxx",
      product: "xxx",
      serviceTotal: "xxx",
      productTotal: "abc",
      tip: "xxx",
      tax: "xxx",
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
        <h2 className="text-lg font-medium">Customer Summary</h2>
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
