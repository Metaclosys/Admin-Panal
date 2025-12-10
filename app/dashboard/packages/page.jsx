"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";
import UpperSection from "../../component/dashboard/packages/upperSection/UpperSection";
import MiddleSection from "../../component/dashboard/packages/MiddleSection/MiddleSection";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  const fetchPackages = async () => {
    if (session?.accessToken) {
      try {
        setLoading(true);
        setError(null);
        const data = await apiCall(API_ENDPOINTS.PACKAGES.BASE, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [session?.accessToken]);

  return (
    <>
      <UpperSection onPackageAdded={fetchPackages} />
      <MiddleSection packages={packages} loading={loading} onPackageDeleted={fetchPackages} />
    </>
  );
}

export default Packages;
