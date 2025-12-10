"use client";
import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { message, Button, Tooltip } from "antd";
import DeletePop from "../../../dashboard/deletePop/deletePop";
import UniversalTable from "../../../dashboard/table/universalTable";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

const humanizeEntityName = (entity) => {
  if (!entity) {
    return "";
  }

  if (typeof entity === "string") {
    return entity;
  }

  const {
    name,
    fullName,
    firstName,
    lastName,
    email,
    title,
    productName,
    user,
  } = entity;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  const combined = [firstName, lastName]
    .filter((part) => typeof part === "string" && part.trim())
    .join(" ");
  if (combined) {
    return combined;
  }

  if (typeof title === "string" && title.trim()) {
    return title.trim();
  }

  if (typeof productName === "string" && productName.trim()) {
    return productName.trim();
  }

  if (email) {
    return email;
  }

  if (user?.name) {
    return user.name;
  }

  if (user?.email) {
    return user.email;
  }

  return entity._id || entity.id || entity.employeeId || entity.productId || "";
};

const formatListDisplay = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "-";
  }

  const labels = items
    .map(humanizeEntityName)
    .filter((value) => typeof value === "string" && value.trim());

  if (labels.length === 0) {
    return "-";
  }

  return labels.join(", ");
};

function MiddleSection({
  shopId,
  services = [],
  loading,
  showInactive,
  onServiceDeleted,
  onEditService,
}) {
  const { data: session } = useSession();
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleDeleteService = async (serviceId) => {
    try {
      await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      message.success("Service deleted successfully");
      onServiceDeleted();
    } catch (error) {
      console.error("Delete error:", error);
      message.error(error.message || "Failed to delete service");
    }
    setShowDeletePop(false);
    setSelectedService(null);
  };

  const tableData = useMemo(
    () =>
      services.map((service, index) => ({
        ...service,
        key:
          service._id ||
          service.id ||
          service.serviceId ||
          service.sku ||
          `${service.name || "service"}-${index}`,
      })),
    [services]
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => record?.name || record?.serviceName || "-",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record?.category || "-",
    },
    {
      title: "Duration (min)",
      key: "duration",
      render: (_, record) => record?.duration ?? "-",
    },
    {
      title: "Price ($)",
      key: "price",
      render: (_, record) =>
        record?.price !== undefined && record?.price !== null ? record.price : "-",
    },
    {
      title: "Employees",
      key: "assignedEmployees",
      render: (_, record) => (
        <Tooltip title={formatListDisplay(record?.assignedEmployees)}>
          <span className="truncate max-w-[200px] inline-block align-middle">
            {formatListDisplay(record?.assignedEmployees)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Products",
      key: "products",
      render: (_, record) => (
        <Tooltip title={formatListDisplay(record?.productsUsed || record?.products)}>
          <span className="truncate max-w-[200px] inline-block align-middle">
            {formatListDisplay(record?.productsUsed || record?.products)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      key: "active",
      render: (_, record) => (
        <span className={record?.isActive || record?.active ? "text-green-600" : "text-red-600"}>
          {(record?.isActive || record?.active) ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button type="link" onClick={() => onEditService?.(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setSelectedService(record);
              setShowDeletePop(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <UniversalTable columns={columns} data={tableData} loading={loading} />

      {showDeletePop && selectedService && (
        <DeletePop
          title="Delete Service"
          message="Are you sure you want to delete this service? This action cannot be undone."
          onCancel={() => {
            setShowDeletePop(false);
            setSelectedService(null);
          }}
          onDelete={() => handleDeleteService(selectedService._id || selectedService.id)}
          onClose={() => setShowDeletePop(false)}
        />
      )}
    </>
  );
}

export default MiddleSection;



