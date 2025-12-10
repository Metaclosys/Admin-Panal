"use client";

import React, { useState } from "react";
import { Spin, Empty, Modal, message } from "antd";
import ShopCard from "../../card/shop/shopCard";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";
import slugify from "../../../../utils/slugify";

function MiddleSection({
  shops = [],
  loading,
  onShopDeleted,
  emptyMessage = "No shops found. Add a new shop to get started.",
  accessToken,
}) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const buildShopSlug = (shop) => {
    const base = slugify(shop?.name || "");
    if (!shop) {
      return base;
    }
    if (shop.locationId) {
      return `${base}-${shop.locationId}`;
    }
    if (shop._id) {
      return `${base}-${slugify(String(shop._id).slice(-6))}`;
    }
    return base;
  };

  const handleNavigateToDetails = (shop, options = {}) => {
    if (!shop) {
      message.error("Unable to open shop details");
      return;
    }
    const slug = buildShopSlug(shop);
    const search = options.mode ? `?mode=${encodeURIComponent(options.mode)}` : "";
    router.push(`/dashboard/shops/${encodeURIComponent(slug)}${search}`);
  };

  const handleEditShop = (shop) => {
    handleNavigateToDetails(shop, { mode: "edit" });
  };

  const handleDeleteRequest = (shop) => {
    if (!shop?._id) {
      message.error("Unable to determine which shop to delete");
      return;
    }
    setDeleteTarget({
      id: shop._id,
      name: shop.name,
    });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) {
      setDeleteModalVisible(false);
      return;
    }

    try {
      setDeleteLoading(true);

      if (!accessToken) {
        throw new Error("You are not authorized to delete shops");
      }

      await apiCall(API_ENDPOINTS.LOCATIONS.BY_ID(deleteTarget.id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      message.success("Shop deleted successfully");
      setDeleteModalVisible(false);
      setDeleteTarget(null);
      onShopDeleted?.();
    } catch (error) {
      console.error("Error deleting shop:", error);
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to delete the selected shop"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" tip="Loading shops...">
            <div className="min-h-[64px]" />
          </Spin>
        </div>
      </div>
    );
  }

  if (shops.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-500 text-lg">
              {emptyMessage}
            </span>
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard
            key={shop._id}
            id={shop._id}
            name={shop.name}
            address={
              shop.contactInfo?.address ||
              `${shop.contactInfo?.streetAddress || ""}, ${
                shop.contactInfo?.city || ""
              }, ${shop.contactInfo?.state || ""}`
            }
            phone={shop.contactInfo?.phone || shop.phone}
            active={shop.isActive}
            createdDate={shop.createdAt || shop.createdDate}
            city={shop.contactInfo?.city}
            onEdit={() => handleEditShop(shop)}
            onDelete={() => handleDeleteRequest(shop)}
            onViewDetails={() => handleNavigateToDetails(shop)}
          />
        ))}
      </div>

      <Modal
        title="Delete Shop"
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteTarget(null);
        }}
        confirmLoading={deleteLoading}
        okText="Delete"
        okButtonProps={{ danger: true }}
        onOk={handleConfirmDelete}
      >
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{deleteTarget?.name || "this shop"}</span>?
        </p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}

export default MiddleSection;
