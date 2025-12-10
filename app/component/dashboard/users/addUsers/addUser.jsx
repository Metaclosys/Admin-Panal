"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Checkbox, Modal, message, Radio } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";

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

function AddUser({ visible, onClose, onUserAdded }) {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(UserRole.ADMIN);
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!visible || !session?.accessToken) {
        return;
      }

      try {
        setLocationsLoading(true);
        setLocationsError(null);
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
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
  }, [visible, session?.accessToken]);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setSelectedRole(UserRole.ADMIN);
    }
  }, [visible, form]);

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
    setSelectedRole(role);
    form.setFieldsValue({ role });
    if (role !== UserRole.RESERVATIONIST) {
      form.setFieldsValue({ assignedLocations: [] });
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      const assignedLocations = Array.isArray(values.assignedLocations)
        ? values.assignedLocations.filter((locationId) => Boolean(locationId))
        : [];

      const normalizedStatus = typeof values.status === "string" ? values.status.toLowerCase() : UserStatus.ACTIVE;
      const normalizedType = typeof values.type === "string" ? values.type.toLowerCase() : UserType.LOCATION_USER;

      const userData = {
        firstName: String(values.firstName || "").trim(),
        lastName: String(values.lastName || "").trim(),
        email: String(values.email || "").trim(),
        roles: [values.role],
        status: normalizedStatus,
        type: normalizedType,
        username: String(values.username || "").trim(),
        password: values.password,
        allowUniversalLogin: values.allowUniversalLogin === "Yes",
        mustChangePassword: Boolean(values.mustChangePassword),
        phone: values.phone ? String(values.phone).trim() : undefined,
        assignedLocations: selectedRole === UserRole.RESERVATIONIST ? assignedLocations : [],
      };

      console.log("Sending user data:", userData);

      const newUser = await apiCall(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      message.success("User created successfully");
      form.resetFields();
      onClose();

      if (onUserAdded) {
        onUserAdded(newUser);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      message.error(`Error creating user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a New User"
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
              name="reTypePassword"
              required
              label={<span className="text-sm font-medium">Re-type Password</span>}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords do not match"));
                  },
                }),
              ]}
              className="mb-4"
            >
              <Input.Password
                placeholder="Enter Password"
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
              name="password"
              required
              label={<span className="text-sm font-medium">Password</span>}
              rules={[
                { required: true, message: "Please enter password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
              className="mb-4"
            >
              <Input.Password
                placeholder="Enter Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="rounded-md h-9"
              />
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
            icon={<PlusOutlined />}
          >
            Add User to List
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUser;
