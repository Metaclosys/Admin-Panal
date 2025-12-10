"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "antd";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import TopSection from "../../component/dashboard/shop/upperSection/TopSection";
import MiddleSection from "../../component/dashboard/shop/middleSection/MiddleSection";

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [value];
};

function ShopsClient({
  initialShops = [],
  initialError = null,
  accessToken,
  isReservationist = false,
  assignedLocations = [],
}) {
  const safeAssignedLocations = ensureArray(assignedLocations);
  const [shops, setShops] = useState(initialShops);
  const [filteredShops, setFilteredShops] = useState(initialShops);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  const canFetchShops =
    Boolean(accessToken) &&
    (!isReservationist || safeAssignedLocations.length > 0);

  useEffect(() => {
    setShops(initialShops);
    setFilteredShops(initialShops);
  }, [initialShops]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchShops = useCallback(async () => {
    if (!canFetchShops) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
        accessToken,
      });
      const safeData = Array.isArray(data) ? data : [];
      setShops(safeData);
      setFilteredShops(safeData);
      if (isReservationist && safeData.length === 0) {
        setError("No shops are available for your account.");
      }
    } catch (err) {
      console.error("Error fetching shops:", err);
      setError(err instanceof Error ? err.message : "Failed to load shops");
    } finally {
      setLoading(false);
    }
  }, [accessToken, canFetchShops, isReservationist]);

  useEffect(() => {
    if (!initialShops.length && !initialError && canFetchShops) {
      fetchShops();
    }
  }, [initialShops.length, initialError, canFetchShops, fetchShops]);

  useEffect(() => {
    if (isReservationist && safeAssignedLocations.length === 0) {
      setShops([]);
      setFilteredShops([]);
      setError(
        "No shops are assigned to your account. Please contact your administrator."
      );
    }
  }, [isReservationist, safeAssignedLocations.length]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredShops(shops);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = shops.filter((shop) => {
      const shopName = shop.name || "";
      const address = shop.contactInfo?.address || "";
      return (
        shopName.toLowerCase().includes(lowerSearch) ||
        address.toLowerCase().includes(lowerSearch)
      );
    });
    setFilteredShops(filtered);
  };

  const handleLocationFilter = (location) => {
    if (!location) {
      setFilteredShops(shops);
      return;
    }
    const lowered = location.toLowerCase();
    const filtered = shops.filter((shop) =>
      (shop.contactInfo?.city || "").toLowerCase().includes(lowered)
    );
    setFilteredShops(filtered);
  };

  const emptyMessage = useMemo(() => {
    return isReservationist
      ? "No shops are available for your account."
      : "No shops found. Add a new shop to get started.";
  }, [isReservationist]);

  return (
    <>
      <TopSection
        onShopAdded={fetchShops}
        onSearch={handleSearch}
        onLocationFilter={handleLocationFilter}
        canAddShop={!isReservationist}
      />

      {error && (
        <div className="px-6 -mt-4">
          <Alert type="error" message={error} showIcon />
        </div>
      )}

      <MiddleSection
        shops={filteredShops}
        loading={loading}
        onShopDeleted={fetchShops}
        emptyMessage={emptyMessage}
        accessToken={accessToken}
      />
    </>
  );
}

export default ShopsClient;
