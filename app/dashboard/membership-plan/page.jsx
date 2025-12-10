"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";
import TopSection from "../../component/dashboard/membership-plan/TopSection/TopSection";
import MiddleSection from "../../component/dashboard/membership-plan/MiddleSection/MiddleSection";

function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      const data = await apiCall(API_ENDPOINTS.MEMBERSHIP_PLANS.BASE, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setPlans(data);
      console.log("response from fetchPlans:", data);
    } catch (err) {
      console.error("Error fetching membership plans:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchPlans();
    }
  }, [session]);

  return (
    <>
      <TopSection onPlanAdded={fetchPlans} onSearch={setSearchTerm} />
      <MiddleSection
        membershipPlans={plans}
        loading={loading}
        onPlanDeleted={fetchPlans}
        searchTerm={searchTerm}
      />
    </>
  );
}

export default MembershipPlans;
