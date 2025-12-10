"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const extractLocationId = (location) => {
  if (!location) {
    return "";
  }
  if (typeof location === "string") {
    return location;
  }
  if (typeof location === "object") {
    return location._id || location.id || location.locationId || "";
  }
  return String(location);
};

function ReservationistRedirect({ assignedLocations = [] }) {
  const router = useRouter();

  useEffect(() => {
    if (!assignedLocations.length) {
      return;
    }

    const locationId = extractLocationId(assignedLocations[0]);

    if (locationId) {
      try {
        localStorage.setItem("currentShopId", locationId);
      } catch (error) {
        console.warn("Unable to persist currentShopId:", error);
      }
    }

    router.replace("/internalDashboard/Booking/calendar");
  }, [assignedLocations, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      <p className="mt-4 text-gray-600">
        Redirecting you to the booking calendar...
      </p>
    </div>
  );
}

export default ReservationistRedirect;
