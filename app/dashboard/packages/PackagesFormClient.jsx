"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text } = Typography;

const createDefaultItem = () => ({
  serviceId: undefined,
  quantity: 1,
  freeQuantity: 0,
  unitPrice: undefined,
});

const DEFAULT_VALUES = {
  name: "",
  type: "",
  sku: "",
  barcode: "",
  description: "",
  highlightBadge: "",
  locationId: undefined,
  bookingDates: [],
  validityRange: [],
  validityDuration: undefined,
  allowOnlinePurchase: true,
  visible: true,
  status: "active",
  eligibility: "all",
  packagePrice: undefined,
  originalValue: undefined,
  discountAmount: 0,
  discountType: "none",
  tags: [],
  items: [createDefaultItem()],
};

const extractId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  return (
    value._id ??
    value.id ??
    value.serviceId ??
    value.locationId ??
    value.value ??
    null
  );
};

const toDayjs = (value) => {
  if (!value) return null;
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

const mapServices = (list = []) =>
  list.reduce((acc, service) => {
    const id = extractId(service);
    if (!id) {
      return acc;
    }
    acc[id] = {
      id,
      name: service.name ?? "Unnamed Service",
      price: Number(service.price ?? service.unitPrice ?? 0) || 0,
    };
    return acc;
  }, {});

export default function PackagesFormClient({
  packageId = null,
  allowLocationEdit = true,
  defaultLocationId = null,
  accessToken,
  initialLocations = [],
  initialServices = [],
  initialPackageData = null,
  initialErrors = {},
}) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [locations] = useState(initialLocations);
  const [services, setServices] = useState(initialServices);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [serviceError, setServiceError] = useState(initialErrors?.services);
  const [submitting, setSubmitting] = useState(false);

  const serviceMap = useMemo(() => mapServices(services), [services]);
  const initialServiceMap = useMemo(
    () => mapServices(initialServices),
    [initialServices]
  );

  const initialValues = useMemo(() => {
    const base = {
      ...DEFAULT_VALUES,
      locationId: defaultLocationId ?? undefined,
    };

    if (initialPackageData) {
      base.name = initialPackageData.name ?? "";
      base.type = initialPackageData.type ?? "";
      base.sku = initialPackageData.sku ?? "";
      base.barcode = initialPackageData.barcode ?? "";
      base.description = initialPackageData.description ?? "";
      base.highlightBadge = initialPackageData.highlightBadge ?? "";
      base.locationId =
        extractId(initialPackageData.location) ??
        extractId(initialPackageData.locationId) ??
        base.locationId;
      base.allowOnlinePurchase =
        initialPackageData.allowOnlinePurchase ??
        initialPackageData.allowOnlineBooking ??
        true;
      base.visible = initialPackageData.visible ?? true;
      base.status = initialPackageData.status ?? "active";
      base.eligibility = initialPackageData.eligibility ?? "all";
      base.packagePrice = initialPackageData.packagePrice ?? initialPackageData.price ?? undefined;
      base.originalValue = initialPackageData.originalValue ?? undefined;
      base.discountAmount = initialPackageData.discountAmount ?? 0;
      base.discountType = initialPackageData.discountType ?? "none";
      base.tags = Array.isArray(initialPackageData.tags)
        ? initialPackageData.tags
        : [];
      base.bookingDates = Array.isArray(initialPackageData.bookingDates)
        ? initialPackageData.bookingDates
            .map((date) => toDayjs(date))
            .filter(Boolean)
        : [];
      const validityStart =
        initialPackageData.validity?.startDate ??
        initialPackageData.validity?.start;
      const validityEnd =
        initialPackageData.validity?.endDate ??
        initialPackageData.validity?.end;
      base.validityRange = [toDayjs(validityStart), toDayjs(validityEnd)];
      base.validityDuration =
        initialPackageData.validity?.durationInDays ??
        initialPackageData.durationDays ??
        undefined;
      const incomingItems = Array.isArray(initialPackageData.items)
        ? initialPackageData.items
        : [];
      if (incomingItems.length) {
        base.items = incomingItems.map((item) => ({
          serviceId: extractId(item.serviceId ?? item.service),
          quantity: item.quantity ?? 1,
          freeQuantity: item.freeQuantity ?? 0,
          unitPrice:
            typeof item.unitPrice === "number"
              ? item.unitPrice
              : initialServiceMap[extractId(item.serviceId)]?.price ?? undefined,
        }));
      }
    }

    if (!base.items?.length) {
      base.items = [createDefaultItem()];
    }

    return base;
  }, [defaultLocationId, initialPackageData, initialServiceMap]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const fetchServicesForLocation = useCallback(
    async (locationId) => {
      if (!locationId || !accessToken) {
        setServices([]);
        return;
      }

      try {
        setServicesLoading(true);
        setServiceError(null);
        const data = await apiCall(
          `${API_ENDPOINTS.SERVICES.BASE}?locationId=${encodeURIComponent(
            locationId
          )}`,
          { accessToken }
        );
        const list = Array.isArray(data) ? data : data?.data;
        setServices(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Failed to load services", error);
        setServiceError(
          error instanceof Error ? error.message : "Failed to load services."
        );
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    },
    [accessToken]
  );

  const handleLocationChange = useCallback(
    (value) => {
      form.setFieldsValue({
        locationId: value,
        items: [createDefaultItem()],
      });
      if (value) {
        fetchServicesForLocation(value);
      } else {
        setServices([]);
      }
    },
    [fetchServicesForLocation, form]
  );

  const handleServiceChange = useCallback(
    (serviceId, index) => {
      const currentItems = form.getFieldValue("items") || [];
      const nextItems = [...currentItems];
      const target = { ...(nextItems[index] ?? createDefaultItem()) };
      target.serviceId = serviceId;
      const service = serviceMap[serviceId];
      if (service && Number.isFinite(service.price)) {
        target.unitPrice = service.price;
        if (!target.quantity) {
          target.quantity = 1;
        }
      }
      nextItems[index] = target;
      form.setFieldsValue({ items: nextItems });
    },
    [form, serviceMap]
  );

  const buildPayload = useCallback(
    (values) => {
      const bookingDates =
        Array.isArray(values.bookingDates) && values.bookingDates.length === 2
          ? values.bookingDates.map((date) => date?.toDate()).filter(Boolean)
          : undefined;

      const validityRange =
        Array.isArray(values.validityRange) && values.validityRange.length === 2
          ? values.validityRange
          : [];

      const payload = {
        name: values.name?.trim(),
        type: values.type?.trim() || undefined,
        sku: values.sku?.trim() || undefined,
        barcode: values.barcode?.trim() || undefined,
        description: values.description?.trim() || undefined,
        locationId: values.locationId,
        allowOnlinePurchase: Boolean(values.allowOnlinePurchase),
        visible: Boolean(values.visible),
        status: values.status || "active",
        eligibility: values.eligibility || "all",
        packagePrice: Number(values.packagePrice),
        originalValue: values.originalValue
          ? Number(values.originalValue)
          : undefined,
        discountAmount: values.discountAmount
          ? Number(values.discountAmount)
          : 0,
        discountType: values.discountType || "none",
        highlightBadge: values.highlightBadge?.trim() || undefined,
        tags: Array.isArray(values.tags)
          ? values.tags.filter((tag) => Boolean(tag?.trim()))
          : undefined,
        bookingDates,
        validity: {
          ...(validityRange[0]
            ? { startDate: validityRange[0].toDate() }
            : {}),
          ...(validityRange[1]
            ? { endDate: validityRange[1].toDate() }
            : {}),
          ...(values.validityDuration
            ? { durationInDays: Number(values.validityDuration) }
            : {}),
        },
        items: (values.items || [])
          .filter((item) => item?.serviceId)
          .map((item) => ({
            serviceId: item.serviceId,
            quantity: Number(item.quantity) || 1,
            freeQuantity: Number(item.freeQuantity) || 0,
            unitPrice: item.unitPrice ? Number(item.unitPrice) : undefined,
          })),
      };

      if (!payload.items.length) {
        throw new Error("At least one service is required.");
      }
      if (!payload.packagePrice && payload.packagePrice !== 0) {
        throw new Error("Package price is required.");
      }

      return payload;
    },
    []
  );

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const payload = buildPayload(values);
        setSubmitting(true);
        const endpoint = packageId
          ? API_ENDPOINTS.PACKAGES.BY_ID(packageId)
          : API_ENDPOINTS.PACKAGES.BASE;
        await apiCall(endpoint, {
          method: packageId ? "PATCH" : "POST",
          body: JSON.stringify(payload),
          accessToken,
        });
        message.success(
          packageId ? "Package updated successfully" : "Package created successfully"
        );
        router.push("/dashboard/packages");
      } catch (error) {
        console.error("Failed to submit package", error);
        message.error(
          error instanceof Error ? error.message : "Failed to save package"
        );
      } finally {
        setSubmitting(false);
      }
    },
    [accessToken, buildPayload, packageId, router]
  );

  return (
    <Card className="max-w-5xl mx-auto my-6" bordered={false}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <Title level={3} className="!mb-0">
          {packageId ? "Edit Package" : "Create Package"}
        </Title>
        <Space>
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button
            type="primary"
            loading={submitting}
            onClick={() => form.submit()}
          >
            {packageId ? "Update Package" : "Create Package"}
          </Button>
        </Space>
      </div>

      {initialErrors?.locations && (
        <Alert
          type="error"
          showIcon
          className="mb-3"
          message={initialErrors.locations}
        />
      )}
      {initialErrors?.package && (
        <Alert
          type="error"
          showIcon
          className="mb-3"
          message={initialErrors.package}
        />
      )}
      {serviceError && (
        <Alert type="warning" showIcon className="mb-3" message={serviceError} />
      )}

      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Card bordered={false} className="mb-4 shadow-sm">
          <Title level={4}>Basic Information</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Package Name"
              name="name"
              rules={[
                { required: true, message: "Package name is required" },
              ]}
            >
              <Input placeholder="e.g. Haircut Saver" />
            </Form.Item>
            <Form.Item label="Location" name="locationId" rules={[{ required: true, message: "Location is required" }]}>
              <Select
                placeholder="Select location"
                disabled={!allowLocationEdit}
                onChange={handleLocationChange}
                options={locations.map((location) => ({
                  value: extractId(location),
                  label: location.name ?? "Untitled Location",
                }))}
              />
            </Form.Item>
            <Form.Item label="Package Type" name="type">
              <Input placeholder="Standard" />
            </Form.Item>
            <Form.Item label="SKU" name="sku">
              <Input placeholder="SKU-123" />
            </Form.Item>
            <Form.Item label="Barcode" name="barcode">
              <Input placeholder="Optional barcode" />
            </Form.Item>
            <Form.Item label="Highlight Badge" name="highlightBadge">
              <Input placeholder="Popular, Staff Pick, etc." />
            </Form.Item>
          </div>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Describe the package" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Booking Dates" name="bookingDates">
              <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Validity" name="validityRange">
              <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Validity Duration (days)" name="validityDuration">
              <InputNumber className="w-full" min={1} />
            </Form.Item>
          </div>
        </Card>

        <Card bordered={false} className="mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Title level={4} className="!mb-0">
              Services
            </Title>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                const items = form.getFieldValue("items") || [];
                form.setFieldsValue({
                  items: [...items, createDefaultItem()],
                });
              }}
            >
              Add Service
            </Button>
          </div>
          {servicesLoading && (
            <div className="mb-3">
              <Spin />
              <Text className="ml-2">Loading services for this location…</Text>
            </div>
          )}
          <Form.List name="items">
            {(fields, { remove }) => (
              <Space direction="vertical" className="w-full">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    type="inner"
                    title={`Service ${index + 1}`}
                    extra={
                      fields.length > 1 ? (
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      ) : null
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...restField}
                        label="Service"
                        name={[name, "serviceId"]}
                        rules={[
                          { required: true, message: "Service is required" },
                        ]}
                      >
                        <Select
                          placeholder="Select service"
                          showSearch
                          optionFilterProp="label"
                          options={services.map((service) => ({
                            value: extractId(service),
                            label: service.name ?? "Unnamed Service",
                          }))}
                          onChange={(value) => handleServiceChange(value, index)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Quantity"
                        name={[name, "quantity"]}
                        rules={[
                          { required: true, message: "Quantity is required" },
                        ]}
                      >
                        <InputNumber className="w-full" min={1} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Free Quantity"
                        name={[name, "freeQuantity"]}
                      >
                        <InputNumber className="w-full" min={0} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Unit Price ($)"
                        name={[name, "unitPrice"]}
                      >
                        <InputNumber
                          className="w-full"
                          min={0}
                          formatter={(value) =>
                            typeof value === "number"
                              ? value.toFixed(2)
                              : value
                          }
                        />
                      </Form.Item>
                    </div>
                  </Card>
                ))}
              </Space>
            )}
          </Form.List>
        </Card>

        <Card bordered={false} className="mb-4 shadow-sm">
          <Title level={4}>Pricing & Visibility</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Package Price ($)"
              name="packagePrice"
              rules={[{ required: true, message: "Package price is required" }]}
            >
              <InputNumber className="w-full" min={0} />
            </Form.Item>
            <Form.Item label="Original Value ($)" name="originalValue">
              <InputNumber className="w-full" min={0} />
            </Form.Item>
            <Form.Item label="Discount Amount ($)" name="discountAmount">
              <InputNumber className="w-full" min={0} />
            </Form.Item>
            <Form.Item label="Discount Type" name="discountType">
              <Select
                options={[
                  { label: "None", value: "none" },
                  { label: "Amount", value: "amount" },
                  { label: "Percentage", value: "percentage" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Eligibility" name="eligibility">
              <Select
                options={[
                  { label: "All customers", value: "all" },
                  { label: "Members only", value: "members" },
                  { label: "New customers", value: "new" },
                  { label: "Custom", value: "custom" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Select
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Tags"
              name="tags"
              extra="Press enter after each tag"
            >
              <Select
                mode="tags"
                tokenSeparators={[","]}
                options={[]}
                placeholder="Add descriptive tags"
              />
            </Form.Item>
          </div>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="allowOnlinePurchase"
              valuePropName="checked"
              label="Allow Online Purchase"
            >
              <Checkbox>Customers can buy online</Checkbox>
            </Form.Item>
            <Form.Item name="visible" valuePropName="checked" label="Visible">
              <Checkbox>Show in booking channels</Checkbox>
            </Form.Item>
          </div>
        </Card>
      </Form>
    </Card>
  );
}
