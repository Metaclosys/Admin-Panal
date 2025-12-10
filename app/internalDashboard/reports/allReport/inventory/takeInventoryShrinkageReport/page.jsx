"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function TakeInventoryShrinkageReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date/Time Staff/User",
      dataIndex: "dateTimeStaffUser",
      key: "dateTimeStaffUser",
    },
    {
      title: "# Products Counted",
      dataIndex: "productsCount",
      key: "productsCount",
    },
    {
      title: "# Products Uncounted",
      dataIndex: "productsUncounted",
      key: "productsUncounted",
    },
    {
      title: "# Products Total",
      dataIndex: "productsTotal",
      key: "productsTotal",
    },
    {
      title: "Total Shrinkage Cost",
      dataIndex: "shrinkageCost",
      key: "shrinkageCost",
      render: (value) => `$${value}`,
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      dateTimeStaffUser: "abc",
      productsCount: "xx",
      productsUncounted: "xx",
      productsTotal: "xx",
      shrinkageCost: "xx",
    },
    {
      key: "2",
      dateTimeStaffUser: "abc",
      productsCount: "xx",
      productsUncounted: "xx",
      productsTotal: "xx",
      shrinkageCost: "xx",
    },
    {
      key: "3",
      dateTimeStaffUser: "abc",
      productsCount: "xx",
      productsUncounted: "xx",
      productsTotal: "xx",
      shrinkageCost: "xx",
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
          Take Inventory / Shrinkage Report
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
          className="[&_.ant-table-thead>tr>th]:!bg-blue-500 [&_.ant-table-thead>tr>th]:!text-white"
          summary={(pageData) => {
            let totalProducts = 0;
            let totalShrinkage = 0;

            pageData.forEach(({ productsTotal, shrinkageCost }) => {
              totalProducts += Number(productsTotal) || 0;
              totalShrinkage += Number(shrinkageCost) || 0;
            });

            return (
              <Table.Summary.Row className="font-bold">
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
                <Table.Summary.Cell>{totalProducts}</Table.Summary.Cell>
                <Table.Summary.Cell>${totalShrinkage}</Table.Summary.Cell>
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
