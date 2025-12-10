/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  apiCall,
  API_ENDPOINTS,
} from "../../../../api/apiContent/apiContent";

const { Option } = Select;
const { TextArea } = Input;

const DEFAULT_VALUES = {
  locationId: null,
  name: "",
  description: "",
  type: "fixed",
  price: null,
  durationDays: null,
  discount: null,
  maxDiscountLimit: null,
  customDiscounts: [],
  status: "active",
  autoRenew: false,
  visible: true,
  tags: "",
};

const MembershipPlanForm = ({
  planId: overridePlanId = null,
  allowLocationEdit = true,
  defaultLocationId = null,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const queryPlanId = searchParams.get("planId");
  const planId = overridePlanId ?? queryPlanId;
  const isEditMode = Boolean(planId);

  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  useEffect(() => {
    setPageLoading(Boolean(planId));
  }, [planId]);

  const planType = Form.useWatch("type", form);
  const customDiscounts = Form.useWatch("customDiscounts", form);

  useEffect(() => {
    const initialValues = {
      ...DEFAULT_VALUES,
    };

    if (!isEditMode && defaultLocationId) {
      initialValues.locationId = String(defaultLocationId);
    }

    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [form, defaultLocationId, isEditMode]);

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchServices = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load services", error);
        message.error(error.message || "Unable to load services");
      }
    };

    fetchServices();
  }, [session?.accessToken]);

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchLocations = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load locations", error);
        message.error(error.message || "Unable to load locations");
      }
    };

    fetchLocations();
  }, [session?.accessToken]);

  useEffect(() => {
    if (!isEditMode || !session?.accessToken || !planId) {
      setPageLoading(false);
      return;
    }

    let isMounted = true;
    setPageLoading(true);

    const fetchPlan = async () => {
      try {
        const plan = await apiCall(API_ENDPOINTS.MEMBERSHIP_PLANS.BY_ID(planId), {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!isMounted) {
          return;
        }

        const resolvedLocationId =
          plan?.location?._id ??
          plan?.location?.id ??
          (typeof plan?.location === "string" ? plan.location : null) ??
          plan?.locationId ??
          null;

        const normalized = {
          locationId:
            resolvedLocationId !== null && resolvedLocationId !== undefined
              ? String(resolvedLocationId)
              : null,
          name: plan.name ?? "",
          description: plan.description ?? "",
          type: plan.type ?? "fixed",
          price: plan.price ?? null,
          durationDays: plan.durationDays ?? null,
          discount: plan.discount ?? null,
          maxDiscountLimit: plan.maxDiscountLimit ?? null,
          customDiscounts: Array.isArray(plan.customDiscounts)
            ? plan.customDiscounts.map((item) => ({
                serviceId:
                  item.serviceId?._id ||
                  item.serviceId?.id ||
                  item.serviceId ||
                  "",
                discount: item.discount ?? null,
              }))
            : [],
          status: plan.status ?? (plan.isActive ? "active" : "inactive"),
          autoRenew: Boolean(plan.autoRenew),
          visible: plan.visible !== undefined ? Boolean(plan.visible) : true,
          tags: Array.isArray(plan.tags) ? plan.tags.join(", ") : "",
        };

        form.setFieldsValue(normalized);
      } catch (error) {
        console.error("Failed to load membership plan", error);
        message.error(error.message || "Unable to load membership plan");
        if (overridePlanId === null) {
          router.push("/dashboard/membership-plan");
        }
      } finally {
        if (isMounted) {
          setPageLoading(false);
        }
      }
    };

    fetchPlan();

    return () => {
      isMounted = false;
    };
  }, [form, isEditMode, overridePlanId, planId, router, session?.accessToken]);

  useEffect(() => {
    if (planType === "fixed") {
      form.setFieldsValue({ customDiscounts: [] });
    }
  }, [planType]);

  const selectedServiceIds = useMemo(() => {
    if (!Array.isArray(customDiscounts)) {
      return [];
    }
    return customDiscounts
      .map((entry) => entry?.serviceId)
      .filter(Boolean)
      .map(String);
  }, [customDiscounts]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    router.push("/dashboard/membership-plan");
  };

  const handleSubmit = async (values) => {
    if (!session?.accessToken) {
      message.error("No access token available");
      return;
    }

    try {
      if (!values.locationId) {
        message.error("Select a location for this membership plan");
        return;
      }

      setLoading(true);
      const payload = {
        locationId: String(values.locationId),
        name: values.name?.trim() || "",
        description: values.description?.trim() || "",
        type: values.type,
        price: Number(values.price),
        durationDays: Number(values.durationDays),
        discount:
          values.type === "fixed" && values.discount !== null
            ? Number(values.discount)
            : undefined,
        maxDiscountLimit:
          values.maxDiscountLimit !== null && values.maxDiscountLimit !== undefined
            ? Number(values.maxDiscountLimit)
            : undefined,
        customDiscounts:
          values.type === "custom"
            ? (values.customDiscounts || []).map((row) => ({
                serviceId: row.serviceId,
                discount: Number(row.discount),
              }))
            : [],
        autoRenew: Boolean(values.autoRenew),
        visible: Boolean(values.visible),
        status: values.status,
        tags: values.tags
          ? values.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      };

      if (payload.type === "custom") {
        if (payload.customDiscounts.length === 0) {
          message.error(
            "Add at least one service discount when using custom plan type"
          );
          setLoading(false);
          return;
        }
        delete payload.discount;
      }

      const endpoint = isEditMode
        ? API_ENDPOINTS.MEMBERSHIP_PLANS.BY_ID(planId)
        : API_ENDPOINTS.MEMBERSHIP_PLANS.BASE;
      const method = isEditMode ? "PUT" : "POST";

      await apiCall(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      message.success(
        isEditMode
          ? "Membership plan updated successfully"
          : "Membership plan created successfully"
      );
      if (onSuccess) {
        await onSuccess();
      } else {
        router.push("/dashboard/membership-plan");
      }
    } catch (error) {
      console.error("Failed to save membership plan", error);
      message.error(error.message || "Failed to save membership plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card
        title={isEditMode ? "Edit Membership Plan" : "Add New Membership Plan"}
        className="max-w-5xl mx-auto"
        loading={pageLoading}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={DEFAULT_VALUES}
          onFinish={handleSubmit}
        >
          <section className="space-y-6">
            <Card type="inner" title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Plan Name"
                  name="name"
                  rules={[
                    { required: true, message: "Plan name is required" },
                    {
                      max: 100,
                      message: "Plan name must be at most 100 characters",
                    },
                  ]}
                >
                  <Input placeholder="e.g. Silver Membership" />
                </Form.Item>

                <Form.Item
                  label="Plan Type"
                  name="type"
                  rules={[{ required: true, message: "Select a plan type" }]}
                >
                  <Select
                    options={[
                      { label: "Fixed Discount", value: "fixed" },
                      { label: "Custom per Service", value: "custom" },
                    ]}
                  />
                </Form.Item>

      <Form.Item
        label="Location"
        name="locationId"
        rules={[{ required: true, message: "Select a location" }]}
        extra={
          !allowLocationEdit
            ? "Location is managed by head office and cannot be changed here."
            : undefined
        }
      >
        <Select
          placeholder="Select location"
          loading={!locations.length && pageLoading}
          disabled={!allowLocationEdit || locations.length === 0}
          allowClear={allowLocationEdit}
          showSearch
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {locations.map((location) => {
                      const rawId =
                        location._id ?? location.id ?? location.locationId ?? null;
                      const id =
                        rawId !== null && rawId !== undefined ? String(rawId) : "";
                      return (
                        <Option
                          key={id}
                          value={id}
                          label={location.name || location.displayName || "Location"}
                        >
                          {location.name || location.displayName || "Location"}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  className="md:col-span-2"
                  rules={[
                    {
                      max: 500,
                      message: "Description must be at most 500 characters",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Short summary about the membership benefits"
                  />
                </Form.Item>
              </div>
            </Card>

            <Card type="inner" title="Pricing & Duration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Price ($)"
                  name="price"
                  rules={[{ required: true, message: "Enter membership price" }]}
                >
                  <InputNumber
                    min={0}
                    step={1}
                    className="w-full"
                    placeholder="Price in dollars"
                  />
                </Form.Item>

                <Form.Item
                  label="Duration (Days)"
                  name="durationDays"
                  rules={[
                    { required: true, message: "Enter duration in days" },
                    {
                      type: "number",
                      min: 1,
                      message: "Duration must be at least 1 day",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    step={1}
                    className="w-full"
                    placeholder="Number of days"
                  />
                </Form.Item>

                {planType === "fixed" && (
                  <Form.Item
                    label="Discount (%)"
                    name="discount"
                    rules={[
                      { required: true, message: "Enter discount percentage" },
                      {
                        type: "number",
                        min: 0,
                        max: 100,
                        message: "Discount must be between 0 and 100",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                      placeholder="Discount percentage"
                    />
                  </Form.Item>
                )}

                <Form.Item
                  label="Max Discount Limit ($)"
                  name="maxDiscountLimit"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      message: "Max discount limit cannot be negative",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={1}
                    className="w-full"
                    placeholder="Optional cap per booking"
                  />
                </Form.Item>
              </div>
            </Card>

            {planType === "custom" && (
              <Card type="inner" title="Custom Discounts">
                <Form.List name="customDiscounts">
                  {(fields, { add, remove }) => (
                    <div className="space-y-4">
                      {fields.map((field, index) => {
                        const currentValue =
                          form.getFieldValue([
                            "customDiscounts",
                            field.name,
                            "serviceId",
                          ]) || "";

                        return (
                          <Space
                            key={field.key}
                            align="baseline"
                            className="w-full flex"
                          >
                            <Form.Item
                              name={[field.name, "serviceId"]}
                              fieldKey={[field.fieldKey, "serviceId"]}
                              label={index === 0 ? "Service" : ""}
                              rules={[
                                {
                                  required: true,
                                  message: "Select a service",
                                },
                              ]}
                              className="flex-1"
                            >
                              <Select
                                showSearch
                                placeholder="Select service"
                                optionFilterProp="label"
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {services.map((service) => {
                                  const id =
                                    service._id || service.id || service.value;
                                  const disabled =
                                    currentValue !== id &&
                                    selectedServiceIds.includes(String(id));

                                  return (
                                    <Option
                                      key={id}
                                      value={id}
                                      label={service.name || "Unnamed Service"}
                                      disabled={disabled}
                                    >
                                      {service.name || "Unnamed Service"}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              name={[field.name, "discount"]}
                              fieldKey={[field.fieldKey, "discount"]}
                              label={index === 0 ? "Discount (%)" : ""}
                              rules={[
                                {
                                  required: true,
                                  message: "Enter discount percentage",
                                },
                                {
                                  type: "number",
                                  min: 0,
                                  max: 100,
                                  message: "Discount must be between 0 and 100",
                                },
                              ]}
                              className="w-48"
                            >
                              <InputNumber
                                min={0}
                                max={100}
                                step={1}
                                className="w-full"
                                placeholder="0"
                              />
                            </Form.Item>

                            <Button
                              type="text"
                              danger
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        );
                      })}

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                        disabled={services.length === 0}
                      >
                        Add Service Discount
                      </Button>

                      {services.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No services available. Create services before assigning custom
                          discounts.
                        </p>
                      )}
                    </div>
                  )}
                </Form.List>
              </Card>
            )}

            <Card type="inner" title="Additional Settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  tooltip="Use comma to separate multiple tags"
                >
                  <Input placeholder="e.g. popular, recommended" />
                </Form.Item>

                <Form.Item
                  label="Auto Renew"
                  name="autoRenew"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="Visible to Customers"
                  name="visible"
                  valuePropName="checked"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </Card>
          </section>

          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={handleCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {isEditMode ? "Save Changes" : "Save Plan"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default MembershipPlanForm;
