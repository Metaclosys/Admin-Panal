"use client";
import React, { useState } from "react";
import { Select, Input, Button } from "antd";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function SuspendedMemberships() {
  const [dateRange, setDateRange] = useState("This Month");
  const [customerName, setCustomerName] = useState("");

  const columns = [
    {
      title: "Membership #",
      dataIndex: "membershipId",
      render: (text) => (
        <a className="text-blue-500 hover:underline cursor-pointer">{text}</a>
      ),
    },
    { title: "Customer", dataIndex: "customer" },
    { title: "Membership", dataIndex: "membership" },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    { title: "Suspended Date", dataIndex: "suspendedDate" },
    { title: "Suspended By", dataIndex: "suspendedBy" },
    { title: "Reason", dataIndex: "reason" },
  ];

  // Empty mockData array since the image shows "No Result Found"
  const mockData = [];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Search Criteria</h2>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <span className="block mb-2 text-black">Date Range</span>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
              options={[
                { value: "This Month", label: "This Month" },
                { value: "Last Month", label: "Last Month" },
                // Add more options as needed
              ]}
            />
          </div>
          <div>
            <span className="block mb-2 text-black">Customer Name</span>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
        
          <Button type="primary" className="bg-[#0F172A]" size="large" shape="round">
            Search
          </Button>
          <Button size="large" shape="round">Reset</Button>
        </div>
      </div>

      {/* Results Table */}
      <ReportTable columns={columns} data={mockData} loading={false} />

      {/* No Results Message */}
      {mockData.length === 0 && (
        <div className="text-center py-8 text-gray-500">No Result Found</div>
      )}
    </div>
  );
}
