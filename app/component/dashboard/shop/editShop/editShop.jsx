"use client";
import { Button, Form, Input, Select } from "antd";
import React from "react";

function EditShop({ onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Shop details:", values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-[800px] h-[800px] overflow-y-auto">
        <Button
          onClick={onClose}
          shape="circle"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </Button>

        <h1 className="text-2xl font-medium text-gray-700 mb-6">
          Edit Shop Information
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <h2 className="text-lg font-medium mb-4 text-[var(--bgBright)]">
            Shop Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Shop Name"
              name="shopName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Shop Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Shop Display Name"
              name="shopDisplayName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Shop Display Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Postal Code" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Street Address" className="p-2" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Karachi" className="p-2" />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Pakistan" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Pakistan" className="p-2" />
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Write Description"
              className="p-2"
            />
          </Form.Item>

          <h2 className="text-lg font-medium mb-4 text-[var(--bgBright)]">
            Primary Contact
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter First Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Last Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="contactPhone"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Email" className="p-2" />
            </Form.Item>
          </div>

          <h2 className="text-lg font-medium mb-4 text-[var(--bgBright)]">
            Secondary Contact
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter First Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Last Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="contactPhone"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter Email" className="p-2" />
            </Form.Item>
          </div>

          <h2 className="text-lg font-medium mb-4 text-[var(--bgBright)]">
            Hours Of Operation
          </h2>

          <Form.Item label="Week" name="week">
            <Select placeholder="- Select Week -" className="w-48" />
          </Form.Item>

          <div className="space-y-3">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <span className="text-gray-600">{day}</span>
                <Form.Item name={`${day.toLowerCase()}Open`} noStyle>
                  <Select className="w-full">
                    {[...Array(24)].map((_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      return (
                        <Select.Option key={`${hour}:00`} value={`${hour}:00`}>
                          {`${hour}:00`}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name={`${day.toLowerCase()}Close`} noStyle>
                  <Select className="w-full">
                    {[...Array(24)].map((_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      return (
                        <Select.Option key={`${hour}:00`} value={`${hour}:00`}>
                          {`${hour}:00`}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-medium mb-4 text-[var(--bgBright)]">
            Closed Dates
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg">
              <div className="col-span-4">
                <Form.Item name="closedDate" noStyle>
                  <Input type="date" className="w-full p-2" />
                </Form.Item>
              </div>
              <div className="col-span-6">
                <Form.Item name="closedDescription" noStyle>
                  <Input placeholder="Description" className="w-full p-2" />
                </Form.Item>
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <Button type="link" className="text-blue-600">
                  Save
                </Button>
                <Button type="link" danger>
                  Delete
                </Button>
              </div>
            </div>
            <Button
              type="dashed"
              className="w-full"
              icon={<span className="mr-2">+</span>}
            >
              Add Closed Date
            </Button>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="bg-[var(--bgDark)]"
            >
              Save Shop
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditShop;
