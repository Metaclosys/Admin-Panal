"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function StaffSales() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Employee Group",
      dataIndex: "employeeGroup",
      key: "employeeGroup",
    },
    {
      title: "Staff",
      children: [
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
      ],
    },
    {
      title: "Services",
      children: [
        { title: "#", dataIndex: "servicesCount", key: "servicesCount" },
        {
          title: "Original Amount",
          dataIndex: "servicesOriginal",
          key: "servicesOriginal",
        },
        {
          title: "Adjusted Amount",
          dataIndex: "servicesAdjusted",
          key: "servicesAdjusted",
        },
      ],
    },
    {
      title: "Products",
      children: [
        { title: "#", dataIndex: "productsCount", key: "productsCount" },
        { title: "Amount", dataIndex: "productsAmount", key: "productsAmount" },
      ],
    },
    {
      title: "Prepaid",
      children: [
        { title: "#", dataIndex: "prepaidCount", key: "prepaidCount" },
        { title: "Amount", dataIndex: "prepaidAmount", key: "prepaidAmount" },
      ],
    },
    {
      title: "Memberships",
      children: [
        { title: "#", dataIndex: "membershipsCount", key: "membershipsCount" },
        {
          title: "Amount",
          dataIndex: "membershipsAmount",
          key: "membershipsAmount",
        },
      ],
    },
    {
      title: "Tips",
      dataIndex: "tips",
      key: "tips",
    },
    {
      title: "Service Charge Total",
      dataIndex: "serviceChargeTotal",
      key: "serviceChargeTotal",
    },
    {
      title: "Total Staff",
      dataIndex: "totalStaff",
      key: "totalStaff",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      employeeGroup: "abc",
      firstName: "abc",
      lastName: "xxx",
      servicesCount: "abc",
      servicesOriginal: "abc",
      servicesAdjusted: "xxx",
      productsCount: "xxx",
      productsAmount: "xxx",
      prepaidCount: "xxx",
      prepaidAmount: "xxx",
      membershipsCount: "xxx",
      membershipsAmount: "xxx",
      tips: "abc",
      serviceChargeTotal: "xxx",
      totalStaff: "xxx",
    },
    {
      key: "2",
      employeeGroup: "abc",
      firstName: "abc",
      lastName: "xxx",
      servicesCount: "abc",
      servicesOriginal: "abc",
      servicesAdjusted: "xxx",
      productsCount: "xxx",
      productsAmount: "xxx",
      prepaidCount: "xxx",
      prepaidAmount: "xxx",
      membershipsCount: "xxx",
      membershipsAmount: "xxx",
      tips: "abc",
      serviceChargeTotal: "xxx",
      totalStaff: "xxx",
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
        <h2 className="text-lg font-medium">Staff Sales</h2>
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
