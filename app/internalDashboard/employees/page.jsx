"use client";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Card, Switch, message, Alert } from "antd";
import { useShop } from "../../context/ShopContext";
import UpperSection from "../../component/internalDashboard/employee/UpperSection/UpperSection";
import MiddleSection from "../../component/internalDashboard/employee/MiddleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";

const normalizeId = (value) => {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    return value._id || value.id || value.$oid || value.locationId || value.shopId;
  }

  return undefined;
};

const collectLocationIds = (employee) => {
  const ids = new Set();

  const primary = normalizeId(employee.locationId || employee.location || employee.shopId);
  if (primary) {
    ids.add(String(primary));
  }

  const secondarySources = [employee.assignedLocations, employee.locations, employee.shopAssignments];
  secondarySources
    .filter(Array.isArray)
    .forEach((collection) => {
      collection.forEach((entry) => {
        const normalized = normalizeId(entry);
        if (normalized) {
          ids.add(String(normalized));
        }
      });
    });

  // Some APIs return shopRequirements with shopId references
  if (Array.isArray(employee.shopRequirements)) {
    employee.shopRequirements.forEach((requirement) => {
      const normalized = normalizeId(requirement?.shopId);
      if (normalized) {
        ids.add(String(normalized));
      }
    });
  }

  return Array.from(ids);
};

const resolveStatus = (employee) => {
  const explicitStatus = employee?.status;
  if (typeof explicitStatus === "string" && explicitStatus.trim()) {
    return explicitStatus.trim().toLowerCase();
  }

  if (typeof employee?.isActive === "boolean") {
    return employee.isActive ? "active" : "inactive";
  }

  return undefined;
};

export default function EmployeesPage() {
  const { data: session } = useSession();
  const { currentShopId } = useShop();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [error, setError] = useState(null);

  const normalizedShopId = useMemo(() => (currentShopId ? String(currentShopId) : undefined), [currentShopId]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!normalizedShopId) {
        throw new Error("No shop ID found. Please select a shop first.");
      }

      if (!session?.accessToken) {
        throw new Error("No access token found in session. Please log in again.");
      }

      const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const filteredEmployees = Array.isArray(data)
        ? data.filter((employee) => {
            const locationIds = collectLocationIds(employee);
            const status = resolveStatus(employee);
            const statusMatches = showInactive || status === "active";
            return locationIds.includes(normalizedShopId) && statusMatches;
          })
        : [];

      setEmployees(filteredEmployees);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
      message.error(`Failed to fetch employees: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken && normalizedShopId) {
      fetchEmployees();
    }
  }, [session, showInactive, normalizedShopId]);

const handleEmployeeUpdated = () => {
    fetchEmployees();
  };

  const handleEmployeeDeleted = () => {
    fetchEmployees();
  };

  const handleSearchFilters = () => {
    // Future enhancement: apply client-side filtering based on search criteria.
  };

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <button onClick={fetchEmployees} className="text-blue-500 hover:text-blue-700">
              Retry
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Employees</h2>
          <div className="flex items-center gap-2">
            <span>Show Inactive</span>
            <Switch checked={showInactive} onChange={(checked) => setShowInactive(checked)} />
          </div>
        </div>
      </Card>

      <UpperSection onSearch={handleSearchFilters} />

      <MiddleSection
        shopId={normalizedShopId}
        employees={employees}
        loading={loading}
        showInactive={showInactive}
        onEmployeeUpdated={handleEmployeeUpdated}
        onEmployeeDeleted={handleEmployeeDeleted}
      />
    </div>
  );
}


