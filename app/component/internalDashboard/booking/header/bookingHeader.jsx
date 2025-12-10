"use client";
import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button, Space, message } from "antd";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPrint,
  FaExpand,
} from "react-icons/fa";
import dayjs from "dayjs";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";
import { useSession } from "next-auth/react";

const BookingHeader = ({
  selectedDate,
  setSelectedDate,
  view,
  setView,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const { data: session, status } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      if (status === "loading") {
        return;
      }

      if (!session?.accessToken) {
        setError("No authentication token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const employeesData = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        if (employeesData && Array.isArray(employeesData)) {
          const validEmployees = employeesData.filter(
            (emp) =>
              emp && typeof emp === "object" && (emp.firstName || emp.lastName)
          );

          const options = validEmployees.map((emp, index) => {
            const fullName = `${emp.firstName || ""} ${
              emp.lastName || ""
            }`.trim();
            return {
              value: emp._id || `temp-${index}`,
              label: fullName || `Employee ${index + 1}`,
              firstName: emp.firstName || "",
              lastName: emp.lastName || "",
              id: emp._id || `temp-${index}`,
            };
          });

          setEmployeeOptions(options);

          if (!selectedEmployee && options.length > 0) {
            setSelectedEmployee(options[0]);
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load employees";
        const lowerMessage = errorMessage.toLowerCase();
        const lacksPermission =
          lowerMessage.includes("required roles") ||
          lowerMessage.includes("forbidden") ||
          lowerMessage.includes("unauthorized");

        if (lacksPermission) {
          console.warn("Employee fetch skipped due to role restrictions.", errorMessage);
          setEmployeeOptions([]);
          setError(null);
        } else {
          setError(errorMessage);
          message.error(errorMessage);
          setEmployeeOptions([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [session?.accessToken, status, selectedEmployee, setSelectedEmployee]);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(dayjs(date));
    }
  };

  const handleEmployeeChange = (value) => {
    if (!value) {
      setSelectedEmployee(null);
      return;
    }
    const selectedEmp = employeeOptions.find((emp) => emp.value === value);
    if (selectedEmp) {
      setSelectedEmployee(selectedEmp);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handlePrevious = () => {
    const newDate = selectedDate.subtract(1, view.toLowerCase());
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = selectedDate.add(1, view.toLowerCase());
    setSelectedDate(newDate);
  };

  const handleToday = () => {
    setSelectedDate(dayjs());
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between animate-pulse">
          <div className="w-48 h-10 bg-gray-200 rounded"></div>
          <div className="w-48 h-10 bg-gray-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error loading booking header: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className={`p-4 ${isExpanded ? "expanded" : ""}`}>
      <div className="flex items-center justify-between space-x-4">
        <Space>
          <Select
            value={selectedEmployee?.value}
            onChange={handleEmployeeChange}
            options={employeeOptions}
            style={{ width: 200 }}
            placeholder="Select employee"
            loading={loading}
            disabled={loading}
          />
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            disabled={loading}
          />
        </Space>

        <Space>
          <Button.Group>
            <Button
              icon={<FaChevronLeft />}
              onClick={handlePrevious}
              disabled={loading}
            />
            <Button onClick={handleToday} disabled={loading}>
              Today
            </Button>
            <Button
              icon={<FaChevronRight />}
              onClick={handleNext}
              disabled={loading}
            />
          </Button.Group>

          <Button.Group>
            <Button
              type={view === "month" ? "primary" : "default"}
              onClick={() => handleViewChange("month")}
              disabled={loading}
            >
              Month
            </Button>
            <Button
              type={view === "week" ? "primary" : "default"}
              onClick={() => handleViewChange("week")}
              disabled={loading}
            >
              Week
            </Button>
            <Button
              type={view === "day" ? "primary" : "default"}
              onClick={() => handleViewChange("day")}
              disabled={loading}
            >
              Day
            </Button>
          </Button.Group>

          <Button.Group>
            <Button
              icon={<FaSearch />}
              onClick={() => message.info("Search functionality coming soon")}
              disabled={loading}
            />
            <Button
              icon={<FaPrint />}
              onClick={() => message.info("Print functionality coming soon")}
              disabled={loading}
            />
            <Button
              icon={<FaExpand />}
              onClick={() => setIsExpanded(!isExpanded)}
              disabled={loading}
            />
          </Button.Group>
        </Space>
      </div>
    </div>
  );
};

export default BookingHeader;
