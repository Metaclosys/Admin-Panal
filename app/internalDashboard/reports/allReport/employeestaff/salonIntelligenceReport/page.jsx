"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function SalonIntelligenceReport() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Total Service Sales",
      children: [
        {
          title: "$",
          dataIndex: "serviceSalesAmount",
          key: "serviceSalesAmount",
        },
        { title: "by", dataIndex: "serviceSalesBy", key: "serviceSalesBy" },
        { title: "Avg", dataIndex: "serviceSalesAvg", key: "serviceSalesAvg" },
      ],
    },
    {
      title: "Total Product Sales",
      children: [
        {
          title: "$",
          dataIndex: "productSalesAmount",
          key: "productSalesAmount",
        },
        { title: "by", dataIndex: "productSalesBy", key: "productSalesBy" },
        { title: "Avg", dataIndex: "productSalesAvg", key: "productSalesAvg" },
      ],
    },
    {
      title: "Total # of Transactions",
      children: [
        { title: "#", dataIndex: "transactionsNum", key: "transactionsNum" },
        { title: "by", dataIndex: "transactionsBy", key: "transactionsBy" },
        { title: "Avg", dataIndex: "transactionsAvg", key: "transactionsAvg" },
      ],
    },
    {
      title: "% Service Customers",
      dataIndex: "serviceCustomersPercent",
      key: "serviceCustomersPercent",
    },
    {
      title: "Average Product $ per Service",
      dataIndex: "avgProductPerService",
      key: "avgProductPerService",
    },
    {
      title: "% Bookable Productivity",
      dataIndex: "bookableProductivity",
      key: "bookableProductivity",
    },
    {
      title: "Average Service $ per Hour",
      dataIndex: "avgServicePerHour",
      key: "avgServicePerHour",
    },
    {
      title: "% Cross Transactions",
      dataIndex: "crossTransactions",
      key: "crossTransactions",
    },
    {
      title: "% Customers Pre-Booked",
      dataIndex: "customersPreBooked",
      key: "customersPreBooked",
    },
    {
      title: "% Existing Clients",
      dataIndex: "existingClients",
      key: "existingClients",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      serviceSalesAmount: "abc",
      serviceSalesBy: "abc",
      serviceSalesAvg: "xxx",
      productSalesAmount: "abc",
      productSalesBy: "xxx",
      productSalesAvg: "xxx",
      transactionsNum: "xxx",
      transactionsBy: "xxx",
      transactionsAvg: "xxx",
      serviceCustomersPercent: "abc",
      avgProductPerService: "xxx",
      bookableProductivity: "xxx",
      avgServicePerHour: "xxx",
      crossTransactions: "abc",
      customersPreBooked: "xxx",
      existingClients: "xxx",
    },
    {
      key: "2",
      serviceSalesAmount: "abc",
      serviceSalesBy: "abc",
      serviceSalesAvg: "xxx",
      productSalesAmount: "abc",
      productSalesBy: "xxx",
      productSalesAvg: "xxx",
      transactionsNum: "xxx",
      transactionsBy: "xxx",
      transactionsAvg: "xxx",
      serviceCustomersPercent: "abc",
      avgProductPerService: "xxx",
      bookableProductivity: "xxx",
      avgServicePerHour: "xxx",
      crossTransactions: "abc",
      customersPreBooked: "xxx",
      existingClients: "xxx",
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
        <h2 className="text-lg font-medium">Salon Intelligence Report</h2>
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
