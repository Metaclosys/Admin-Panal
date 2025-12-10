"use client";

import { Form, Select, Spin } from "antd";
import WorkingHoursEditor from "../../shared/WorkingHoursEditor";

function StepTwo({ form, services = [], servicesLoading = false, servicesError = null }) {
  const formInstance = form;

  return (
    <>
      <h2 className="text-blue-600 font-medium mb-6">Services & Schedule</h2>

      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Services"
          name="services"
          rules={[{ required: true, message: "Please select at least one service" }]}
        >
          {servicesLoading ? (
            <div className="flex items-center justify-center p-4">
              <Spin tip="Loading services..." />
            </div>
          ) : (
            <Select
              mode="multiple"
              placeholder="Select services"
              style={{ width: "100%" }}
              disabled={!!servicesError}
              notFoundContent={
                servicesError
                  ? servicesError
                  : services.length === 0
                  ? "No services available"
                  : null
              }
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
              }
            >
              {services.map((service, index) => {
                const value = service._id || `service-${index}`;
                const label = service.name || `Service ${index + 1}`;

                return (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                );
              })}
            </Select>
          )}
          {servicesError && (
            <div className="text-red-500 text-sm mt-1">{servicesError}</div>
          )}
        </Form.Item>

        <Form.Item label="Specialties" name="specialties">
          <Select mode="multiple" placeholder="Select specialties" style={{ width: "100%" }}>
            <Select.Option value="specialty1">Specialty 1</Select.Option>
            <Select.Option value="specialty2">Specialty 2</Select.Option>
          </Select>
        </Form.Item>
      </div>

      {formInstance ? <WorkingHoursEditor form={formInstance} /> : null}
    </>
  );
}

export default StepTwo;
