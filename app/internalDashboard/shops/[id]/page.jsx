"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Spin,
  Alert,
  Descriptions,
  Tag,
} from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  GlobalOutlined,
  DollarCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { apiCall, API_ENDPOINTS } from "../../../api/apiContent/apiContent";

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

const formatHours = (hours) => {
  if (!hours) return null;
  try {
    return Object.entries(hours).map(([day, time]) => ({
      day,
      isClosed: time.isClosed,
      open: time.open || "Closed",
      close: time.close || "Closed",
    }));
  } catch (error) {
    return null;
  }
};

function ShopDashboard({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  // `params` may be a Promise in newer Next.js versions. Resolve it safely
  // inside an effect so we support both sync and async param shapes.
  const [shopId, setShopId] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    ;(async () => {
      try {
        const resolved = await params;
        if (!mounted) return;
        if (resolved && resolved.id) {
          setShopId(decodeURIComponent(resolved.id));
        }
      } catch (err) {
        // If params is not awaitable this will not throw; log any unexpected errors
        console.error('Failed to resolve route params:', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params]);

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShopData = useCallback(async () => {
    if (!shopId || !session?.accessToken) return;

    try {
      setLoading(true);
      setError(null);
      const data = await apiCall(API_ENDPOINTS.LOCATIONS.BY_ID(shopId), {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setShop(data);
    } catch (err) {
      console.error("Error fetching shop:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load shop data"
      );
    } finally {
      setLoading(false);
    }
  }, [shopId, session?.accessToken]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      loadShopData();
    }
  }, [status, loadShopData, router]);

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const handleRetry = () => {
    loadShopData();
  };

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
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="mb-4"
        >
          Back to Dashboard
        </Button>
        <Alert
          type="error"
          message="Unable to load shop"
          description={error}
          showIcon
          className="mb-4"
        />
        <Button type="primary" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="mb-4"
        >
          Back to Dashboard
        </Button>
        <Card className="text-center py-12">
          <div className="text-gray-500 mb-4">Shop not found.</div>
          <Button type="primary" onClick={handleGoBack}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="mb-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              className="mb-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold mb-2">{shop.name || "N/A"}</h1>
            <p className="text-gray-500">
              {shop.displayName || shop.name || "N/A"}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Tag color={shop.isActive ? "green" : "red"}>
                {shop.isActive ? "Active" : "Inactive"}
              </Tag>
              {shop.locationId && (
                <Tag icon={<GlobalOutlined />} color="blue">
                  {shop.locationId}
                </Tag>
              )}
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 space-y-1">
            <p>Created: {formatDate(shop.createdAt)}</p>
            <p>Last Updated: {formatDate(shop.updatedAt)}</p>
          </div>
        </div>
      </Card>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Card title="Contact Information" className="shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={<PhoneOutlined />}>
                {shop.contactInfo?.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={<MailOutlined />}>
                {shop.contactInfo?.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={<HomeOutlined />}>
                {[
                  shop.contactInfo?.address,
                  shop.contactInfo?.city,
                  shop.contactInfo?.state,
                  shop.contactInfo?.country,
                  shop.contactInfo?.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ") || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Primary Contact" className="shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={<UserOutlined />}>
                {[shop.primaryContact?.firstName, shop.primaryContact?.lastName]
                  .filter(Boolean)
                  .join(" ") || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneOutlined />}>
                {shop.primaryContact?.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={<MailOutlined />}>
                {shop.primaryContact?.email || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Card title="Hours of Operation" className="shadow-sm">
            {shop?.hoursOfOperation ? (
              <div className="grid grid-cols-2 gap-4">
                {formatHours(shop.hoursOfOperation)?.map((entry) => (
                  <div key={entry.day} className="bg-gray-50 p-3 rounded text-center">
                    <div className="font-semibold capitalize mb-1">
                      {entry.day}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.isClosed ? "Closed" : `${entry.open} - ${entry.close}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">No hours configured.</div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Quick Stats" className="shadow-sm">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Today's Appointments"
                  value={0}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Active Staff"
                  value={0}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Today's Revenue"
                  value={0}
                  prefix={<DollarOutlined />}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  suffix="USD"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Tax Rate"
                  value={0}
                  prefix={<DollarCircleOutlined />}
                  suffix="%"
                  valueStyle={{ color: "#722ed1" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Closed Dates" className="shadow-sm">
            {shop.closedDates?.length ? (
              <div className="flex flex-wrap gap-2">
                {shop.closedDates.map((date, index) => (
                  <Tag key={index} color="volcano">
                    {formatDate(date.date || date)}
                  </Tag>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">No closed dates set.</div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Recent Activity" className="shadow-sm">
            <div className="h-32 flex items-center justify-center text-gray-500">
              No recent activity.
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ShopDashboard;
