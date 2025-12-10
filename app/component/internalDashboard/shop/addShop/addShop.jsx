"use client";
import { Button, Form, Input, Select } from "antd";
import React from "react";

function AddShop({ onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Shop details:", values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-[#0F172A]">
              Add New Shop
            </h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to create a new shop
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-6"
          >
            {/* Shop Details Section */}
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
                Shop Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="text-gray-700">Shop Name</span>}
                  name="shopName"
                  rules={[{ required: true, message: "Shop name is required" }]}
                >
                  <Input
                    placeholder="Enter Shop Name"
                    className="p-2 rounded-md border-gray-300 hover:border-gray-400 focus:border-[#0F172A] transition-colors"
                  />
                </Form.Item>

                <Form.Item
                  label="Shop Display Name"
                  name="shopDisplayName"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    placeholder="Enter Shop Display Name"
                    className="p-2"
                  />
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

              <Form.Item
                label={<span className="text-gray-700">Description</span>}
                name="description"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Write a brief description of your shop"
                  className="p-2 rounded-md border-gray-300 hover:border-gray-400 focus:border-[#0F172A] transition-colors"
                />
              </Form.Item>
            </div>
            <hr className="border-gray-500 " />
            {/* Contact Sections */}
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
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
            </div>

            <hr className="border-gray-500 " />

            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
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
            </div>

            <hr className="border-gray-500 " />

            {/* Hours Section */}
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
                Hours Of Operation
              </h2>

              <div className="space-y-4">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="grid grid-cols-3 gap-4 items-center"
                  >
                    <span className="text-gray-600 font-medium">{day}</span>
                    <Form.Item name={`${day.toLowerCase()}Open`} noStyle>
                      <Select
                        className="w-full"
                        placeholder="Opening Time"
                        dropdownClassName="rounded-md"
                      >
                        {[...Array(24)].map((_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <Select.Option
                              key={`${hour}:00`}
                              value={`${hour}:00`}
                            >
                              {`${hour}:00`}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item name={`${day.toLowerCase()}Close`} noStyle>
                      <Select
                        className="w-full"
                        placeholder="Closing Time"
                        dropdownClassName="rounded-md"
                      >
                        {[...Array(24)].map((_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <Select.Option
                              key={`${hour}:00`}
                              value={`${hour}:00`}
                            >
                              {`${hour}:00`}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-500 " />

            {/* Closed Dates Section */}
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
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
            </div>

            {/* Form Actions */}
            <div className="sticky bottom-0 bg-white px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
              <Button
                onClick={onClose}
                className="px-6 py-2 hover:bg-gray-50 transition-colors rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#0F172A] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Save Shop
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddShop;
