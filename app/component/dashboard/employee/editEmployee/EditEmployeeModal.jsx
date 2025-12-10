"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  DatePicker,
  InputNumber,
  message,
  Spin,
  Divider,
} from "antd";
import dayjs from "dayjs";
import {
  apiCall,
  API_ENDPOINTS,
} from "../../../../api/apiContent/apiContent";
import WorkingHoursEditor, {
  serializeWorkingHours,
} from "../shared/WorkingHoursEditor";

const { TextArea } = Input;

const EMPLOYEE_TYPES = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "On-Call", value: "On-Call" },
  { label: "Part-Time", value: "Part-Time" },
  { label: "Full-Time", value: "Full-Time" },
];

const EMPLOYEE_STATUS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "On Leave", value: "On Leave" },
  { label: "Terminated", value: "Terminated" },
];

const GENDERS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const ROLE_OPTIONS = [
  "admin",
  "staff",
  "document_manager",
  "franchise",
  "marketing",
  "reporting",
  "reservationist",
  "products",
  "user_manager",
  "employee",
].map((role) => ({ label: role, value: role }));

const normalizeDate = (value) => {
  if (!value) return null;
  const date = dayjs(value);
  return date.isValid() ? date : null;
};

const mapServicesToIds = (services) => {
  if (!Array.isArray(services)) return [];
  return services.map((service) =>
    typeof service === "string" ? service : service?._id
  );
};

const EditEmployeeModal = ({
  open,
  employee,
  accessToken,
  onClose,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const specifyEmploymentEndDate = Form.useWatch(
    "specifyEmploymentEndDate",
    form
  );

  useEffect(() => {
    const fetchCollections = async () => {
      if (!open || !accessToken) {
        return;
      }

      try {
        setLoadingOptions(true);

        const [locationsData, servicesData] = await Promise.all([
          apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          apiCall(API_ENDPOINTS.SERVICES.BASE, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setLocations(Array.isArray(locationsData) ? locationsData : []);

        if (Array.isArray(servicesData)) {
          setServices(servicesData);
        } else if (Array.isArray(servicesData?.data)) {
          setServices(servicesData.data);
        } else if (Array.isArray(servicesData?.services)) {
          setServices(servicesData.services);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Failed to load locations/services", err);
        message.error("Unable to load supporting data for editing.");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchCollections();
  }, [open, accessToken]);

  useEffect(() => {
    if (!open || !employee) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      firstName: employee.firstName ?? "",
      lastName: employee.lastName ?? "",
      displayName: employee.displayName ?? "",
      gender: employee.gender ?? undefined,
      email: employee.email ?? "",
      phone: employee.phone ?? "",
      type: employee.type ?? undefined,
      status: employee.status ?? undefined,
      locationId:
        employee.locationId ??
        employee.location?._id ??
        employee.location ??
        undefined,
      maxAppointmentsPerDay: employee.maxAppointmentsPerDay ?? undefined,
      employmentStartDate: normalizeDate(employee.employmentStartDate),
      specifyEmploymentEndDate: Boolean(employee.specifyEmploymentEndDate),
      employmentEndDate: employee.specifyEmploymentEndDate
        ? normalizeDate(employee.employmentEndDate)
        : null,
      terminationDate: normalizeDate(employee.terminationDate),
      workingHours: employee.workingHours ?? {},
      address: employee.address ?? employee.contactInfo?.address ?? "",
      city: employee.city ?? employee.contactInfo?.city ?? "",
      state: employee.state ?? employee.contactInfo?.state ?? "",
      zipCode: employee.contactInfo?.zipCode ?? "",
      country: employee.contactInfo?.country ?? "",
      description: employee.description ?? "",
      notes: employee.notes ?? "",
      specialties: employee.specialties ?? [],
      services: mapServicesToIds(employee.services),
      createLogin: Boolean(employee.createLogin),
      roles: Array.isArray(employee.roles) ? employee.roles : [],
    });
  }, [open, employee, form]);

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        label: service.name || "Untitled service",
        value: service._id || service.id,
      })),
    [services]
  );

  const handleSubmit = async (values) => {
    if (!employee?._id || !accessToken) {
      return;
    }

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName || undefined,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      type: values.type,
      status: values.status,
      locationId: values.locationId ?? employee.locationId,
      maxAppointmentsPerDay: values.maxAppointmentsPerDay ?? undefined,
      employmentStartDate: values.employmentStartDate
        ? values.employmentStartDate.toISOString()
        : undefined,
      specifyEmploymentEndDate: Boolean(values.specifyEmploymentEndDate),
      employmentEndDate:
        values.specifyEmploymentEndDate && values.employmentEndDate
          ? values.employmentEndDate.toISOString()
          : undefined,
      terminationDate: values.terminationDate
        ? values.terminationDate.toISOString()
        : undefined,
      address: values.address || undefined,
      city: values.city || undefined,
      state: values.state || undefined,
      zipCode: values.zipCode || undefined,
      country: values.country || undefined,
      description: values.description || undefined,
      notes: values.notes || undefined,
      specialties: values.specialties ?? [],
      services: values.services ?? [],
      workingHours: serializeWorkingHours(values.workingHours ?? {}),
      createLogin: Boolean(values.createLogin),
      roles: values.roles ?? [],
    };

    try {
      setSubmitting(true);
      await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(employee._id), {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      message.success("Employee details updated");
      onClose();
      onUpdated?.();
    } catch (err) {
      console.error("Failed to update employee", err);
      message.error(err.message || "Unable to update employee");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Edit employee"
      okText="Save changes"
      onOk={() => form.submit()}
      confirmLoading={submitting}
      destroyOnClose
      width={900}
    >
      {loadingOptions && (
        <div className="mb-4 rounded border border-dashed border-slate-200 p-3 text-sm text-slate-500">
          <Spin size="small" className="mr-2" />
          Loading supporting data…
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          specifyEmploymentEndDate: false,
          createLogin: false,
          roles: [],
        }}
        onFinish={handleSubmit}
      >
        <Divider orientation="left">Basic information</Divider>
        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item label="Display name" name="displayName">
            <Input placeholder="Friendly display name" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Select gender" }]}
          >
            <Select placeholder="Select gender" options={GENDERS} />
          </Form.Item>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input placeholder="Contact number" />
          </Form.Item>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item
            label="Employment type"
            name="type"
            rules={[{ required: true, message: "Select employment type" }]}
          >
            <Select placeholder="Select type" options={EMPLOYEE_TYPES} />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select status" options={EMPLOYEE_STATUS} />
          </Form.Item>
        </div>

        <Divider orientation="left">Location & schedule</Divider>
        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item
            label="Location"
            name="locationId"
            rules={[{ required: true, message: "Select location" }]}
          >
            <Select
              showSearch
              placeholder="Assign location"
              options={locations.map((location) => ({
                label: location.name || "Unnamed location",
                value: location._id,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item label="Max appointments per day" name="maxAppointmentsPerDay">
            <InputNumber className="w-full" min={0} placeholder="e.g. 8" />
          </Form.Item>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item label="Employment start date" name="employmentStartDate">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Specify employment end date"
            name="specifyEmploymentEndDate"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>

        {specifyEmploymentEndDate && (
          <Form.Item
            label="Employment end date"
            name="employmentEndDate"
            rules={[
              {
                required: true,
                message: "Select the employment end date",
              },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        )}

        <Form.Item label="Termination date" name="terminationDate">
          <DatePicker className="w-full" />
        </Form.Item>

        <WorkingHoursEditor
          form={form}
          initialWorkingHours={employee?.workingHours}
        />

        <Divider orientation="left">Contact information</Divider>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item label="Address" name="address">
            <Input placeholder="Street address" />
          </Form.Item>

          <Form.Item label="City" name="city">
            <Input placeholder="City" />
          </Form.Item>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item label="State" name="state">
            <Input placeholder="State" />
          </Form.Item>

          <Form.Item label="ZIP / Postal code" name="zipCode">
            <Input placeholder="ZIP / Postal code" />
          </Form.Item>
        </div>

        <Form.Item label="Country" name="country">
          <Input placeholder="Country" />
        </Form.Item>

        <Divider orientation="left">Skills & access</Divider>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item label="Services" name="services">
            <Select
              mode="multiple"
              placeholder="Select services"
              options={serviceOptions}
              optionFilterProp="label"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Specialties" name="specialties">
            <Select
              mode="tags"
              placeholder="Enter specialties"
              tokenSeparators={[","]}
            />
          </Form.Item>
        </div>

        <Form.Item label="Roles" name="roles">
          <Select
            mode="multiple"
            options={ROLE_OPTIONS}
            placeholder="Assign roles"
            allowClear
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          label="Create login access"
          name="createLogin"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider orientation="left">Notes</Divider>

        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Description shown internally" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea rows={3} placeholder="Private notes" />
        </Form.Item>

        {/* Hidden submit button for form.submit() */}
        <button type="submit" className="hidden">
          Submit
        </button>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;





