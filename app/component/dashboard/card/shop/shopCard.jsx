"use client";
import React from "react";
import { Button, Card, Skeleton } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useShop } from "../../../../context/ShopContext";

function ShopCard({
  id,
  name,
  address,
  phone,
  active,
  createdDate,
  loading,
  city,
  onEdit,
  onDelete,
  onViewDetails,
}) {
  const { updateShopId } = useShop();

  const formattedDate = createdDate
    ? new Date(createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const handleViewDetails = (e) => {
    e.preventDefault();
    if (typeof onViewDetails === "function") {
      onViewDetails(id);
      return;
    }
    updateShopId(id);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onEdit?.(id);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete?.(id);
  };

  if (loading) {
    return (
      <Card className="shadow-md bg-white rounded-lg">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <Card
      className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-3 gap-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {name || "Unnamed Shop"}
          </h3>
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                />
              )}
              {onDelete && (
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteClick}
                />
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-center">
            <EnvironmentOutlined className="mr-2" />
            {address || "No address provided"}
          </p>

          <p className="text-gray-600 flex items-center">
            <PhoneOutlined className="mr-2" />
            {phone || "No phone provided"}
          </p>

          <p className="text-gray-600 flex items-center">
            <ClockCircleOutlined className="mr-2" />
            Created: {formattedDate}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </span>

          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ShopCard;
