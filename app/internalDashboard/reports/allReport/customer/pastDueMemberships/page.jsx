"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function PastDueMemberships() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      className: "bg-blue-500 text-white",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      className: "bg-blue-500 text-white",
    },
    {
      title: "Customer Membership",
      dataIndex: "customerMembership",
      key: "customerMembership",
      className: "bg-blue-500 text-white",
    },
    {
      title: "Past Due Since",
      dataIndex: "pastDueSince",
      key: "pastDueSince",
      className: "bg-blue-500 text-white",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      customerId: "abc",
      customer: "xx",
      customerMembership: "xx",
      pastDueSince: "xx",
    },
    {
      key: "2",
      customerId: "abc",
      customer: "xx",
      customerMembership: "xx",
      pastDueSince: "xx",
    },
    {
      key: "3",
      customerId: "abc",
      customer: "xx",
      customerMembership: "xx",
      pastDueSince: "xx",
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
        <h2 className="text-lg font-medium">Past Due Membership</h2>
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
        <ReportTable
          columns={columns}
          data={data}
          className="[&_.ant-table-thead>tr>th]:!bg-blue-500 [&_.ant-table-thead>tr>th]:!text-white"
        />
      </div>

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
