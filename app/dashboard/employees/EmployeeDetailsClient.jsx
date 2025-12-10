"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Empty,
  Spin,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import EditEmployeeModal from "../../component/dashboard/employee/editEmployee/EditEmployeeModal";

const STATUS_COLORS = {
  Active: "green",
  Inactive: "red",
  "On Leave": "orange",
  Terminated: "volcano",
};

const TYPE_COLORS = {
  Scheduled: "blue",
  Unscheduled: "purple",
};

const formatDate = (value) => {
  if (!value) return "N/A";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "N/A";
  }
};

function EmployeeDetailsClient({
  employeeId,
  initialEmployee = null,
  initialError = null,
  accessToken,
}) {
  const router = useRouter();
  const [employee, setEmployee] = useState(initialEmployee);
  const [loading, setLoading] = useState(!initialEmployee && !initialError);
  const [error, setError] = useState(initialError);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setEmployee(initialEmployee);
  }, [initialEmployee]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchEmployee = useCallback(async () => {
    if (!employeeId || !accessToken) {
      setError("You are not authorized to view this employee.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(employeeId), {
        accessToken,
      });
      setEmployee(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching employee:", err);
      setError(err instanceof Error ? err.message : "Failed to load employee");
    } finally {
      setLoading(false);
    }
  }, [employeeId, accessToken]);

  useEffect(() => {
    if (!initialEmployee && accessToken && employeeId) {
      fetchEmployee();
    }
  }, [initialEmployee, accessToken, employeeId, fetchEmployee]);

  const goBack = () => {
    router.push("/dashboard/employees");
  };

  const fullName = useMemo(() => {
    if (!employee) {
      return "Employee";
    }

    if (employee.displayName) {
      return employee.displayName;
    }

    const composed = `${employee.firstName || ""} ${employee.lastName || ""}`.trim();
    return composed || "Employee";
  }, [employee]);

  return (
    <div className="m-6 space-y-4">
      <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
        Back to Employees
      </Button>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spin size="large" />
        </div>
      ) : error ? (
        <Card className="shadow-sm">
          <div className="text-red-500 mb-2">{error}</div>
          <Button type="primary" onClick={fetchEmployee}>
            Retry
          </Button>
        </Card>
      ) : !employee ? (
        <Card className="shadow-sm">
          <Empty description="Employee not found" />
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Avatar
                  size={72}
                  icon={<UserOutlined />}
                  src={employee.imageUrl}
                />
                <div>
                  <h1 className="text-2xl font-semibold">{fullName}</h1>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {employee.status && (
                      <Tag color={STATUS_COLORS[employee.status] || "default"}>
                        {employee.status}
                      </Tag>
                    )}
                    {employee.type && (
                      <Tag color={TYPE_COLORS[employee.type] || "default"}>
                        {employee.type}
                      </Tag>
                    )}
                  </div>
                </div>
              </div>
              <Button type="primary" onClick={() => setIsEditModalOpen(true)}>
                Edit employee
              </Button>
            </div>

            <Descriptions bordered column={1} className="mt-6" labelStyle={{ width: 200 }}>
              <Descriptions.Item label="Email">
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-gray-500" />
                  <span>{employee.email || "N/A"}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-500" />
                  <span>{employee.phone || "N/A"}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined className="text-gray-500" />
                  <span>{employee.location?.name || "Not assigned"}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Max Appointments Per Day">
                {typeof employee.maxAppointmentsPerDay === "number"
                  ? employee.maxAppointmentsPerDay
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Employment Start Date">
                {formatDate(employee.employmentStartDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Employment End Date">
                {employee.specifyEmploymentEndDate
                  ? formatDate(employee.employmentEndDate)
                  : "Not specified"}
              </Descriptions.Item>
              <Descriptions.Item label="Create Login">
                {employee.createLogin ? "Yes" : "No"}
              </Descriptions.Item>
            </Descriptions>

            {employee.description && (
              <Card title="Description" className="mt-4 bg-gray-50">
                <p className="whitespace-pre-line text-gray-700">
                  {employee.description}
                </p>
              </Card>
            )}

            {employee.notes && (
              <Card title="Notes" className="mt-4 bg-gray-50">
                <p className="whitespace-pre-line text-gray-700">{employee.notes}</p>
              </Card>
            )}
          </Card>

          <div className="space-y-4">
            <Card title="Metadata" className="shadow-sm">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Employee ID">
                  {employee._id}
                </Descriptions.Item>
                <Descriptions.Item label="Created">
                  {formatDate(employee.createdAt)}
                </Descriptions.Item>
                <Descriptions.Item label="Last Updated">
                  {formatDate(employee.updatedAt)}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Roles" className="shadow-sm">
              {Array.isArray(employee.roles) && employee.roles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {employee.roles.map((role) => (
                    <Tag key={role}>{role}</Tag>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No roles assigned</p>
              )}
            </Card>

            {Array.isArray(employee.services) && employee.services.length > 0 && (
              <Card title="Services" className="shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {employee.services.map((service) => (
                    <Tag key={service._id || service}>
                      {service.name || service}
                    </Tag>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      <EditEmployeeModal
        open={isEditModalOpen}
        employee={employee}
        accessToken={accessToken}
        onClose={() => setIsEditModalOpen(false)}
        onUpdated={fetchEmployee}
      />
    </div>
  );
}

export default EmployeeDetailsClient;
