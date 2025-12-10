"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UpperSection from "../../component/dashboard/gift-certifications/UpperSection/UpperSection";
import MiddleSection from "../../component/dashboard/gift-certifications/MiddleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";

function GiftCertificationsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    dateRange: null,
    status: "",
  });

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      const data = await apiCall(API_ENDPOINTS.GIFT_CERTIFICATES.BASE, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching gift certificates:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchCertificates();
    }
  }, [session]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  // Filtering logic
  const filteredCertificates = certificates.filter((cert) => {
    const matchesText =
      !searchParams.searchText ||
      cert.certificateNumber
        ?.toLowerCase()
        .includes(searchParams.searchText.toLowerCase()) ||
      cert.customerName
        ?.toLowerCase()
        .includes(searchParams.searchText.toLowerCase());
    const matchesStatus =
      !searchParams.status || cert.status === searchParams.status.toLowerCase();
    let matchesDate = true;
    if (searchParams.dateRange && cert.issueDate) {
      const [start, end] = searchParams.dateRange;
      const issue = new Date(cert.issueDate);
      matchesDate =
        (!start || new Date(start) <= issue) &&
        (!end || issue <= new Date(end));
    }
    return matchesText && matchesStatus && matchesDate;
  });

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <div className="text-red-500">Error loading certificates: {error}</div>
        <button
          onClick={fetchCertificates}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="m-6">
      <UpperSection onSearch={handleSearch} />
      <MiddleSection
        certificates={filteredCertificates}
        loading={loading}
        onCertificateUpdated={fetchCertificates}
      />
    </div>
  );
}

export default GiftCertificationsPage;

