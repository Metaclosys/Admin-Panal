"use client";
import React, { useState } from "react";
import { Select, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

export default function StaffSalesDetails() {
  const [dateRange, setDateRange] = useState("This Month");

  // Table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Final Price",
      dataIndex: "finalPrice",
      key: "finalPrice",
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Commission",
      dataIndex: "productCommission",
      key: "productCommission",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      date: "01/01/2024",
      staff: "John Doe",
      service: "Haircut",
      originalPrice: "$50.00",
      discount: "$5.00",
      finalPrice: "$45.00",
      commission: "$9.00",
      products: "$30.00",
      productCommission: "$6.00",
    },
    {
      key: "2",
      date: "01/02/2024",
      staff: "Jane Smith",
      service: "Color",
      originalPrice: "$120.00",
      discount: "$0.00",
      finalPrice: "$120.00",
      commission: "$24.00",
      products: "$45.00",
      productCommission: "$9.00",
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
        <h2 className="text-lg font-medium">Staff Sales Details</h2>
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
