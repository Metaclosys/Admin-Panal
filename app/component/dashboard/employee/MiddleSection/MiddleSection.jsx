"use client";

import React from "react";
import { Button, Tag, Space, Popconfirm, message, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, apiCall } from "../../../../lib/apiClient";
import UniversalTable from "../../table/universalTable";

const EmployeeStatusColors = {
  Active: "green",
  Inactive: "red",
  "On Leave": "orange",
  Terminated: "volcano",
};

const EmployeeTypeColors = {
  Scheduled: "blue",
  Unscheduled: "purple",
};

function MiddleSection({
  employees = [],
  loading,
  onEmployeeDeleted,
  accessToken,
}) {
  const router = useRouter();

  const handleViewEmployee = (employeeId) => {
    router.push(`/dashboard/employees/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      if (!accessToken) {
        message.error("Authentication required. Please sign in again.");
        return;
      }

      await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(employeeId), {
        method: "DELETE",
        accessToken,
      });

      message.success("Employee deleted successfully");

      if (onEmployeeDeleted) {
        onEmployeeDeleted();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      message.error(`Failed to delete employee: ${error.message}`);
    }
  };

  const columns = [
    {
      title: "Employee",
      key: "employee",
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar
            size={40}
            icon={<UserOutlined />}
            src={record.imageUrl}
            className="mr-3"
          />
          <div>
            <div className="font-medium">
              {record.displayName ||
                `${record.firstName || ""} ${record.lastName || ""}`.trim()}
            </div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <span>{record.location?.name || "Unknown Location"}</span>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (_, record) => (
        <Tag color={EmployeeTypeColors[record.type] || "default"}>
          {record.type || "Unspecified"}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={EmployeeStatusColors[record.status] || "default"}>
          {record.status || "Unknown"}
        </Tag>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <div>{record.phone || "No phone"}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewEmployee(record._id)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Popconfirm
            title="Delete this employee?"
            description="Are you sure you want to delete this employee? This action cannot be undone."
            onConfirm={() => handleDeleteEmployee(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <UniversalTable
      columns={columns}
      data={employees.map((employee) => ({ ...employee, key: employee._id }))}
      loading={loading}
    />
  );
}

export default MiddleSection;

