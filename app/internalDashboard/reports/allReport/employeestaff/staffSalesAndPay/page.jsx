"use client";
import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function StaffSalesAndPay() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pay Type",
      dataIndex: "payType",
      key: "payType",
    },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
    },
    {
      title: "Pay",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "Tips",
      dataIndex: "tips",
      key: "tips",
    },
    {
      title: "Hours Worked",
      children: [
        {
          title: "Scheduled Hours",
          dataIndex: "scheduledHours",
          key: "scheduledHours",
        },
        {
          title: "Base Compensation",
          dataIndex: "baseCompensation",
          key: "baseCompensation",
        },
      ],
    },
    {
      title: "Services",
      children: [
        {
          title: "Sales",
          dataIndex: "serviceSales",
          key: "serviceSales",
        },
        {
          title: "Commission",
          dataIndex: "serviceCommission",
          key: "serviceCommission",
        },
      ],
    },
    {
      title: "Retail Products",
      children: [
        {
          title: "Sales",
          dataIndex: "retailSales",
          key: "retailSales",
        },
        {
          title: "Commission",
          dataIndex: "retailCommission",
          key: "retailCommission",
        },
      ],
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      name: "abc",
      payType: "xx",
      totalSales: "xx",
      pay: "xx",
      tips: "xx",
      scheduledHours: "xx",
      baseCompensation: "xx",
      serviceSales: "xx",
      serviceCommission: "xx",
      retailSales: "xx",
      retailCommission: "xx",
    },
    {
      key: "2",
      name: "abc",
      payType: "xx",
      totalSales: "xx",
      pay: "xx",
      tips: "xx",
      scheduledHours: "xx",
      baseCompensation: "xx",
      serviceSales: "xx",
      serviceCommission: "xx",
      retailSales: "xx",
      retailCommission: "xx",
    },
    {
      key: "3",
      name: "abc",
      payType: "xx",
      totalSales: "xx",
      pay: "xx",
      tips: "xx",
      scheduledHours: "xx",
      baseCompensation: "xx",
      serviceSales: "xx",
      serviceCommission: "xx",
      retailSales: "xx",
      retailCommission: "xx",
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
        <h2 className="text-lg font-medium">Staff Sales & Pay</h2>
        <div className="text-sm text-gray-500">
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
        <div className="flex gap-4 mt-2">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Back to Reports
          </a>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Detailed View
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
