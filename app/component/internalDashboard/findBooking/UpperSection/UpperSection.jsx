"use client";
import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const UpperSection = ({ onSearch, loading }) => {
  const [form] = Form.useForm();

  const handleSearch = (values) => {
    const searchParams = {
      ...values,
      dateRange: values.dateRange ? {
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      } : undefined,
    };
    onSearch(searchParams);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Find Booking</h2>
      <Form
        form={form}
        onFinish={handleSearch}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Form.Item name="bookingId" label="Booking ID">
          <Input placeholder="Enter booking ID" />
        </Form.Item>

        <Form.Item name="clientName" label="Client Name">
          <Input placeholder="Enter client name" />
        </Form.Item>

        <Form.Item name="dateRange" label="Date Range">
          <RangePicker className="w-full" />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            placeholder="Select status"
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
          />
        </Form.Item>

        <Form.Item name="service" label="Service">
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item name="employee" label="Employee">
          <Input placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item className="md:col-span-2 lg:col-span-3">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            loading={loading}
            className="bg-blue-500"
          >
            Search Bookings
            </Button>
          <Button
            onClick={() => form.resetFields()}
            className="ml-2"
          >
            Reset
        </Button>
        </Form.Item>
      </Form>
      </div>
  );
};

export default UpperSection;
