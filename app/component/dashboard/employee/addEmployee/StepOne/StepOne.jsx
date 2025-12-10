"use client";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;

// Define valid employee types and genders based on backend requirements
const EMPLOYEE_TYPES = [
  { key: "scheduled", value: "Scheduled" },
  { key: "on-call", value: "On-Call" },
  { key: "part-time", value: "Part-Time" },
  { key: "full-time", value: "Full-Time" },
];

const GENDERS = [
  { key: "male", value: "Male" },
  { key: "female", value: "Female" },
  { key: "other", value: "Other" },
];

const EMPLOYEE_STATUS = [
  { key: "active", value: "Active" },
  { key: "inactive", value: "Inactive" },
  { key: "on_leave", value: "On Leave" },
  { key: "terminated", value: "Terminated" },
];

function StepOne({
  locations = [],
  locationsLoading = false,
  locationsError = null,
}) {
  const [specifyEndDate, setSpecifyEndDate] = useState(false);

  return (
    <>
      <h2 className="text-blue-600 font-medium mb-6">Basic Information</h2>

      {/* Name Information */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { required: true, message: "Please enter first name" },
            { type: "string", whitespace: true },
            { min: 1, message: "First name cannot be empty" },
          ]}
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter First Name" className="py-2" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, message: "Please enter last name" },
            { type: "string", whitespace: true },
            { min: 1, message: "Last name cannot be empty" },
          ]}
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter Last Name" className="py-2" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Display Name"
          name="displayName"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter Display Name (Optional)" className="py-2" />
        </Form.Item>

        <Form.Item
          label="Gender" 
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select placeholder="Select gender">
            {GENDERS.map((gender) => (
              <Select.Option key={gender.key} value={gender.value}>
                {gender.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Date of Birth */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter Email" className="py-2" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter Phone Number" className="py-2" />
        </Form.Item>
      </div>

      {/* Status and Type */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item label="Status" name="status">
          <Select placeholder="Select status">
            {EMPLOYEE_STATUS.map((status) => (
              <Select.Option key={status.key} value={status.value}>
                {status.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Employee Type"
          name="type"
          rules={[{ required: true, message: "Please select employee type" }]}
        >
          <Select placeholder="Select employee type">
            {EMPLOYEE_TYPES.map((type) => (
              <Select.Option key={type.key} value={type.value}>
                {type.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Location */}
      <div>
        <Form.Item
          label="Location"
          name="locationId"
          rules={[
            { required: true, message: "Please select a location" },
          ]}
        >
          <Select 
            placeholder="Select Location" 
            loading={locationsLoading}
            disabled={locationsLoading || !!locationsError}
            showSearch
            optionFilterProp="label"
            notFoundContent={
              locationsError
                ? locationsError
                : locationsLoading
                ? "Loading locations..."
                : "No locations found"
            }
          >
            {locations.map((location) => (
              <Select.Option key={location._id} value={location._id} label={location.name}>
                {location.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Employment Details */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Max Appointments Per Day"
          name="maxAppointmentsPerDay"
          rules={[{ type: "number", min: 0, message: "Must be a valid number" }]}
        >
          <InputNumber 
            min={0} 
            className="w-full" 
            placeholder="Enter max appointments"
          />
        </Form.Item>

        <div>
          <Form.Item
            label="Specify Employment End Date"
            name="specifyEmploymentEndDate"
            valuePropName="checked"
          >
            <Switch onChange={setSpecifyEndDate} />
          </Form.Item>

          {specifyEndDate && (
            <Form.Item
              label="Employment End Date"
              name="employmentEndDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          )}
        </div>
      </div>

      {/* Termination Date */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Termination Date"
          name="terminationDate"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      {/* Address Information */}
      <h3 className="text-blue-600 font-medium mt-6 mb-4">
        Address Information
      </h3>
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Address"
          name="address"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter Address" className="py-2" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter City" className="py-2" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="State"
          name="state"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter State" className="py-2" />
        </Form.Item>

        <Form.Item
          label="ZIP Code"
          name="zipCode"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <Input placeholder="Enter ZIP Code" className="py-2" />
        </Form.Item>
      </div>

      <Form.Item
        label="Country"
        name="country"
        normalize={(value) => (value ? String(value).trim() : value)}
      >
        <Input placeholder="Enter Country" className="py-2" />
      </Form.Item>

      {/* Additional Information */}
      <h3 className="text-blue-600 font-medium mt-6 mb-4">
        Additional Information
      </h3>
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Description"
          name="description"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Notes"
          name="notes"
          normalize={(value) => (value ? String(value).trim() : value)}
        >
          <TextArea rows={4} placeholder="Enter notes" />
        </Form.Item>
      </div>

      {/* Image Upload */}
      <Form.Item
        label="Profile Image"
        name="imageUrl"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      {/* Login Creation */}
      <Form.Item
        name="createLogin"
        valuePropName="checked"
      >
        <Switch checkedChildren="Create Login" unCheckedChildren="No Login" />
      </Form.Item>
    </>
  );
}

export default StepOne;

