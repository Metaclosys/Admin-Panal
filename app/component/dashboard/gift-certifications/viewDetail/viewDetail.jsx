"use client";
import { React, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../api/apiContent/apiContent";

const { Option } = Select;

function ViewDetail({ selectedCert, setShowModal, onCertificateUpdated }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        dateIssued: values.dateIssued?.format("YYYY-MM-DD"),
        dateExpires: values.dateExpires?.format("YYYY-MM-DD"),
        originalAmount: parseFloat(values.originalAmount),
      };

      await apiCall(API_ENDPOINTS.GIFT_CERTIFICATES.BY_ID(selectedCert._id), {
        method: 'PUT',
        body: JSON.stringify(formattedValues)
      });

      message.success("Gift certificate updated successfully");
      onCertificateUpdated();
      setShowModal(false);
    } catch (error) {
      message.error("Failed to update gift certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="View/Edit Gift Certificate"
      open={true}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...selectedCert,
          dateIssued: selectedCert.dateIssued
            ? dayjs(selectedCert.dateIssued)
            : null,
          dateExpires: selectedCert.dateExpires
            ? dayjs(selectedCert.dateExpires)
            : null,
          originalAmount: selectedCert.originalAmount?.toString(),
        }}
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="certificateNumber"
            label="Certificate Number"
            rules={[
              { required: true, message: "Please enter certificate number" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select>
              <Option value="Gift Certificate">Gift Certificate</Option>
              <Option value="Gift Card">Gift Card</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateIssued"
            label="Date Issued"
            rules={[{ required: true, message: "Please select issue date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="dateExpires"
            label="Date Expires"
            rules={[{ required: true, message: "Please select expiry date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="originalAmount"
            label="Original Amount"
            rules={[
              { required: true, message: "Please enter amount" },
              {
                pattern: /^\d+(\.\d{0,2})?$/,
                message: "Please enter a valid amount",
              },
            ]}
          >
            <Input prefix="$" />
          </Form.Item>

          <Form.Item
            name="from"
            label="From"
            rules={[{ required: true, message: "Please enter sender name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="to"
            label="To"
            rules={[{ required: true, message: "Please enter recipient name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="Expired">Expired</Option>
              <Option value="Redeemed">Redeemed</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ViewDetail;
