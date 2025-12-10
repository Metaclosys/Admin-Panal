"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Alert, Spin, Button } from "antd";
import TopSection from "../component/dashboard/landingPage/TopSection/TopSection";
import MediumSection from "../component/dashboard/landingPage/MediumSection/MediumSection";
import LowerSection from "../component/dashboard/landingPage/LowerSection/LowerSection";
import { fetchDashboardData } from "./dashboardData";

const MAX_RETRIES = 3;

function DashboardClient({
  initialData = null,
  initialError = null,
  accessToken,
  isReservationist = false,
  reservationistMessage = "Reservationists are redirected to the booking calendar once their shops are available.",
}) {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [isLoading, setIsLoading] = useState(!initialData && !initialError);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const loadData = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchDashboardData(accessToken);
      setDashboardData(data);
      setErrorMessage(null);
      setRetryCount(0);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data."
      );
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    await loadData();
    setIsRetrying(false);
  }, [loadData]);

  const dashboardStats = useMemo(() => {
    if (!dashboardData) {
      return null;
    }

    const { employees, services, shops, bookings } = dashboardData;

    const recentBookings =
      bookings?.filter(
        (booking) =>
          new Date(booking.startTime) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ) || [];

    return {
      totalShops: shops?.length || 0,
      totalEmployees: employees?.length || 0,
      totalCustomers: [
        ...new Set(employees?.map((employee) => employee.customerId) || []),
      ].length,
      totalServices: services?.length || 0,
      recentEmployees: employees?.slice(0, 5) || [],
      recentBookings: recentBookings,
    };
  }, [dashboardData]);

  if (isReservationist) {
    return (
      <div className="p-4">
        <Alert
          message="Access Restricted"
          description={reservationistMessage}
          type="warning"
          showIcon
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="p-4">
        <Alert
          message="Error"
          description={
            <div>
              <p>{errorMessage}</p>
              {retryCount < MAX_RETRIES && !isRetrying && (
                <Button type="primary" onClick={handleRetry} className="mt-4">
                  Retry Now
                </Button>
              )}
            </div>
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!dashboardStats || !dashboardData) {
    return null;
  }

  return (
    <div className="p-4">
      <TopSection stats={dashboardStats} />
      <MediumSection stats={dashboardStats} />
      <LowerSection employees={dashboardData.employees} />
    </div>
  );
}

export default DashboardClient;
