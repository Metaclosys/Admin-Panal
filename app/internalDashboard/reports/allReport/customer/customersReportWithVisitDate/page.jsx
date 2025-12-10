"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CustomersReportWithVisitDate() {
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Zip",
      dataIndex: "zip",
      key: "zip",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Home Phone",
      dataIndex: "homePhone",
      key: "homePhone",
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
    },
    {
      title: "Work Phone",
      dataIndex: "workPhone",
      key: "workPhone",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      firstName: "abc",
      lastName: "xxx",
      address: "xxx",
      city: "abc",
      state: "xxx",
      zip: "xxx",
      email: "xxx",
      homePhone: "abc",
      mobilePhone: "xxx",
      workPhone: "xxx",
      paymentType: "xxx",
    },
    {
      key: "2",
      firstName: "abc",
      lastName: "xxx",
      address: "xxx",
      city: "abc",
      state: "xxx",
      zip: "xxx",
      email: "xxx",
      homePhone: "abc",
      mobilePhone: "xxx",
      workPhone: "xxx",
      paymentType: "xxx",
    },
    {
      key: "3",
      firstName: "abc",
      lastName: "xxx",
      address: "xxx",
      city: "abc",
      state: "xxx",
      zip: "xxx",
      email: "xxx",
      homePhone: "abc",
      mobilePhone: "xxx",
      workPhone: "xxx",
      paymentType: "xxx",
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
        <h2 className="text-lg font-medium">
          Customers Report with Visit Dates
        </h2>
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
