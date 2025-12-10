"use client";
import React, { useState } from "react";
import { Select, Button, Space, Typography, DatePicker } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function BlackoutHistoryPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [loading, setLoading] = useState(false);

  // Table columns configuration
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Blocked Time (Hours)",
      dataIndex: "blockedTime",
      key: "blockedTime",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Button type="link" className="text-blue-500 p-0">
          View History
        </Button>
      ),
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      employee: "abc",
      blockedTime: "xx",
    },
    {
      key: "2",
      employee: "abc",
      blockedTime: "xx",
    },
    {
      key: "3",
      employee: "abc",
      blockedTime: "xx",
    },
  ];

  const handleViewReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      {/* Report Criteria Section */}
      <div className="mb-4 bg-gray-100 p-4 rounded-md">
        <Title level={5}>Report Criteria</Title>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Text type="secondary" className="block mb-1">
                Date Range
              </Text>
              <RangePicker className="w-full" placeholder={["From", "To"]} />
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
          <Button
            icon={<PrinterOutlined />}
            className="flex bg-transparent border-none text-black"
          >
            Print Report
          </Button>
        </div>
      </div>

      {/* Report Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-black">Blackout History</h1>
        <p className="text-sm text-gray-500">Jan 1, 2024 - Jan 15, 2024</p>
      </div>

      {/* Report Tabs */}
      <div className="mb-6">
        <Space>
          <Button type="text" className="text-blue-500">
            By Employee
          </Button>
          <Button type="text">By Category</Button>
        </Space>
      </div>

      {/* Report Table */}
      <ReportTable columns={columns} data={data} />
    </div>
  );
}
