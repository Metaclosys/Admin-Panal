"use client";
import React, { useState } from "react";
import { Select, Button, Row, Col, Card } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { Pie, Bar } from "@ant-design/charts";

export default function CustomerRetentionDashboard() {
  // State for filters
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedTime, setSelectedTime] = useState("1");
  const [selectedDays, setSelectedDays] = useState("90");

  // Pie chart configuration
  const pieConfig = {
    appendPadding: 10,
    data: [
      { type: "Not Retained", value: 35 },
      { type: "Retained", value: 45 },
      { type: "Engaged", value: 20 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    color: ["#1D2B53", "#4B6BFB", "#7B96FF"],
    interactions: [{ type: "element-active" }],
  };

  // Bar chart configuration
  const barConfig = {
    data: [
      { type: "All Customers Retained", value: 75 },
      { type: "Percent Retained", value: 85 },
    ],
    xField: "type",
    yField: "value",
    color: "#4B6BFB",
    label: {
      position: "right",
      style: {
        fill: "#000000",
      },
    },
  };

  // Employee retention data
  const employeeData = [
    {
      name: "Alain Mirzai",
      role: "Service Barber - Hair Level",
      allCustomersRetained: 75,
      percentRetained: 85,
      total: 269,
    },
    {
      name: "Alain Mirzai",
      role: "Service Barber - Hair Level",
      allCustomersRetained: 65,
      percentRetained: 80,
      total: 269,
    },
    {
      name: "Alain Mirzai",
      role: "Service Barber - Hair Level",
      allCustomersRetained: 70,
      percentRetained: 82,
      total: 269,
    },
    {
      name: "Alain Mirzai",
      role: "Service Barber - Hair Level",
      allCustomersRetained: 72,
      percentRetained: 83,
      total: 269,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">
          Customer Retention Dashboard
        </h1>
        <p className="text-gray-600">How well do employees retain customers?</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={setSelectedEmployee}
          options={[{ value: "all", label: "All" }]}
        />
        <Select
          defaultValue="November"
          style={{ width: 120 }}
          onChange={setSelectedMonth}
          options={[{ value: "November", label: "November" }]}
        />
        <Select
          defaultValue="2024"
          style={{ width: 100 }}
          onChange={setSelectedYear}
          options={[{ value: "2024", label: "2024" }]}
        />
        <Select
          defaultValue="1"
          style={{ width: 100 }}
          onChange={setSelectedTime}
          options={[{ value: "1", label: "1 time" }]}
        />
        <Select
          defaultValue="90"
          style={{ width: 120 }}
          onChange={setSelectedDays}
          options={[{ value: "90", label: "90 days" }]}
        />
        <Button type="primary" className="bg-blue-500">
          Run
        </Button>
        <Button type="text" icon={<FileExcelOutlined />} className="ml-auto">
          Export Data
        </Button>
      </div>

      <div className="flex gap-8">
        <div className="w-1/3">
          <Card className="h-full">
            <Pie {...pieConfig} />
          </Card>
        </div>

        <div className="w-2/3 space-y-4">
          {employeeData.map((employee, index) => (
            <Card key={index} className="w-full ">
              <div className="flex items-center gap-8">
                <div className="w-1/4">
                  <h3 className="text-lg font-medium">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>

                <div className="w-2/4">
                  <Bar
                    {...barConfig}
                    height={100}
                    data={[
                      {
                        type: "All Customers Retained",
                        value: employee.allCustomersRetained,
                      },
                      {
                        type: "Percent Retained",
                        value: employee.percentRetained,
                      },
                    ]}
                  />
                </div>

                <div className="w-1/6">
                  <Pie {...pieConfig} height={200} width={250} />
                </div>

                <div className="w-1/12 text-right">
                  <div className="text-2xl font-bold">{employee.total}</div>
                  <div className="text-sm text-gray-500">Customers</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
