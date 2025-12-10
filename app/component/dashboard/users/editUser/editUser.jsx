"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Checkbox, Modal, message, Radio } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, SaveOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../../../lib/apiClient";

const { Option } = Select;

const UserRole = {
  ADMIN: "admin",
  RESERVATIONIST: "reservationist",
};

const UserType = {
  LOCATION_USER: "location_user",
  SYSTEM_USER: "system_user",
};

const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
};

function EditUser({ visible, user, onClose, onUserUpdated, accessToken }) {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const effectiveToken = accessToken ?? session?.accessToken ?? null;
  const [loading, setLoading] = useState(false);
  const allowedRoles = [UserRole.ADMIN, UserRole.RESERVATIONIST];
  const getInitialRole = (role) => (allowedRoles.includes(role) ? role : UserRole.ADMIN);

  const [selectedRole, setSelectedRole] = useState(() => getInitialRole(user?.roles?.[0]));
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!visible || !effectiveToken) {
        return;
      }

      try {
        setLocationsLoading(true);
        setLocationsError(null);
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          accessToken: effectiveToken,
        });
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
        setLocationsError(error instanceof Error ? error.message : "Failed to load shops");
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, [visible, effectiveToken]);

  useEffect(() => {
    if (visible && user) {
      const initialRole = getInitialRole(user.roles?.[0]);
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: initialRole,
        status: user.status || UserStatus.ACTIVE,
        type: user.type || UserType.LOCATION_USER,
        username: user.username,
        phone: user.phone,
        allowUniversalLogin: user.allowUniversalLogin ? "Yes" : "No",
        mustChangePassword: user.mustChangePassword,
        assignedLocations: Array.isArray(user.assignedLocations)
          ? user.assignedLocations.map((location) =>
              typeof location === "string" ? location : location?.toString?.()
          )
          : [],
      });
      setSelectedRole(initialRole);
    }
  }, [visible, user, form]);

  useEffect(() => {
    if (selectedRole !== UserRole.RESERVATIONIST) {
      form.setFieldsValue({ assignedLocations: [] });
    }
  }, [selectedRole, form]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleRoleChange = (role) => {
    const sanitizedRole = getInitialRole(role);
    setSelectedRole(sanitizedRole);
    form.setFieldsValue({ role: sanitizedRole });
    if (sanitizedRole !== UserRole.RESERVATIONIST) {
      form.setFieldsValue({ assignedLocations: [] });
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!effectiveToken) {
        message.error("You are not authorized to update this user.");
        return;
      }

      const assignedLocations = Array.isArray(values.assignedLocations)
        ? values.assignedLocations.filter((locationId) => Boolean(locationId))
        : [];

      const normalizedStatus =
        typeof values.status === "string"
          ? values.status.toLowerCase()
          : user?.status || UserStatus.ACTIVE;
      const normalizedType =
        typeof values.type === "string"
          ? values.type.toLowerCase()
          : user?.type || UserType.LOCATION_USER;

      const userData = {
        firstName: String(values.firstName || "").trim(),
        lastName: String(values.lastName || "").trim(),
        email: String(values.email || "").trim(),
        roles: [getInitialRole(values.role)],
        status: normalizedStatus,
        type: normalizedType,
        username: String(values.username || "").trim(),
        allowUniversalLogin: values.allowUniversalLogin === "Yes",
        mustChangePassword: Boolean(values.mustChangePassword),
        phone: values.phone ? String(values.phone).trim() : undefined,
        assignedLocations: selectedRole === UserRole.RESERVATIONIST ? assignedLocations : [],
      };

      if (values.password) {
        userData.password = values.password;
      }

      const updatedUser = await apiCall(API_ENDPOINTS.USERS.BY_ID(user._id), {
        method: "PUT",
        accessToken: effectiveToken,
        body: JSON.stringify(userData),
      });

      message.success("User updated successfully");
      form.resetFields();
      onClose();

      if (onUserUpdated) {
        onUserUpdated(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      message.error(`Error updating user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      className="user-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: UserStatus.ACTIVE,
          type: UserType.LOCATION_USER,
          allowUniversalLogin: "Yes",
          role: UserRole.ADMIN,
          assignedLocations: [],
        }}
      >
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <Form.Item
              name="firstName"
              required
              label={<span className="text-sm font-medium">First Name</span>}
              rules={[{ required: true, message: "Please enter first name" }]}
              className="mb-4"
            >
              <Input placeholder="Enter First Name" className="rounded-md h-9" />
            </Form.Item>

            <Form.Item
              name="email"
              required
              label={<span className="text-sm font-medium">Email</span>}
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="mb-4"
            >
              <Input placeholder="Enter Email" className="rounded-md h-9" />
            </Form.Item>

            <Form.Item
              name="status"
              required
              label={<span className="text-sm font-medium">Status</span>}
              rules={[{ required: true, message: "Please select status" }]}
              className="mb-4"
            >
              <Select placeholder="Active" className="rounded-md h-9">
                <Option value={UserStatus.ACTIVE}>Active</Option>
                <Option value={UserStatus.INACTIVE}>Inactive</Option>
                <Option value={UserStatus.SUSPENDED}>Suspended</Option>
              </Select>
            </Form.Item>

            {selectedRole === UserRole.RESERVATIONIST && (
              <Form.Item
                name="assignedLocations"
                required
                label={<span className="text-sm font-medium">Accessible Shops</span>}
                rules={[{ required: true, message: "Please select at least one shop" }]}
                className="mb-4"
              >
                <Select
                  mode="multiple"
                  placeholder="Select shops"
                  className="w-full"
                  loading={locationsLoading}
                  disabled={locationsLoading || locations.length === 0}
                  optionFilterProp="label"
                  showSearch
                >
                  {locations.map((location) => (
                    <Option key={location._id} value={location._id} label={location.name}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
                {locationsError && (
                  <div className="text-xs text-red-500 mt-1">{locationsError}</div>
                )}
              </Form.Item>
            )}

            <Form.Item
              name="phone"
              label={<span className="text-sm font-medium">Phone</span>}
              className="mb-4"
            >
              <Input placeholder="Enter Phone Number" className="rounded-md h-9" />
            </Form.Item>

            <Form.Item
              name="username"
              required
              label={<span className="text-sm font-medium">Username</span>}
              rules={[{ required: true, message: "Please enter username" }]}
              className="mb-4"
            >
              <Input placeholder="Enter Username" className="rounded-md h-9" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-sm font-medium">New Password (Optional)</span>}
              rules={[{ min: 8, message: "Password must be at least 8 characters" }]}
              className="mb-4"
            >
              <Input.Password
                placeholder="Leave blank to keep current password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="rounded-md h-9"
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="lastName"
              required
              label={<span className="text-sm font-medium">Last Name</span>}
              rules={[{ required: true, message: "Please enter last name" }]}
              className="mb-4"
            >
              <Input placeholder="Enter Last Name" className="rounded-md h-9" />
            </Form.Item>

            <Form.Item
              name="role"
              required
              label={<span className="text-sm font-medium">Roles</span>}
              rules={[{ required: true, message: "Please select a role" }]}
              className="mb-4"
            >
              <Radio.Group
                className="grid grid-cols-2 gap-y-1"
                onChange={(e) => handleRoleChange(e.target.value)}
              >
                <Radio value={UserRole.ADMIN}>Admin</Radio>
                <Radio value={UserRole.RESERVATIONIST}>Reservationist</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="type"
              required
              label={<span className="text-sm font-medium">Type</span>}
              rules={[{ required: true, message: "Please select type" }]}
              className="mb-4"
            >
              <Select placeholder="Location User" className="rounded-md h-9">
                <Option value={UserType.LOCATION_USER}>Location User</Option>
                <Option value={UserType.SYSTEM_USER}>System User</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="allowUniversalLogin"
              required
              label={<span className="text-sm font-medium">Allow Universal Login</span>}
              rules={[{ required: true, message: "Please select an option" }]}
              className="mb-4"
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Form.Item name="mustChangePassword" valuePropName="checked" className="mt-2 mb-6">
          <Checkbox>User must change password next login</Checkbox>
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 h-auto rounded-full"
            icon={<SaveOutlined />}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default EditUser;
