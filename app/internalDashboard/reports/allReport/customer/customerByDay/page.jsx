"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function CustomersByDay() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Number of Orders",
      dataIndex: "numberOfOrders",
      key: "numberOfOrders",
    },
    {
      title: "Prepaid Amount",
      dataIndex: "prepaidAmount",
      key: "prepaidAmount",
      render: (value) => `$${value}`,
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (value) => `$${value}`,
    },
    {
      title: "Total Average",
      dataIndex: "totalAverage",
      key: "totalAverage",
      render: (value) => `$${value}`,
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "abc",
      numberOfOrders: "xx",
      prepaidAmount: "xx",
      paidAmount: "xx",
      totalAverage: "xx",
    },
    {
      key: "2",
      date: "abc",
      numberOfOrders: "xx",
      prepaidAmount: "xx",
      paidAmount: "xx",
      totalAverage: "xx",
    },
    {
      key: "3",
      date: "abc",
      numberOfOrders: "xx",
      prepaidAmount: "xx",
      paidAmount: "xx",
      totalAverage: "xx",
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
        <h2 className="text-lg font-medium">Customers By Day</h2>
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
          summary={(pageData) => {
            let totalOrders = 0;
            let totalPrepaid = 0;
            let totalPaid = 0;
            let totalAvg = 0;

            pageData.forEach(
              ({ numberOfOrders, prepaidAmount, paidAmount, totalAverage }) => {
                totalOrders += Number(numberOfOrders) || 0;
                totalPrepaid += Number(prepaidAmount) || 0;
                totalPaid += Number(paidAmount) || 0;
                totalAvg += Number(totalAverage) || 0;
              }
            );

            return (
              <Table.Summary.Row className="font-bold">
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>{totalOrders}</Table.Summary.Cell>
                <Table.Summary.Cell>${totalPrepaid}</Table.Summary.Cell>
                <Table.Summary.Cell>${totalPaid}</Table.Summary.Cell>
                <Table.Summary.Cell>
                  ${(totalAvg / pageData.length).toFixed(2)}
                </Table.Summary.Cell>
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
