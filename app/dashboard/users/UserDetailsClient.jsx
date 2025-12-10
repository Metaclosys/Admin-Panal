"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Spin,
  Tabs,
  Card,
  Button,
  Tag,
  Descriptions,
  message,
  Modal,
  Divider,
  Timeline,
  List,
  Avatar,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  LockOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import EditUser from "../../component/dashboard/users/editUser/editUser";

const { TabPane } = Tabs;

function UserDetailsClient({
  userId,
  initialUser = null,
  initialError = null,
  accessToken,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser && !initialError);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const fetchUser = useCallback(async () => {
    if (!accessToken || !userId) {
      setError("Missing access token or user identifier.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        accessToken,
      });
      setUser(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err instanceof Error ? err.message : "Failed to load user.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId]);

  useEffect(() => {
    if (!initialUser && userId && accessToken) {
      fetchUser();
    }
  }, [initialUser, userId, accessToken, fetchUser]);

  const handleGoBack = () => {
    router.push("/dashboard/users");
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleEditClose = () => {
    setEditModalVisible(false);
  };

  const handleUserUpdated = () => {
    fetchUser();
    message.success("User updated successfully");
  };

  const showDeleteConfirm = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteConfirm = async () => {
    if (!accessToken) {
      message.error("You are not authorized to delete this user.");
      return;
    }

    try {
      setDeleteLoading(true);

      await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        method: "DELETE",
        accessToken,
      });

      message.success("User deleted successfully");
      setDeleteModalVisible(false);
      router.push("/dashboard/users");
    } catch (err) {
      console.error("Error deleting user:", err);
      message.error(err instanceof Error ? err.message : "Failed to delete user.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="p-6">
        <Card>
          <p>User identifier is missing.</p>
          <Button onClick={handleGoBack} icon={<ArrowLeftOutlined />}>
            Back to Users
          </Button>
        </Card>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="p-6">
        <Card>
          <p>You are not authorized to view this user.</p>
          <Button onClick={() => router.push("/")} icon={<ArrowLeftOutlined />}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="mb-4"
        >
          Back to Users
        </Button>
        <Card className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button type="primary" onClick={fetchUser}>
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderUserRoles = () => {
    if (!user?.roles || !Array.isArray(user.roles)) {
      return <Tag color="blue">User</Tag>;
    }
    return user.roles.map((role) => (
      <Tag color="blue" key={role}>
        {role.toUpperCase()}
      </Tag>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="flex items-center"
        >
          Back to Users
        </Button>
        <div className="space-x-3">
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={handleEdit}
            className="bg-blue-600"
          >
            Edit User
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
          >
            Delete User
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar size={80} icon={<UserOutlined />} />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <div className="space-x-2">{renderUserRoles()}</div>
          </div>
        </div>

        <Divider />

        <Descriptions column={2}>
          <Descriptions.Item label="Email">
            <MailOutlined className="mr-2" />
            {user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            <PhoneOutlined className="mr-2" />
            {user.phone || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            <UserOutlined className="mr-2" />
            {user.username || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Account Status">
            <Tag color={user.isActive ? "green" : "red"}>
              {user.isActive ? "Active" : "Inactive"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Created On">
            <CalendarOutlined className="mr-2" />
            {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            <ClockCircleOutlined className="mr-2" />
            {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Profile Overview" key="1">
          <Card title="Account Details" className="mb-4">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: "Role Type",
                  description: user.type || "location_user",
                  icon: <TeamOutlined />,
                },
                {
                  title: "Account Status",
                  description: user.status || "active",
                  icon: <LockOutlined />,
                },
                {
                  title: "Assigned Locations",
                  description: Array.isArray(user.assignedLocations)
                    ? user.assignedLocations.length
                      ? user.assignedLocations
                          .map((location) =>
                            typeof location === "string"
                              ? location
                              : location?.name || location?._id
                          )
                          .join(", ")
                      : "None"
                    : "None",
                  icon: <EnvironmentOutlined />,
                },
                {
                  title: "Allow Universal Login",
                  description: user.allowUniversalLogin ? "Enabled" : "Disabled",
                  icon: <KeyOutlined />,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab="Login & Security" key="2">
          <Card title="Security Logs">
            <Timeline>
              <Timeline.Item color="green">
                Password changed recently
              </Timeline.Item>
              <Timeline.Item color="blue">
                Last login:{" "}
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt).toLocaleString()
                  : "N/A"}
              </Timeline.Item>
              <Timeline.Item color="red">
                Failed login attempts: {user.failedLoginAttempts || 0}
              </Timeline.Item>
            </Timeline>
          </Card>
        </TabPane>

        <TabPane tab="Activity Logs" key="3">
          <Card title="Recent Activity">
            <List
              itemLayout="vertical"
              dataSource={
                Array.isArray(user.activityLogs) && user.activityLogs.length > 0
                  ? user.activityLogs
                  : [
                      {
                        title: "No recent activity",
                        content:
                          "Activity details will appear here once available.",
                      },
                    ]
              }
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  extra={
                    item.timestamp ? (
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    ) : null
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<IdcardOutlined />} />}
                    title={item.title || "Activity"}
                    description={item.content || item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      <EditUser
        visible={editModalVisible}
        user={user}
        onClose={handleEditClose}
        onUserUpdated={handleUserUpdated}
        accessToken={accessToken}
      />

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        okText="Delete"
        okButtonProps={{ danger: true, loading: deleteLoading }}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ?
        </p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
}

export default UserDetailsClient;
