"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Button,
  Descriptions,
  Tabs,
  Tag,
  Spin,
  message,
  Form,
  Input,
  Upload,
  Avatar,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

function MyProfileClient({
  userId,
  initialProfile = null,
  initialError = null,
  accessToken,
}) {
  const [activeTab, setActiveTab] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(!initialProfile && !initialError);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      if (initialProfile.avatar) {
        setAvatarUrl(initialProfile.avatar);
      }
      form.setFieldsValue({
        username: initialProfile.username,
        email: initialProfile.email,
        phone: initialProfile.phone || "",
        address: initialProfile.address || "",
      });
      setLoading(false);
    }
  }, [initialProfile, form]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchProfile = useCallback(async () => {
    if (!accessToken || !userId) {
      setError("You are not authorized to view this profile.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        accessToken,
      });
      setProfile(data);
      if (data.avatar) {
        setAvatarUrl(data.avatar);
      }
      form.setFieldsValue({
        username: data.username,
        email: data.email,
        phone: data.phone || "",
        address: data.address || "",
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err instanceof Error ? err.message : "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId, form]);

  useEffect(() => {
    if (!initialProfile && accessToken && userId) {
      fetchProfile();
    }
  }, [initialProfile, accessToken, userId, fetchProfile]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (profile) {
      form.setFieldsValue({
        username: profile.username,
        email: profile.email,
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  };

  const handleUpdate = async (values) => {
    if (!accessToken || !profile || !userId) {
      message.error("You are not authorized to update this profile.");
      return;
    }

    try {
      setUpdateLoading(true);

      const updatedUserData = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: values.address,
      };

      if (
        values.avatar &&
        values.avatar.fileList &&
        values.avatar.fileList.length > 0
      ) {
        console.log("Avatar upload selected:", values.avatar.fileList[0]);
      }

      await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        method: "PUT",
        accessToken,
        body: JSON.stringify(updatedUserData),
      });

      const updatedProfile = await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        accessToken,
      });
      setProfile(updatedProfile);
      setAvatarUrl(updatedProfile.avatar || null);

      message.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center my-12">
          <Spin size="large" tip="Loading your profile..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="text-center py-12">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button
            type="primary"
            onClick={() => {
              setError(null);
              fetchProfile();
            }}
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <Card className="text-center py-12">
          <div className="text-gray-500 mb-4">Profile not found</div>
        </Card>
      </div>
    );
  }

  const accountTabContent = (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{
          username: profile.username,
          email: profile.email,
          phone: profile.phone || "",
          address: profile.address || "",
        }}
        style={{ display: editMode ? "block" : "none" }}
      >
        <Form.Item
          name="avatar"
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={(e) =>
            Array.isArray(e) ? e : e?.fileList || []
          }
        >
          <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter your email"
            disabled
          />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input
            prefix={<HomeOutlined />}
            placeholder="Enter your address"
          />
        </Form.Item>
      </Form>

      {!editMode && (
        <Descriptions bordered column={1}>
          <Descriptions.Item
            label={
              <span>
                <UserOutlined className="mr-2" />
                Username
              </span>
            }
          >
            {profile.username}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <MailOutlined className="mr-2" />
                Email
              </span>
            }
          >
            {profile.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <PhoneOutlined className="mr-2" />
                Phone
              </span>
            }
          >
            {profile.phone || "Not provided"}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <HomeOutlined className="mr-2" />
                Address
              </span>
            }
          >
            {profile.address || "Not provided"}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {Array.isArray(profile.roles)
              ? profile.roles.map((role, index) => (
                  <Tag key={index} color="blue" className="mx-1">
                    {role.toUpperCase()}
                  </Tag>
                ))
              : "USER"}
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {new Date(profile.createdAt).toLocaleString()}
          </Descriptions.Item>
          {profile.updatedAt && (
            <Descriptions.Item label="Last Updated">
              {new Date(profile.updatedAt).toLocaleString()}
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </>
  );

  const securityTabContent = (
    <Card className="shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Password Management</h3>
      <p className="text-gray-500 mb-4">
        For security reasons, you cannot see your current password. You can
        reset your password if needed.
      </p>
      <Button type="primary" className="bg-blue-500">
        Change Password
      </Button>
    </Card>
  );

  const activityTabContent = (
    <Card className="shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      {profile.activityLog && profile.activityLog.length > 0 ? (
        <div className="space-y-4">
          {profile.activityLog.map((activity, index) => (
            <div key={index} className="border-b pb-3">
              <p className="font-medium">{activity.action}</p>
              <p className="text-gray-500 text-sm">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent activity to display</p>
      )}
    </Card>
  );

  const tabItems = [
    {
      key: "1",
      label: "Account Information",
      children: accountTabContent,
    },
    {
      key: "2",
      label: "Security",
      children: securityTabContent,
    },
    {
      key: "3",
      label: "Activity",
      children: activityTabContent,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-gray-500">
          View and manage your account information
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <div className="space-x-2">
          {editMode ? (
            <>
              <Button
                onClick={handleCancelEdit}
                icon={<CloseOutlined />}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={updateLoading}
                className="bg-blue-500"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              className="bg-blue-500"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="mb-4">
              {avatarUrl ? (
                <Avatar
                  src={avatarUrl}
                  size={128}
                  alt={profile.username || "User"}
                />
              ) : (
                <Avatar size={128} icon={<UserOutlined />} />
              )}
            </div>
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-gray-500">{profile.email}</p>
            <div className="mt-3">
              {Array.isArray(profile.roles)
                ? profile.roles.map((role, index) => (
                    <Tag key={index} color="blue" className="mx-1">
                      {role.toUpperCase()}
                    </Tag>
                  ))
                : <Tag color="blue">USER</Tag>}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </div>
      </div>
    </div>
  );
}

export default MyProfileClient;

