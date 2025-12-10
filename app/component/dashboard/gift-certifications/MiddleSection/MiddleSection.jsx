"use client";
import { React, useState } from "react";
import Link from "next/link";
import { message } from "antd";
import { useSession } from "next-auth/react";
import ViewDetail from "../viewDetail/viewDetail";
import UniversalTable from "../../table/universalTable";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../api/apiContent/apiContent";

function MiddleSection({ certificates = [], loading, onCertificateUpdated }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  const columns = [
    { title: "Gift Certificates/Card #", key: "certificateNumber" },
    { title: "Type", key: "type" },
    { title: "Customer", key: "customerName" },
    { title: "Date Issued", key: "issueDate", render: (date) => new Date(date).toLocaleDateString() },
    { title: "Date Expires", key: "dateExpires" },
    {
      title: "Original Amount",
      key: "originalAmount",
      render: (amount) => `$${amount}`,
    },
    { title: "Balance", key: "balance", render: (amount) => `$${amount}` },
    { title: "From", key: "from" },
    { title: "To", key: "to" },
    {
      title: "Status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "used"
              ? "bg-gray-100 text-gray-800"
              : status === "cancelled"
              ? "bg-red-100 text-red-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions", 
      render: (_, cert) => (
        <div className="flex gap-2 text-blue-600">
          <button onClick={() => handleView(cert)} className="hover:underline">
            View
          </button>
          <span>|</span>
          <button
            onClick={() => handleSendEmail(cert)}
            className="hover:underline"
            disabled={cert.status === "cancelled"}
          >
            Email
          </button>
          <span>|</span>
          <Link href={`/dashboard/gift-certifications/${cert._id}/history`}>
            History
          </Link>
        </div>
      ),
    },
  ];

  const handleView = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const handleSendEmail = async (cert) => {
    try {
      await apiCall(API_ENDPOINTS.GIFT_CERTIFICATES.EMAIL(cert._id), {
        method: 'POST'
      });
      message.success("Email sent successfully");
    } catch (error) {
      message.error("Failed to send email");
    }
  };

  return (
    <>
      <UniversalTable columns={columns} data={certificates} loading={loading} />

      {/* Gift Certificate Modal */}
      {showModal && selectedCert && (
        <ViewDetail
          selectedCert={selectedCert}
          setShowModal={setShowModal}
          onCertificateUpdated={onCertificateUpdated}
        />
      )}
    </>
  );
}

export default MiddleSection;
