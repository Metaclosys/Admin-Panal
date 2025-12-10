"use client";
import React, { useMemo, useState } from "react";
import { Button, Space, message } from "antd";
import { useRouter } from "next/navigation";
import UniversalTable from "../../table/universalTable";
import DeletePop from "../../deletePop/deletePop";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../api/apiContent/apiContent";

const deriveDisplayId = (service, index) => {
  if (!service || typeof service !== "object") {
    return `SRV-${String(index + 1).padStart(3, "0")}`;
  }

  const candidates = [
    service.referenceCode,
    service.serviceCode,
    service.displayId,
    service.code,
    service.shortCode,
    service.shortId,
  ]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  if (candidates.length > 0) {
    return candidates[0];
  }

  return `SRV-${String(index + 1).padStart(3, "0")}`;
};

function MiddleSection({
  services = [],
  loading,
  onServiceDeleted,
  searchTerm,
  categoryFilter,
  accessToken,
}) {
  const router = useRouter();
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredServices = useMemo(() => {
    if (!Array.isArray(services)) {
      return [];
    }

    return services.filter((service) => {
      const matchesSearch = !searchTerm || service.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || service.category?.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, categoryFilter]);

  const tableData = useMemo(
    () =>
      filteredServices.map((service, index) => ({
        ...service,
        key: service._id || service.id,
        displayId: deriveDisplayId(service, index),
        subcategory: service.subcategory || service.subCategory || "",
      })),
    [filteredServices]
  );

  const handleDeleteService = async (serviceId) => {
    try {
      setDeleteLoading(true);
      const token = accessToken || getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Service deleted successfully");
      onServiceDeleted?.();
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error(error.message || "Failed to delete service");
    } finally {
      setDeleteLoading(false);
      setShowDeletePop(false);
      setSelectedService(null);
    }
  };

  const handleEditClick = (service) => {
    const targetId = service?._id || service?.id;
    if (!targetId) {
      message.error("Unable to edit service: missing identifier");
      return;
    }

    if (typeof window !== "undefined") {
      try {
        const storageKey = `service-edit-${targetId}`;
        window.sessionStorage.setItem(storageKey, JSON.stringify(service));
      } catch (error) {
        console.warn("Failed to cache service for editing", error);
      }
    }

    router.push(`/dashboard/services/addService?serviceId=${encodeURIComponent(String(targetId))}`);
  };

  const columns = [
    { title: "Ref", key: "displayId" },
    { title: "Name", key: "name" },
    { title: "Category", key: "category" },
    { title: "Subcategory", key: "subcategory" },
    {
      title: "Actions",
      key: "actions",
      render: (_, service) => (
        <Space>
          <Button
            className="text-green-600 hover:underline border-none"
            onClick={() => handleEditClick(service)}
          >
            Edit
          </Button>
          |
          <Button
            className="text-red-600 hover:underline border-none"
            onClick={() => {
              setSelectedService(service);
              setShowDeletePop(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <UniversalTable columns={columns} data={tableData} loading={loading} />

      {showDeletePop && (
        <div className="fixed inset-0 z-50">
          <DeletePop
            title="Are you sure you want to delete this service?"
            message="This will delete the service permanently. You cannot undo this action."
            onCancel={() => setShowDeletePop(false)}
            onDelete={() => handleDeleteService(selectedService?._id || selectedService?.id)}
            onClose={() => setShowDeletePop(false)}
            loading={deleteLoading}
          />
        </div>
      )}
    </div>
  );
}

export default MiddleSection;
