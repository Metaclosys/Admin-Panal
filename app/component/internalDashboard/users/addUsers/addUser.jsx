"use client";
import { Button, Form, Input, Select, Checkbox, Radio } from "antd";
import React from "react";

function AddUser({ onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("User details:", values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-[800px] h-[800px] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h1 className="text-[22px] font-medium text-gray-800 mb-8">
          Add a New User
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6"
        >
          {/* First row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input placeholder="Enter First Name" className="py-2.5" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input placeholder="Enter Last Name" className="py-2.5" />
            </Form.Item>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Invalid email" },
              ]}
              className="mb-0"
            >
              <Input placeholder="abc@123gmail.com" className="py-2.5" />
            </Form.Item>

            {/* Roles moved to right side */}
            <Form.Item
              label="Roles"
              name="roles"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Checkbox.Group className="grid grid-cols-2 gap-y-3">
                <Checkbox value="admin">Admin</Checkbox>
                <Checkbox value="staff">Staff</Checkbox>
                <Checkbox value="documentManager">Document Manager</Checkbox>
                <Checkbox value="franchise">Franchise</Checkbox>
                <Checkbox value="marketing">Marketing</Checkbox>
                <Checkbox value="products">Products</Checkbox>
                <Checkbox value="reporting">Reporting</Checkbox>
                <Checkbox value="userManager">User Manager</Checkbox>
                <Checkbox value="reservationist">Reservationist</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>

          {/* Third row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Select placeholder="Select Status" className="py-0">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Fourth row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="Employee"
              name="employee"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Select placeholder="Select One" className="py-0">
                <Select.Option value="emp1">Employee 1</Select.Option>
                <Select.Option value="emp2">Employee 2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Select
                placeholder="Select Type"
                className="py-1"
                defaultValue="location"
              >
                <Select.Option value="location">Location User</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Separator line */}
          <div className="border-b border-gray-400 my-6"></div>

          {/* Fifth row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input placeholder="Enter Username" className="py-2.5" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input.Password className="py-2.5" />
            </Form.Item>
          </div>

          {/* Sixth row */}
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label="Re-type Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
              className="mb-0"
            >
              <Input.Password className="py-2.5" />
            </Form.Item>

            {/* Universal Login */}
            <Form.Item
              label="Allow Universal Login"
              name="universalLogin"
              rules={[{ required: true, message: "Required" }]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Password Change Checkbox */}
            <Form.Item name="mustChangePassword" valuePropName="checked">
              <Checkbox>User must change password next login</Checkbox>
            </Form.Item>
          </div>
          {/* Submit Button */}
          <Form.Item className="flex justify-end mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#0F172A] rounded-full px-6 py-2.5 h-auto"
            >
              Add User to List
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddUser;
