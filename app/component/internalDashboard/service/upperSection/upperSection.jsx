"use client";
import { React, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Input, InputNumber, Form, Card, message } from "antd";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";
import { PlusOutlined } from "@ant-design/icons";

function UpperSection({ shopId, onServiceAdded }) {
  const { data: session } = useSession();
  const [showAddForm, setShowAddForm] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const serviceData = {
        ...values,
        shopId,
        active: true, // New services are active by default
        price: parseFloat(values.price),
        duration: parseInt(values.duration),
      };

      await apiCall(API_ENDPOINTS.SERVICES.BASE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(serviceData),
      });

      message.success("Service created successfully");
      form.resetFields();
      setShowAddForm(false);
      if (onServiceAdded) {
        onServiceAdded();
      }
    } catch (error) {
      console.error("Create service error:", error);
      message.error("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500"
        >
          {showAddForm ? "Cancel" : "Add New Service"}
        </Button>
      </div>

      {showAddForm && (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Form.Item
            name="name"
            label="Service Name"
            rules={[{ required: true, message: "Please enter service name" }]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[
              { required: true, message: "Please enter duration" },
              {
                type: "number",
                min: 1,
                message: "Duration must be at least 1 minute",
              },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Enter duration"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[
              { required: true, message: "Please enter price" },
              { type: "number", min: 0, message: "Price cannot be negative" },
            ]}
          >
            <InputNumber
              min={0}
              step={0.01}
              placeholder="Enter price"
              className="w-full"
            />
          </Form.Item>

          <Form.Item className="md:col-span-2 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-500"
            >
              Create Service
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}

export default UpperSection;
