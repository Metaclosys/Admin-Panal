"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function ProductUsageReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Professional",
      dataIndex: "professional",
      key: "professional",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
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
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Size Vol",
      dataIndex: "sizeVol",
      key: "sizeVol",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value) => `$${value}`,
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "abc",
      professional: "xx",
      staff: "xx",
      service: "xx",
      product: "xx",
      employee: "xx",
      sku: "xx",
      sizeVol: "xx",
      total: "xx",
    },
    {
      key: "2",
      date: "abc",
      professional: "xx",
      staff: "xx",
      service: "xx",
      product: "xx",
      employee: "xx",
      sku: "xx",
      sizeVol: "xx",
      total: "xx",
    },
    {
      key: "3",
      date: "abc",
      professional: "xx",
      staff: "xx",
      service: "xx",
      product: "xx",
      employee: "xx",
      sku: "xx",
      sizeVol: "xx",
      total: "xx",
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
        <h2 className="text-lg font-medium">Product Usage Report</h2>
        <div className="text-sm text-gray-500">
          <p>Jan 1, 2024 - Jan 15, 2024</p>
        </div>
        <div className="text-sm text-blue-500 mt-2">
          <a href="#" className="hover:underline">
            Back to Reports
          </a>
        </div>
      </div>

      {/* Report Links */}
      <div className="mb-4 flex gap-4 text-sm text-blue-500">
        <a href="#" className="hover:underline">
          All
        </a>
        <a href="#" className="hover:underline">
          Professional
        </a>
        <a href="#" className="hover:underline">
          Retail
        </a>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto">
        <ReportTable
          columns={columns}
          data={data}
          scroll={{ x: true }}
          className="[&_.ant-table-thead>tr>th]:!bg-blue-500 [&_.ant-table-thead>tr>th]:!text-white"
          summary={(pageData) => {
            let totalAmount = 0;

            pageData.forEach(({ total }) => {
              totalAmount += Number(total) || 0;
            });

            return (
              <Table.Summary.Row className="font-bold">
                <Table.Summary.Cell colSpan={8}>Total</Table.Summary.Cell>
                <Table.Summary.Cell>${totalAmount}</Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </div>

      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400">1/1/2024 12:23 PM HST</div>
    </div>
  );
}
