"use client";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Switch,
  TimePicker,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const defaultFormValues = DAYS_OF_WEEK.reduce(
  (acc, day) => ({
    ...acc,
    [`${day}Closed`]: false,
  }),
  {
    isActive: true,
  }
);

const normalizeClosedDates = (dates) => {
  if (!Array.isArray(dates)) {
    return [];
  }

  return dates
    .map((entry) => {
      if (!entry) {
        return null;
      }

      if (entry instanceof Date) {
        return {
          date: dayjs(entry).format("YYYY-MM-DD"),
          description: "",
        };
      }

      if (typeof entry === "string") {
        return {
          date: entry.slice(0, 10),
          description: "",
        };
      }

      const dateValue =
        entry.date ||
        entry.closedDate ||
        (entry.timestamp ? dayjs(entry.timestamp) : null);

      if (!dateValue) {
        return null;
      }

      const formattedDate =
        dateValue instanceof Date
          ? dayjs(dateValue).format("YYYY-MM-DD")
          : dayjs(dateValue).isValid()
          ? dayjs(dateValue).format("YYYY-MM-DD")
          : String(dateValue).slice(0, 10);

      return {
        date: formattedDate,
        description: entry.description || "",
      };
    })
    .filter((item) => item && item.date);
};

const mapShopToFormValues = (shop) => {
  if (!shop) {
    return { ...defaultFormValues };
  }

  const contactInfo = shop.contactInfo || {};
  const primaryContact = shop.primaryContact || {};
  const secondaryContact = shop.secondaryContact || {};
  const hours = shop.hoursOfOperation || {};

  const values = {
    ...defaultFormValues,
    shopName: shop.name || "",
    shopDisplayName: shop.displayName || "",
    description: shop.description || "",
    phone: contactInfo.phone || shop.phone || "",
    email: contactInfo.email || "",
    streetAddress:
      contactInfo.address || contactInfo.streetAddress || "",
    city: contactInfo.city || "",
    state: contactInfo.state || "",
    country: contactInfo.country || "",
    postalCode:
      contactInfo.postalCode || contactInfo.zipCode || contactInfo.zip || "",
    firstName: primaryContact.firstName || "",
    lastName: primaryContact.lastName || "",
    contactPhone: primaryContact.phone || "",
    contactEmail: primaryContact.email || "",
    secondaryFirstName: secondaryContact.firstName || "",
    secondaryLastName: secondaryContact.lastName || "",
    secondaryContactPhone: secondaryContact.phone || "",
    secondaryEmail: secondaryContact.email || "",
    isActive: shop.isActive !== false,
  };

  DAYS_OF_WEEK.forEach((day) => {
    const info = hours[day] || {};
    const isClosed = Boolean(info.isClosed);
    values[`${day}Closed`] = isClosed;
    values[`${day}Open`] =
      info.open && !isClosed ? dayjs(info.open, "HH:mm") : null;
    values[`${day}Close`] =
      info.close && !isClosed ? dayjs(info.close, "HH:mm") : null;
  });

  return values;
};

function AddShop({
  open,
  onClose,
  onShopAdded,
  mode = "create",
  shopData,
  onShopUpdated,
}) {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [closedDates, setClosedDates] = useState([]);
  const [newClosedDate, setNewClosedDate] = useState("");
  const [newClosedDescription, setNewClosedDescription] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  const isEditMode = mode === "edit";
  const modalTitle = isEditMode ? "Edit Shop" : "Add New Shop";
  const submitLabel = isEditMode ? "Update Shop" : "Save Shop";
  const targetShopId = shopData?._id || shopData?.id;

  // Prepare form whenever modal opens or data changes
  useEffect(() => {
    if (open) {
      form.resetFields();

      if (isEditMode) {
        if (shopData) {
          const formValues = mapShopToFormValues(shopData);
          form.setFieldsValue(formValues);
          setClosedDates(normalizeClosedDates(shopData.closedDates));
        } else {
          setClosedDates([]);
        }
      } else {
        form.setFieldsValue(defaultFormValues);
        setClosedDates([]);
      }

      setNewClosedDate("");
      setNewClosedDescription("");
    }
  }, [open, form, isEditMode, shopData]);

  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
    }
  }, [session]);

  const handleClosedDateChange = (e) => {
    setNewClosedDate(e.target.value);
  };

  const handleClosedDescriptionChange = (e) => {
    setNewClosedDescription(e.target.value);
  };

  const addClosedDate = () => {
    if (newClosedDate) {
      setClosedDates([
        ...closedDates,
        { date: newClosedDate, description: newClosedDescription },
      ]);
      setNewClosedDate("");
      setNewClosedDescription("");
    }
  };

  const removeClosedDate = (index) => {
    const updatedDates = [...closedDates];
    updatedDates.splice(index, 1);
    setClosedDates(updatedDates);
  };

  const formatTimeValue = (timeValue) => {
    if (!timeValue) return null;
    return dayjs(timeValue).format("HH:mm");
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!accessToken) {
        message.error("Authentication required. Please log in again.");
        return;
      }

      if (isEditMode && !targetShopId) {
        message.error("Unable to determine which shop to update.");
        return;
      }

      const sanitizedClosedDates = closedDates
        .filter((item) => item?.date)
        .map((item) => ({
          date: item.date,
          description: item.description || "",
        }));

      const hoursOfOperation = DAYS_OF_WEEK.reduce((acc, day) => {
        acc[day] = {
          open: formatTimeValue(values[`${day}Open`]),
          close: formatTimeValue(values[`${day}Close`]),
          isClosed: values[`${day}Closed`],
        };
        return acc;
      }, {});

      const payload = {
        name: values.shopName,
        displayName: values.shopDisplayName,
        description: values.description,
        contactInfo: {
          phone: values.phone,
          email: values.email,
          address: values.streetAddress,
          city: values.city,
          state: values.state,
          country: values.country,
          postalCode: values.postalCode,
        },
        primaryContact: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.contactPhone,
          email: values.contactEmail,
        },
        secondaryContact: {
          firstName: values.secondaryFirstName || "",
          lastName: values.secondaryLastName || "",
          phone: values.secondaryContactPhone || "",
          email: values.secondaryEmail || "",
        },
        hoursOfOperation,
        closedDates: sanitizedClosedDates,
        isActive: values.isActive !== false,
      };

      const endpoint = isEditMode
        ? API_ENDPOINTS.LOCATIONS.BY_ID(targetShopId)
        : API_ENDPOINTS.LOCATIONS.BASE;

      const response = await apiCall(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: isEditMode ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      message.success(
        isEditMode
          ? "Shop updated successfully!"
          : "Shop created successfully!"
      );

      if (isEditMode) {
        onShopUpdated?.(response);
      } else {
        form.resetFields();
        setClosedDates([]);
        onShopAdded?.(response);
      }

      onClose?.();
    } catch (error) {
      console.error(
        isEditMode ? "Error updating shop:" : "Error creating shop:",
        error
      );
      message.error(
        error.message ||
          (isEditMode ? "Failed to update shop" : "Failed to create shop")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onClose}
      width={1000}
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          disabled={isEditMode && !shopData}
        >
          {submitLabel}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ ...defaultFormValues }}
      >
        {/* Shop Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Shop Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Shop Name"
              name="shopName"
              rules={[{ required: true, message: "Shop name is required" }]}
            >
              <Input placeholder="Enter Shop Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Shop Display Name"
              name="shopDisplayName"
              rules={[{ required: true, message: "Display name is required" }]}
            >
              <Input placeholder="Enter Shop Display Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter Email" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              className="col-span-1 md:col-span-2"
            >
              <TextArea
                placeholder="Enter Shop Description"
                rows={4}
                className="p-2"
              />
            </Form.Item>

            <Form.Item label="Status" name="isActive" valuePropName="checked">
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                defaultChecked
              />
            </Form.Item>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Shop Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[
                { required: true, message: "Street address is required" },
              ]}
              className="col-span-1 md:col-span-2"
            >
              <Input placeholder="Enter Street Address" className="p-2" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input placeholder="Enter City" className="p-2" />
            </Form.Item>

            <Form.Item
              label="State/Province"
              name="state"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Input placeholder="Enter State/Province" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: "Postal code is required" }]}
            >
              <Input placeholder="Enter Postal Code" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Select placeholder="Select Country" className="w-full">
                <Option value="USA">United States</Option>
                <Option value="CAN">Canada</Option>
                <Option value="MEX">Mexico</Option>
                {/* Add more countries as needed */}
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Primary Contact Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Primary Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input placeholder="Enter First Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Enter Last Name" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="contactPhone"
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="contactEmail"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter Email" className="p-2" />
            </Form.Item>
          </div>
        </div>

        {/* Secondary Contact Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Secondary Contact (Optional)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="First Name" name="secondaryFirstName">
              <Input placeholder="Enter First Name" className="p-2" />
            </Form.Item>

            <Form.Item label="Last Name" name="secondaryLastName">
              <Input placeholder="Enter Last Name" className="p-2" />
            </Form.Item>

            <Form.Item label="Phone" name="secondaryContactPhone">
              <Input placeholder="Enter Phone Number" className="p-2" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="secondaryEmail"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter Email" className="p-2" />
            </Form.Item>
          </div>
        </div>

        {/* Hours of Operation Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Hours of Operation
          </h2>

          {/* Monday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Monday</h3>
              <Form.Item name="mondayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("mondayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="mondayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="mondayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Tuesday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Tuesday</h3>
              <Form.Item name="tuesdayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("tuesdayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="tuesdayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="tuesdayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Wednesday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Wednesday</h3>
              <Form.Item name="wednesdayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("wednesdayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="wednesdayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="wednesdayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Thursday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Thursday</h3>
              <Form.Item name="thursdayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("thursdayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="thursdayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="thursdayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Friday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Friday</h3>
              <Form.Item name="fridayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("fridayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="fridayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="fridayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Saturday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Saturday</h3>
              <Form.Item name="saturdayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("saturdayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="saturdayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="saturdayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>

          {/* Sunday */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium mr-2">Sunday</h3>
              <Form.Item name="sundayClosed" valuePropName="checked" noStyle>
                <Switch
                  checkedChildren="Closed"
                  unCheckedChildren="Open"
                  className="ml-2"
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("sundayClosed") ? null : (
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Open" name="sundayOpen">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Close" name="sundayClose">
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>
        </div>

        {/* Closed Dates Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-[#0F172A]">
            Closed Dates
          </h2>

          <div className="space-y-4">
            {closedDates.map((closedDate, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg"
              >
                <div className="col-span-4">
                  <Input
                    type="date"
                    className="w-full p-2"
                    value={closedDate.date}
                    disabled
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    placeholder="Description"
                    className="w-full p-2"
                    value={closedDate.description}
                    disabled
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="text"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => removeClosedDate(index)}
                  />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg">
              <div className="col-span-4">
                <Input
                  type="date"
                  className="w-full p-2"
                  value={newClosedDate}
                  onChange={handleClosedDateChange}
                />
              </div>
              <div className="col-span-6">
                <Input
                  placeholder="Description"
                  className="w-full p-2"
                  value={newClosedDescription}
                  onChange={handleClosedDescriptionChange}
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button
                  type="primary"
                  onClick={addClosedDate}
                  disabled={!newClosedDate}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AddShop;
