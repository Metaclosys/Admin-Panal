"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
import TopSection from "../../component/dashboard/users/upperSection/UpperSection";
import MiddleSection from "../../component/dashboard/users/middleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

function UsersClient({
  initialUsers = [],
  initialError = null,
  accessToken,
}) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(!initialUsers.length && !initialError);
  const [error, setError] = useState(initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchUsers = useCallback(async () => {
    if (!accessToken) {
      setError("You are not authorized to view users.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_ENDPOINTS.USERS.BASE, {
        accessToken,
      });
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!initialUsers.length && !initialError && accessToken) {
      fetchUsers();
    }
  }, [initialUsers.length, initialError, accessToken, fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        `${user.firstName || ""} ${user.lastName || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "" ||
        (Array.isArray(user.roles) && user.roles.includes(roleFilter)) ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  return (
    <div className="m-6">
      <TopSection
        onUserAdded={fetchUsers}
        onSearch={setSearchTerm}
        onRoleFilter={setRoleFilter}
      />

      {error && (
        <div className="mb-4">
          <Alert message="Error" description={error} type="error" showIcon />
        </div>
      )}

      <MiddleSection
        users={filteredUsers}
        loading={loading}
        onUserDeleted={fetchUsers}
        accessToken={accessToken}
      />
    </div>
  );
}

export default UsersClient;
