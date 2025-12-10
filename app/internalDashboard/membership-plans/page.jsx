"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Drawer,
  Empty,
  message,
  Spin,
  Tag,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";
import { useShop } from "../../context/ShopContext";
import MembershipPlanCard from "../../component/dashboard/card/membership-card/membershipCard";
import MembershipPlanForm from "../../component/dashboard/membership-plan/MembershipPlanForm/MembershipPlanForm";

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

const InternalMembershipPlansPage = () => {
  const { data: session } = useSession();
  const { currentShopId } = useShop();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("view");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = useCallback(async () => {
    if (!session?.accessToken || !currentShopId) {
      setPlans([]);
      setLoading(false);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(
        API_ENDPOINTS.MEMBERSHIP_PLANS.BY_LOCATION(currentShopId),
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const normalized = Array.isArray(data) ? data : [];
      setPlans(normalized);
      return normalized;
    } catch (err) {
      console.error("Error fetching membership plans:", err);
      const messageText =
        err?.message || "Failed to load membership plans for this location";
      setError(messageText);
      message.error(messageText);
      setPlans([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentShopId, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken && currentShopId) {
      fetchPlans();
    } else {
      setPlans([]);
    }
  }, [session?.accessToken, currentShopId, fetchPlans]);

  useEffect(() => {
    if (!session?.accessToken || !currentShopId) {
      setLocationInfo(null);
      return;
    }

    let isMounted = true;

    const fetchLocation = async () => {
      try {
        setLocationLoading(true);
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BY_ID(currentShopId), {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (isMounted) {
          setLocationInfo(data);
        }
      } catch (err) {
        console.error("Error fetching location information:", err);
        if (isMounted) {
          setLocationInfo(null);
        }
      } finally {
        if (isMounted) {
          setLocationLoading(false);
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, [currentShopId, session?.accessToken]);

  useEffect(() => {
    if (!selectedPlanId) {
      setSelectedPlan(null);
      return;
    }

    const match = plans.find(
      (plan) => (plan._id || plan.id) === selectedPlanId
    );

    if (match) {
      setSelectedPlan(match);
    } else if (drawerOpen) {
      // Plan was removed or is no longer available
      setDrawerOpen(false);
      setDrawerMode("view");
      setSelectedPlanId(null);
      setSelectedPlan(null);
    }
  }, [drawerOpen, plans, selectedPlanId]);

  useEffect(() => {
    setSelectedPlanId(null);
    setSelectedPlan(null);
    setDrawerOpen(false);
    setDrawerMode("view");
  }, [currentShopId]);

  const handleSelectPlan = (plan) => {
    if (!plan) {
      return;
    }

    const id = plan._id || plan.id || null;
    setSelectedPlanId(id);
    setSelectedPlan(plan);
    setDrawerMode("view");
    setDrawerOpen(true);
  };

  const handleEditPlan = (plan) => {
    if (!plan) {
      return;
    }

    const id = plan._id || plan.id || null;
    setSelectedPlanId(id);
    setSelectedPlan(plan);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleRefresh = () => {
    fetchPlans();
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerMode("view");
    setSelectedPlanId(null);
    setSelectedPlan(null);
  };

  const handleEditSuccess = async () => {
    await fetchPlans();
    setDrawerMode("view");
  };

  const discountSummary = useMemo(() => {
    if (!selectedPlan) {
      return "";
    }

    if (selectedPlan.type === "fixed") {
      if (
        selectedPlan.discount === undefined ||
        selectedPlan.discount === null
      ) {
        return "Not configured";
      }

      const limit =
        selectedPlan.maxDiscountLimit !== undefined &&
        selectedPlan.maxDiscountLimit !== null
          ? ` (up to $${formatCurrency(selectedPlan.maxDiscountLimit)})`
          : "";
      return `${selectedPlan.discount}%${limit}`;
    }

    return "See custom discounts below";
  }, [selectedPlan]);

  const renderPlanDetails = () => {
    if (!selectedPlan) {
      return (
        <Empty
          description="Select a membership plan to see its details"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    const tags = Array.isArray(selectedPlan.tags)
      ? selectedPlan.tags.filter(Boolean)
      : [];

    const customDiscounts = Array.isArray(selectedPlan.customDiscounts)
      ? selectedPlan.customDiscounts
      : [];

    return (
      <div className="space-y-4">
        <Descriptions
          column={1}
          bordered
          size="small"
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Plan Name">
            {selectedPlan.name || "Unnamed Plan"}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {selectedPlan?.location?.name ||
              selectedPlan?.location?.displayName ||
              locationInfo?.name ||
              locationInfo?.displayName ||
              "Current location"}
          </Descriptions.Item>
          <Descriptions.Item label="Plan Type">
            {selectedPlan.type ? selectedPlan.type.charAt(0).toUpperCase() + selectedPlan.type.slice(1) : "Fixed"}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${formatCurrency(selectedPlan.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {selectedPlan.durationDays || 0} day
            {Number(selectedPlan.durationDays) === 1 ? "" : "s"}
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {discountSummary}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {selectedPlan.description || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Auto Renew">
            {selectedPlan.autoRenew ? "Enabled" : "Disabled"}
          </Descriptions.Item>
          <Descriptions.Item label="Visible to Customers">
            {selectedPlan.visible === false ? "No" : "Yes"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {selectedPlan.status || (selectedPlan.isActive ? "active" : "inactive")}
          </Descriptions.Item>
        </Descriptions>

        {selectedPlan.type === "custom" && (
          <Card size="small" title="Custom Discounts">
            {customDiscounts.length > 0 ? (
              <div className="space-y-2">
                {customDiscounts.map((discount, index) => {
                  const service = discount.serviceId;
                  const serviceName =
                    service?.name ||
                    service?.serviceName ||
                    discount.serviceName ||
                    "Service";
                  const key =
                    (service?._id ||
                      service?.id ||
                      service ||
                      `service-${index}`) + `-${discount.discount}`;

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {serviceName}
                      </span>
                      <span className="text-gray-500">
                        {discount.discount}%
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No custom discounts configured"
              />
            )}
          </Card>
        )}

        {tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button onClick={handleDrawerClose}>Close</Button>
          <Button type="primary" onClick={() => setDrawerMode("edit")}>
            Edit Plan
          </Button>
        </div>
      </div>
    );
  };

  if (!currentShopId) {
    return (
      <div className="p-4">
        <Alert
          type="info"
          showIcon
          message="Select a shop location"
          description="Choose a shop to manage its membership plans."
        />
      </div>
    );
  }

  const drawerTitle =
    drawerMode === "edit"
      ? `Edit ${selectedPlan?.name || "Membership Plan"}`
      : selectedPlan?.name || "Membership Plan Details";

  const planIdForEdit = selectedPlan?._id || selectedPlan?.id || null;

  return (
    <div className="p-4 space-y-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Membership Plans
            </h2>
            <p className="text-sm text-gray-500">
              {locationLoading
                ? "Loading location information..."
                : `Location: ${
                    locationInfo?.displayName ||
                    locationInfo?.name ||
                    currentShopId
                  }`}
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </div>
      </Card>

      {error && (
        <Alert
          type="error"
          showIcon
          message="Unable to load membership plans"
          description={error}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : plans.length === 0 ? (
        <Empty
          description="No membership plans found for this location"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const planKey = plan._id || plan.id;
            return (
              <MembershipPlanCard
                key={planKey}
                id={planKey}
                plan={plan}
                onSelect={handleSelectPlan}
                onEdit={handleEditPlan}
              />
            );
          })}
        </div>
      )}

      <Drawer
        title={drawerTitle}
        width={drawerMode === "edit" ? 720 : 480}
        onClose={handleDrawerClose}
        open={drawerOpen}
        destroyOnClose={drawerMode === "edit"}
        styles={{ body: { padding: drawerMode === "edit" ? 0 : 24 } }}
      >
        {drawerMode === "edit" && selectedPlan && planIdForEdit ? (
          <MembershipPlanForm
            key={`membership-plan-edit-${planIdForEdit}`}
            planId={planIdForEdit}
            allowLocationEdit={false}
            defaultLocationId={
              selectedPlan?.location?._id ||
              selectedPlan?.location ||
              currentShopId
            }
            onSuccess={handleEditSuccess}
            onCancel={() => setDrawerMode("view")}
          />
        ) : (
          renderPlanDetails()
        )}
      </Drawer>
    </div>
  );
};

export default InternalMembershipPlansPage;
