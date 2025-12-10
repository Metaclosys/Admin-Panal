import React, { useMemo } from "react";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";

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

const MembershipPlanCard = ({
  id,
  plan,
  onDelete,
  loading,
  onEdit,
  onSelect,
}) => {
  const statusLabel = plan.status || (plan.isActive ? "active" : "inactive");
  const statusColor =
    statusLabel === "active" || plan.isActive ? "text-green-500" : "text-red-500";
  const locationName =
    plan?.location?.name ||
    plan?.location?.displayName ||
    plan?.locationName ||
    (typeof plan?.location === "string" ? plan.location : "");

  const discountSummary = useMemo(() => {
    if (plan.type === "fixed") {
      if (plan.discount === undefined || plan.discount === null) {
        return "No discount specified";
      }

      const maxMessage =
        plan.maxDiscountLimit !== undefined && plan.maxDiscountLimit !== null
          ? ` (up to $${formatCurrency(plan.maxDiscountLimit)})`
          : "";

      return `Fixed ${plan.discount}% discount${maxMessage}`;
    }

    if (Array.isArray(plan.customDiscounts) && plan.customDiscounts.length > 0) {
      const [first, ...rest] = plan.customDiscounts;
      const serviceName =
        first?.serviceId?.name ||
        first?.serviceId?.serviceName ||
        first?.serviceName ||
        "Service";

      const extraCount = rest.length;
      return `Custom discounts (${serviceName}${extraCount ? ` +${extraCount} more` : ""})`;
    }

    return "No custom discounts configured";
  }, [plan]);

  const tagList = useMemo(() => {
    if (!Array.isArray(plan.tags)) {
      return [];
    }
    return plan.tags.filter(Boolean);
  }, [plan.tags]);

  const hasEdit = typeof onEdit === "function";
  const hasDelete = typeof onDelete === "function";

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(plan);
    }
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    onEdit?.(plan);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (id !== undefined && id !== null) {
      onDelete?.(id);
    } else {
      onDelete?.();
    }
  };

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
              {plan.name || "Unnamed Plan"}
            </Title>
            <Text type="secondary" className="block">
              {plan.description || "No description provided"}
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
            <Text className="capitalize">{plan.type || "fixed"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Text strong>Price:</Text>
            <Text>${formatCurrency(plan.price)}</Text>
          </div>
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-black" />
            <Text>
              Active for {plan.durationDays || 0} day
              {Number(plan.durationDays) === 1 ? "" : "s"}
            </Text>
          </div>
          <div>
            <Text strong>Discount:</Text>{" "}
            <Text type="secondary">{discountSummary}</Text>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-100 p-3 rounded">
          <Text className={`${statusColor} font-semibold capitalize`}>
            {statusLabel}
          </Text>
          <Text>Auto Renew: {plan.autoRenew ? "Yes" : "No"}</Text>
          <Text>Visible: {plan.visible === false ? "No" : "Yes"}</Text>
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

export default MembershipPlanCard;
