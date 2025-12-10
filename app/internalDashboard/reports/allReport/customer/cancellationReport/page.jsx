"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CancellationReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Card Date",
      dataIndex: "cardDate",
      key: "cardDate",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Card Fee Required",
      dataIndex: "cardFeeRequired",
      key: "cardFeeRequired",
    },
    {
      title: "Card Fee Fee",
      dataIndex: "cardFeeFee",
      key: "cardFeeFee",
    },
    {
      title: "Cancellation Fee",
      dataIndex: "cancellationFee",
      key: "cancellationFee",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      bookingId: "abc",
      customer: "xx",
      cardDate: "xx",
      reason: "xx",
      cardFeeRequired: "xx",
      cardFeeFee: "xx",
      cancellationFee: "xx",
      totalAmount: "xx",
    },
    {
      key: "2",
      bookingId: "abc",
      customer: "xx",
      cardDate: "xx",
      reason: "xx",
      cardFeeRequired: "xx",
      cardFeeFee: "xx",
      cancellationFee: "xx",
      totalAmount: "xx",
    },
    {
      key: "3",
      bookingId: "abc",
      customer: "xx",
      cardDate: "xx",
      reason: "xx",
      cardFeeRequired: "xx",
      cardFeeFee: "xx",
      cancellationFee: "xx",
      totalAmount: "xx",
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
        <h2 className="text-lg font-medium">Cancellation Report</h2>
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
