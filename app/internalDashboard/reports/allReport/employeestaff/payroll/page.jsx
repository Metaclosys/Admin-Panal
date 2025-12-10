"use client";
import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import {
  PrinterOutlined,
  DownloadOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function PayrollReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
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
      title: "Employment Status",
      dataIndex: "employmentStatus",
      key: "employmentStatus",
    },
    {
      title: "Hours Worked",
      dataIndex: "hoursWorked",
      key: "hoursWorked",
    },
    {
      title: "# Services",
      dataIndex: "numServices",
      key: "numServices",
    },
    {
      title: "Compensation",
      dataIndex: "compensation",
      key: "compensation",
    },
    {
      title: "# Products",
      dataIndex: "numProducts",
      key: "numProducts",
    },
    {
      title: "Compensation",
      dataIndex: "productCompensation",
      key: "productCompensation",
    },
    {
      title: "# Bonuses",
      dataIndex: "numBonuses",
      key: "numBonuses",
    },
    {
      title: "Compensation",
      dataIndex: "bonusCompensation",
      key: "bonusCompensation",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      teamName: "abc",
      firstName: "abc",
      lastName: "xxx",
      employmentStatus: "abc",
      hoursWorked: "xxx",
      numServices: "xxx",
      compensation: "xxx",
      numProducts: "xxx",
      productCompensation: "abc",
      numBonuses: "xxx",
      bonusCompensation: "xxx",
    },
    {
      key: "2",
      teamName: "abc",
      firstName: "abc",
      lastName: "xxx",
      employmentStatus: "abc",
      hoursWorked: "xxx",
      numServices: "xxx",
      compensation: "xxx",
      numProducts: "xxx",
      productCompensation: "abc",
      numBonuses: "xxx",
      bonusCompensation: "xxx",
    },
    {
      key: "3",
      teamName: "abc",
      firstName: "abc",
      lastName: "xxx",
      employmentStatus: "abc",
      hoursWorked: "xxx",
      numServices: "xxx",
      compensation: "xxx",
      numProducts: "xxx",
      productCompensation: "abc",
      numBonuses: "xxx",
      bonusCompensation: "xxx",
    },
  ];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
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
          <div className="ml-auto flex gap-2">
            <Button type="text" icon={<PrinterOutlined />}>
              Print Report
            </Button>
            <Button type="text" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button type="text" icon={<RedoOutlined />}>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Report Header */}
      <div className="mb-6">
        <h2 className="text-lg font-medium">Payroll</h2>
        <div className="text-sm text-gray-500">
          <p>Gentle Brand</p>
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
        <div className="text-sm text-blue-500 mt-2">
          <a href="#" className="hover:underline">
            Back to Reports
          </a>
        </div>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
