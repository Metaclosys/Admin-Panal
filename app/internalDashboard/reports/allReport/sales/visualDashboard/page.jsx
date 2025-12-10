"use client";
import React, { useState } from "react";
import {
  DatePicker,
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Pie } from "@ant-design/charts";
import Link from "next/link";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const VisualDashboard = () => {
  const [dateRange, setDateRange] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample data for the pie chart
  const appointmentsByDayData = [
    { type: "Monday", value: 27.2 },
    { type: "Tuesday", value: 15.8 },
    { type: "Wednesday", value: 12.8 },
    { type: "Thursday", value: 24.7 },
    { type: "Friday", value: 11.6 },
    { type: "Saturday", value: 4.8 },
    { type: "Sunday", value: 3.1 },
  ];

  const pieConfig = {
    data: appointmentsByDayData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  const topServices = [
    { name: "Haircut", revenue: "1,039.00" },
    { name: "Hair Wash", revenue: "1,055.00" },
    { name: "Head Massage", revenue: "1,039.00" },
  ];

  const topCustomers = [
    { name: "Konstantin Boldyrev", visits: 195 },
    { name: "Konstantin Boldyrev", visits: 185 },
    { name: "Konstantin Boldyrev", visits: 165 },
  ];

  const handleViewReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4">
      {/* Report Criteria Section */}
      <div className="mb-4 bg-gray-100 p-4 rounded-md">
        <Title level={5}>Report Criteria</Title>
      </div>

      <div className="my-4">
        <Space direction="vertical" size="middle" className="w-max">
          <div className="flex gap-4 items-center">
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
              onClick={handleViewReport}
              className="bg-[#0f3460]"
            >
              View Report
            </Button>
          </div>
        </Space>
      </div>

      {/* Report Header */}
      <Space direction="vertical" className="w-full mb-4">
        <Title level={4}>Visual Dashboard</Title>
        <Text type="secondary">Jan 11, 2024 - Jan 12, 2024</Text>
        <Link href="/internalDashboard/reports" className="text-blue-500">
          Back to Reports
        </Link>
      </Space>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space align="center" className="mb-2">
              <UserOutlined className="text-2xl text-blue-500" />
              <Text strong>New Customers</Text>
            </Space>
            <Statistic
              value={5}
              suffix={
                <Text type="secondary" className="text-xs">
                  Your Average: 40
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space align="center" className="mb-2">
              <DollarOutlined className="text-2xl text-green-500" />
              <Text strong>Total Revenue</Text>
            </Space>
            <Statistic
              value={2334.17}
              suffix={
                <Text type="secondary" className="text-xs">
                  Your Average: 18,754.00
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space align="center" className="mb-2">
              <ClockCircleOutlined className="text-2xl text-orange-500" />
              <Text strong>% Schedule Booked</Text>
            </Space>
            <Statistic
              value={1.07}
              suffix={
                <Text type="secondary" className="text-xs">
                  Your Average: 2.17
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space align="center" className="mb-2">
              <CalendarOutlined className="text-2xl text-purple-500" />
              <Text strong>Appointments Booked</Text>
            </Space>
            <Statistic
              value={103}
              suffix={
                <Text type="secondary" className="text-xs">
                  Your Average: 214
                </Text>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Lower Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            title={
              <Space>
                <Text strong>Top Services:</Text>
                <Text type="secondary" className="text-xs">
                  Quantity | Revenue
                </Text>
              </Space>
            }
          >
            <Space direction="vertical" className="w-full">
              {topServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Space>
                    <Text>⭐</Text>
                    <Text>{service.name}</Text>
                  </Space>
                  <Text type="secondary">${service.revenue}</Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title={<Text strong>Appointments by Day of Week By Hour</Text>}>
            <div className="h-[200px]">
              <Pie {...pieConfig} />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title={
              <Space>
                <Text strong>Top Customers:</Text>
                <Text type="secondary" className="text-xs">
                  By Visits | By spends
                </Text>
              </Space>
            }
          >
            <Space direction="vertical" className="w-full">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Space>
                    <Text>⭐</Text>
                    <Text>{customer.name}</Text>
                  </Space>
                  <Text type="secondary">{customer.visits}</Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Timestamp */}
      <Divider />
      <Text type="secondary" className="block">
        1/9/2024 1:22:27 PM EST
      </Text>
    </div>
  );
};

export default VisualDashboard;
