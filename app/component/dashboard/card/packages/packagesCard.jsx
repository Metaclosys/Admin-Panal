import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined, TagOutlined } from "@ant-design/icons";
import { Card, Typography, Space } from "antd";

const { Text, Title } = Typography;

const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return "0.00";
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return numeric.toFixed(2);
};

const PackagesCard = ({
  id,
  pkg,
  name,
  duration,
  type,
  price,
  services,
  onDelete,
  onEdit,
  onSelect,
  loading,
}) => {
  const normalizedPackage = useMemo(() => {
    if (pkg && typeof pkg === "object") {
      return pkg;
    }

    const fallbackItems = Array.isArray(services)
      ? services.map((serviceName, index) => ({
          serviceId: `service-${index}`,
          name: serviceName,
          quantity: 1,
          freeQuantity: 0,
        }))
      : [];

    return {
      name,
      description: duration,
      type,
      packagePrice: price,
      price,
      items: fallbackItems,
      tags: [],
      allowOnlinePurchase: true,
      status: "active",
    };
  }, [pkg, name, duration, type, price, services]);

  const locationName =
    normalizedPackage?.location?.name ||
    normalizedPackage?.location?.displayName ||
    normalizedPackage?.locationName ||
    (typeof normalizedPackage?.location === "string"
      ? normalizedPackage.location
      : "");

  const allowOnline =
    normalizedPackage?.allowOnlinePurchase !== undefined
      ? normalizedPackage.allowOnlinePurchase
      : normalizedPackage?.allowOnlineBooking;

  const itemsSummary = useMemo(() => {
    if (!Array.isArray(normalizedPackage?.items)) {
      return { total: 0, free: 0 };
    }
    return normalizedPackage.items.reduce(
      (acc, item) => ({
        total: acc.total + (Number(item.quantity) || 0),
        free: acc.free + (Number(item.freeQuantity) || 0),
      }),
      { total: 0, free: 0 }
    );
  }, [normalizedPackage?.items]);

  const tagList = useMemo(() => {
    if (!Array.isArray(normalizedPackage?.tags)) {
      return [];
    }
    return normalizedPackage.tags.filter(Boolean);
  }, [normalizedPackage?.tags]);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(pkg ?? normalizedPackage);
    }
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    onEdit?.(pkg ?? normalizedPackage);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (id !== undefined && id !== null) {
      onDelete?.(id);
    } else {
      onDelete?.();
    }
  };

  const hasEdit = typeof onEdit === "function";
  const hasDelete = typeof onDelete === "function";

  return (
    <Card
      className="shadow-md"
      loading={loading}
      hoverable={Boolean(onSelect)}
      onClick={onSelect ? handleCardClick : undefined}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className="flex justify-between items-start">
          <div>
            <Title level={5} className="text-xl font-semibold text-black mb-1">
              {normalizedPackage?.name || "Unnamed Package"}
            </Title>
            <Text type="secondary" className="block">
              {normalizedPackage?.description || "No description provided"}
            </Text>
          </div>
          {(hasEdit || hasDelete) && (
            <div className="flex items-center gap-3">
              {hasEdit && (
                <EditOutlined
                  className="text-black cursor-pointer"
                  onClick={handleEditClick}
                />
              )}
              {hasDelete && (
                <DeleteOutlined
                  className="text-black cursor-pointer"
                  onClick={handleDeleteClick}
                />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Text strong>Location:</Text>
            <Text>{locationName || "Not assigned"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Type:</Text>
            <Text>{normalizedPackage?.type || type || "Not specified"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Price:</Text>
            <Text>
              ${formatCurrency(normalizedPackage?.packagePrice ?? price)}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Services:</Text>
            <Text>
              {itemsSummary.total} total
              {itemsSummary.free > 0 ? ` • ${itemsSummary.free} free` : ""}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Status:</Text>
            <Text className="capitalize">
              {normalizedPackage?.status ||
                (normalizedPackage?.isActive ? "active" : "inactive")}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Online:</Text>
            <Text>{allowOnline ? "Enabled" : "Disabled"}</Text>
          </div>
        </div>

        {tagList.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 text-xs text-gray-600">
            <TagOutlined />{" "}
            {tagList.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Space>
    </Card>
  );
};

export default PackagesCard;

