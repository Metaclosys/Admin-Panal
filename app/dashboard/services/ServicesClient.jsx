"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
import TopSection from "../../component/dashboard/services/TopSection/TopSection";
import MiddleSection from "../../component/dashboard/services/MiddleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

function ServicesClient({
  initialServices = [],
  initialError = null,
  accessToken,
}) {
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(!initialServices.length && !initialError);
  const [error, setError] = useState(initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchServices = useCallback(async () => {
    if (!accessToken) {
      setError("You are not authorized to view services.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
        accessToken,
      });
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!initialServices.length && !initialError && accessToken) {
      fetchServices();
    }
  }, [initialServices.length, initialError, accessToken, fetchServices]);

  const content = useMemo(() => {
    return (
      <MiddleSection
        services={services}
        loading={loading}
        onServiceDeleted={fetchServices}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        accessToken={accessToken}
      />
    );
  }, [services, loading, fetchServices, searchTerm, categoryFilter, accessToken]);

  return (
    <div className="m-6">
      <TopSection
        onServiceAdded={fetchServices}
        onSearch={setSearchTerm}
        onCategoryFilter={setCategoryFilter}
      />

      {error && (
        <div className="mb-4">
          <Alert message="Error" description={error} type="error" showIcon />
        </div>
      )}

      {content}
    </div>
  );
}

export default ServicesClient;
