"use client";
import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Spin,
  Tabs,
  Card,
  Button,
  Tag,
  Descriptions,
  message,
  Modal,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import AddShop from "../../../component/dashboard/shop/addShop/addShop";
import { apiCall, API_ENDPOINTS } from "../../../api/apiContent/apiContent";
import slugify from "../../../utils/slugify";

const buildSlugFromShop = (shop) => {
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

const { TabPane } = Tabs;

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};

const formatClosedDate = (date) => {
  if (!date) return null;
  try {
    const dateValue = date.date || date.closedDate || date;
    return {
      date: formatDate(dateValue),
      description: date.description || "Closed",
    };
  } catch (error) {
    return null;
  }
};

const ShopDetails = ({ params }) => {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const decodedSlug = decodeURIComponent(slug);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode");

  const [activeTab, setActiveTab] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShopBySlug = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      setError(null);
      const list = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const safeList = Array.isArray(list) ? list : [];
      const matchedEntry = safeList.find((entry) => {
        const generatedSlug = buildSlugFromShop(entry);
        const simpleSlug = slugify(entry?.name || "");
        const providedSlug = entry?.slug || simpleSlug;
        return (
          generatedSlug === decodedSlug ||
          providedSlug === decodedSlug ||
          simpleSlug === decodedSlug
        );
      });

      if (!matchedEntry?._id) {
        setError("Shop not found.");
        setShop(null);
        return;
      }

      const detailed = await apiCall(
        API_ENDPOINTS.LOCATIONS.BY_ID(matchedEntry._id),
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        }
      );
      const resolvedShop = detailed || matchedEntry;
      setShop(resolvedShop);
      return resolvedShop;
    } catch (err) {
      console.error("Error loading shop:", err);
      setError(err instanceof Error ? err.message : "Failed to load shop");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadShopBySlug();
  }, [session?.accessToken, decodedSlug]);

  useEffect(() => {
    if (mode === "edit" && shop) {
      setShowEditShop(true);
    }
  }, [mode, shop]);

  const handleGoBack = () => {
    router.push("/dashboard/shops");
  };

  const handleEdit = () => {
    router.replace(`/dashboard/shops/${encodeURIComponent(slug)}?mode=edit`);
    setShowEditShop(true);
  };

  const handleCloseEditModal = () => {
    setShowEditShop(false);
    const currentSlug = buildSlugFromShop(shop) || slug;
    router.replace(`/dashboard/shops/${encodeURIComponent(currentSlug)}`);
  };

  const showDeleteConfirm = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteConfirm = async () => {
    if (!shop?._id || !session?.accessToken) return;
    try {
      setDeleteLoading(true);
      await apiCall(API_ENDPOINTS.LOCATIONS.BY_ID(shop._id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      message.success("Shop deleted successfully");
      setDeleteModalVisible(false);
      router.push("/dashboard/shops");
    } catch (err) {
      console.error("Error deleting shop:", err);
      message.error(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatHours = (hoursObj) => {
    if (!hoursObj) return "Not available";

    return Object.entries(hoursObj)
      .map(([day, hours]) => {
        if (!hours?.open && !hours?.close) return null;
        return (
          <div key={day} className="flex justify-between mb-1">
            <span className="capitalize">{day}:</span>
            <span>
              {(hours?.isClosed ? "Closed" : hours?.open || "Closed") ?? "Closed"} -{" "}
              {hours?.isClosed ? "Closed" : hours?.close || "Closed"}
            </span>
          </div>
        );
      })
      .filter(Boolean);
  };

  if (status === "unauthenticated") {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack} className="mb-4">
          Back to Shops
        </Button>
        <Card className="text-center py-12">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button type="primary" onClick={loadShopBySlug}>
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6">
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack} className="mb-4">
          Back to Shops
        </Button>
        <Card className="text-center py-12">
          <div className="text-gray-500 mb-4">Shop not found.</div>
          <Button type="primary" onClick={handleGoBack}>
            Return to list
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
          Back to Shops
        </Button>
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="bg-blue-500"
          >
            Edit Shop
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
            loading={deleteLoading}
          >
            Delete Shop
          </Button>
        </div>
      </div>

      <Card className="mb-6 shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{shop?.name || "N/A"}</h1>
            <p className="text-gray-500">
              {shop?.displayName || shop?.name || "N/A"}
            </p>
            <div className="mt-2">
              <Tag color={shop?.isActive ? "green" : "red"}>
                {shop?.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Created: {formatDate(shop?.createdAt)}</p>
            <p>Last Updated: {formatDate(shop?.updatedAt)}</p>
          </div>
        </div>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="bg-white p-4 rounded-lg shadow-sm">
        <TabPane tab="Details" key="1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Basic Information" className="shadow-sm">
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Shop Name">
                  {shop.name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Display Name">
                  {shop.displayName || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {shop.description || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Contact Information" className="shadow-sm">
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Phone" labelStyle={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <PhoneOutlined /> {shop.contactInfo?.phone || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email" labelStyle={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MailOutlined /> {shop.contactInfo?.email || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Address" labelStyle={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <HomeOutlined />{" "}
                  {shop.contactInfo
                    ? `${shop.contactInfo.address || ""}${
                        shop.contactInfo.city ? `, ${shop.contactInfo.city}` : ""
                      }${
                        shop.contactInfo.state ? `, ${shop.contactInfo.state}` : ""
                      }${
                        shop.contactInfo.country ? `, ${shop.contactInfo.country}` : ""
                      }`
                    : "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>

          <Card title="Hours of Operation" className="mt-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <ClockCircleOutlined className="mr-2 text-blue-500" />
                  Operating Hours
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  {shop?.hoursOfOperation
                    ? formatHours(shop.hoursOfOperation)
                    : "Not available"}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Closed Dates</h3>
                {shop?.closedDates && shop.closedDates.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {shop.closedDates
                      .map((date) => formatClosedDate(date))
                      .filter(Boolean)
                      .map((formattedDate, index) => (
                        <li key={index}>
                          {formattedDate?.date}: {formattedDate?.description}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No closed dates specified</p>
                )}
              </div>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Primary Contact" key="2">
          <Card className="shadow-sm">
            {shop.primaryContact ? (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Name">
                  {shop.primaryContact.firstName} {shop.primaryContact.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {shop.primaryContact.phone || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {shop.primaryContact.email || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <p className="text-gray-500">
                No primary contact information available
              </p>
            )}
          </Card>
        </TabPane>

        <TabPane tab="Secondary Contact" key="3">
          <Card className="shadow-sm">
            {shop.secondaryContact &&
            (shop.secondaryContact.firstName || shop.secondaryContact.lastName) ? (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Name">
                  {shop.secondaryContact.firstName} {shop.secondaryContact.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {shop.secondaryContact.phone || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {shop.secondaryContact.email || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <p className="text-gray-500">
                No secondary contact information available
              </p>
            )}
          </Card>
        </TabPane>
      </Tabs>

      <AddShop
        open={showEditShop}
        onClose={handleCloseEditModal}
        mode="edit"
        shopData={shop}
        onShopUpdated={async (updatedShop) => {
          const refreshed = await loadShopBySlug();
          const targetShop = updatedShop || refreshed;
          if (targetShop) {
            const nextSlug = buildSlugFromShop(targetShop);
            if (nextSlug && nextSlug !== decodedSlug) {
              router.replace(`/dashboard/shops/${encodeURIComponent(nextSlug)}`);
            }
          }
        }}
      />

      <Modal
        title="Delete Shop"
        open={deleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete this shop? This action cannot be undone.
        </p>
        <p className="font-semibold mt-2">{shop.name}</p>
      </Modal>
    </div>
  );
};

export default ShopDetails;
