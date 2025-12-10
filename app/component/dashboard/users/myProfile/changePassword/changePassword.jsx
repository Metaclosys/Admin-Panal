"use client";
import { Button, Form, Input } from "antd";
import React from "react";

function ChangePassword({ onClose }) {
  const [form] = Form.useForm();

  const handleChangePassword = (values) => {
    console.log("Password change values:", values);
    onClose();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md w-[480px]">
        <h1 className="text-2xl font-medium text-center text-gray-700 mb-6">
          Change your password
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleChangePassword}
          className="space-y-4"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password className="p-3" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password className="p-3" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password className="p-3" />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#0A2647] h-12 text-white rounded-full hover:bg-[#0A2647]/90"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
