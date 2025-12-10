"use client";
import React, { useState } from "react";
import { Select, Button, Card, Table, Tabs } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("This Month");
  const [viewType, setViewType] = useState("simple");

  const paymentColumns = [
    { title: "Payments", dataIndex: "payments", key: "payments" },
    { title: "Paids", dataIndex: "paids", key: "paids" },
    { title: "Deposits", dataIndex: "deposits", key: "deposits" },
    { title: "Refunded", dataIndex: "refunded", key: "refunded" },
    { title: "Total", dataIndex: "total", key: "total" },
  ];

  const paymentData = [
    {
      key: "1",
      payments: "Unpaid",
      paids: "",
      deposits: "",
      refunded: "",
      total: "xx",
    },
    {
      key: "2",
      payments: "Cancelled/No show",
      paids: "",
      deposits: "",
      refunded: "",
      total: "xx",
    },
  ];

  const serviceColumns = [
    { title: "Services", dataIndex: "services", key: "services" },
    { title: "Qty", dataIndex: "qty", key: "qty" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Adjustment", dataIndex: "adjustment", key: "adjustment" },
    { title: "Refunded", dataIndex: "refunded", key: "refunded" },
    { title: "Total", dataIndex: "total", key: "total" },
  ];

  const serviceData = [
    {
      key: "1",
      services: "Unpaid",
      qty: "",
      amount: "",
      adjustment: "",
      refunded: "",
      total: "xx",
    },
  ];

  return (
    <div className="p-6">
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Report Criteria</h2>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <span className="block mb-2 text-black">Date Range</span>
              <Select
                value={dateRange}
                onChange={setDateRange}
                className="w-[200px]"
                options={[
                  { value: "This Month", label: "This Month" },
                  { value: "Last Month", label: "Last Month" },
                ]}
              />
            </div>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-[#0f3460]"
            >
              View Report
            </Button>
          </div>
          <Button icon={<PrinterOutlined />} className="flex items-center">
            Print Report
          </Button>
        </div>
      </div>

      {/* Location Title */}
      <h2 className="text-xl font-semibold mb-4 text-black">
        Gents Barber - San Jose
      </h2>

      {/* Dashboard Content */}
      <div className="mb-4">
        <div className="text-blue-500 hover:underline cursor-pointer mb-2">
          Back to Reports
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Jan 6, 2025 - Jan 12, 2025
        </div>

        {/* View Type Tabs */}
        <Tabs
          items={[
            { key: "simple", label: "Simple View" },
            { key: "detailed", label: "Detailed View" },
          ]}
          activeKey={viewType}
          onChange={setViewType}
          className="mb-4"
        />

        {/* Dashboard Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Appointments Section */}
          <Card
            title="Appointments"
            headStyle={{ background: "#3b82f6", color: "white" }}
            className="rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Unpaid</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled/No show</span>
                <span>xx</span>
              </div>
            </div>
          </Card>

          {/* Service & Retail Sales Section */}
          <Card
            title="Service & Retail Sales"
            headStyle={{ background: "#3b82f6", color: "white" }}
            className="rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Credit Account Charges</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>Membership Dues</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>Gift Certificates</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>Membership Fees</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>Membership Initiation Fee</span>
                <span>xx</span>
              </div>
            </div>
          </Card>

          {/* Customers Section */}
          <Card
            title="Customers"
            headStyle={{ background: "#3b82f6", color: "white" }}
            className="rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Return Customers</span>
                <span>xx</span>
              </div>
              <div className="flex justify-between">
                <span>New Customers</span>
                <span>xx</span>
              </div>
            </div>
          </Card>

          {/* Summary Tables */}
          <div className="col-span-2 space-y-6">
            <Table
              columns={paymentColumns}
              dataSource={paymentData}
              pagination={false}
              className="[&_.ant-table-thead>tr>th]:bg-blue-500 [&_.ant-table-thead>tr>th]:text-white"
            />

            <Table
              columns={serviceColumns}
              dataSource={serviceData}
              pagination={false}
              className="[&_.ant-table-thead>tr>th]:bg-blue-500 [&_.ant-table-thead>tr>th]:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
