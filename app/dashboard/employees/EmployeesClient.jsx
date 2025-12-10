"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
import UpperSection from "../../component/dashboard/employee/UpperSection/UpperSection";
import MiddleSection from "../../component/dashboard/employee/MiddleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

export default function EmployeesClient({
  initialEmployees = [],
  initialError = null,
  accessToken,
}) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [loading, setLoading] = useState(
    !initialEmployees.length && !initialError
  );
  const [error, setError] = useState(initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    setEmployees(initialEmployees);
  }, [initialEmployees]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchEmployees = useCallback(async () => {
    if (!accessToken) {
      setError("You are not authorized to view employees.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
        accessToken,
      });
      const resolvedEmployees = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];
      setEmployees(resolvedEmployees);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load employees."
      );
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!initialEmployees.length && !initialError && accessToken) {
      fetchEmployees();
    }
  }, [initialEmployees.length, initialError, accessToken, fetchEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${employee.firstName || ""} ${employee.lastName || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "" ||
        employee.location?._id === locationFilter ||
        employee.locationId === locationFilter;

      return matchesSearch && matchesLocation;
    });
  }, [employees, searchTerm, locationFilter]);

  return (
    <div className="m-6 space-y-6">
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <UpperSection
        onEmployeeAdded={fetchEmployees}
        onSearch={setSearchTerm}
        onLocationFilter={setLocationFilter}
        selectedLocation={locationFilter}
        searchTerm={searchTerm}
        accessToken={accessToken}
      />

      <MiddleSection
        employees={filteredEmployees}
        loading={loading}
        onEmployeeDeleted={fetchEmployees}
        accessToken={accessToken}
      />
    </div>
  );
}

