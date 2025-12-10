"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../api/apiContent/apiContent";

const normalizeNumber = (value, fallback = null) => {
  if (value === "" || value === null || value === undefined) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const buildServiceFormValues = (service = {}) => ({
  name: service?.name ?? "",
  category: service?.category ?? "",
  subcategory: service?.subcategory ?? service?.subCategory ?? "",
  price: normalizeNumber(service?.price, null),
  discount: normalizeNumber(service?.discount, 0),
  description: service?.description ?? "",
});

const requiredLabel = (label) => (
  <span className="text-sm font-medium">
    <span className="mr-1 text-red-500">*</span>
    {label}
  </span>
);

const optionalLabel = (label) => <span className="text-sm font-medium">{label}</span>;

const EditService = ({ serviceId, service, open, onClose, onUpdated }) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (service) {
      form.setFieldsValue(buildServiceFormValues(service));
    }
  }, [open, service, form]);

  useEffect(() => {
    if (!open || !serviceId) {
      return;
    }

    let isMounted = true;

    const fetchService = async () => {
      try {
        setLoading(true);

        const accessToken = session?.accessToken || getAccessToken();
        const headers = accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined;

        const data = await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
          headers,
        });

        if (isMounted && data) {
          form.setFieldsValue(buildServiceFormValues(data));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load service", error);
          message.error(error.message || "Failed to load service details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchService();

    return () => {
      isMounted = false;
    };
  }, [open, serviceId, session?.accessToken, form]);

  const handleSubmit = async (values) => {
    if (!serviceId) {
      message.error("Missing service identifier");
      return;
    }

    const accessToken = session?.accessToken || getAccessToken();
    if (!accessToken) {
      message.error("Missing access token");
      return;
    }

    try {
      setSaving(true);
      await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...values,
          price: normalizeNumber(values.price, null),
          discount: normalizeNumber(values.discount, 0),
          subcategory: values.subcategory || "",
        }),
      });

      message.success("Service updated successfully");
      onUpdated?.();
      form.resetFields();
      onClose?.();
    } catch (error) {
      console.error("Failed to update service", error);
      message.error(error.message || "Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal
      title="Edit Service"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={780}
      destroyOnClose
      maskClosable={false}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={saving}
        className="pt-2"
      >
        {loading && (
          <div className="mb-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Loading service details...
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Form.Item
            name="name"
            label={requiredLabel("Service Name")}
            rules={[{ required: true, message: "Please enter a service name" }]}
            className="mb-0"
          >
            <Input placeholder="Enter service name" className="h-10 rounded-md" />
          </Form.Item>

          <Form.Item
            name="category"
            label={requiredLabel("Category")}
            rules={[{ required: true, message: "Please enter a category" }]}
            className="mb-0"
          >
            <Input placeholder="Enter category" className="h-10 rounded-md" />
          </Form.Item>

          <Form.Item
            name="subcategory"
            label={optionalLabel("Subcategory")}
            className="mb-0"
          >
            <Input placeholder="Enter subcategory" className="h-10 rounded-md" />
          </Form.Item>


          <Form.Item
            name="price"
            label={requiredLabel("Price ($)")}
            rules={[{ required: true, message: "Please enter a price" }]}
            className="mb-0"
          >
            <InputNumber
              className="h-10 w-full rounded-md"
              min={0}
              step={1}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="discount"
            label={optionalLabel("Discount (%)")}
            className="mb-0"
          >
            <InputNumber
              className="h-10 w-full rounded-md"
              min={0}
              max={100}
              step={1}
              placeholder="Enter discount"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label={optionalLabel("Description")}
          className="mt-6"
        >
          <Input.TextArea rows={3} placeholder="Optional description" className="rounded-md" />
        </Form.Item>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={handleCancel} className="h-auto rounded-full border px-5 py-2">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            className="h-auto rounded-full bg-blue-600 px-5 py-2 font-medium"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditService;



