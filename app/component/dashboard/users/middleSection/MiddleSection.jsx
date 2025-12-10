"use client";
import React from "react";
import { Button, Tag, Space, Popconfirm, message, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../api/apiContent/apiContent";
import UniversalTable from "../../table/universalTable";

// Enum mappings for display
const UserRoleColors = {
  admin: "blue",
  staff: "green", 
  document_manager: "purple",
  franchise: "orange",
  marketing: "pink",
  reporting: "cyan",
  reservationist: "geekblue",
  products: "gold",
  user_manager: "lime"
};

const UserStatusColors = {
  active: "green",
  inactive: "red",
  suspended: "orange"
};

function MiddleSection({ users = [], loading, onUserDeleted, accessToken }) {
  const router = useRouter();

  const handleViewUser = (userId) => {
    router.push(`/dashboard/users/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = accessToken || getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }

      await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      message.success("User deleted successfully");
      
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(`Failed to delete user: ${error.message}`);
    }
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar 
            size={40} 
            icon={<UserOutlined />} 
            src={record.avatar} 
            className="mr-3"
          />
          <div>
            <div className="font-medium">
              {`${record.firstName || ''} ${record.lastName || ''}`.trim() || record.name || 'Unnamed User'}
            </div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Username",
      key: "username",
    },
    {
      title: "Roles",
      key: "roles",
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record.roles && Array.isArray(record.roles) ? (
            record.roles.map((role, index) => (
              <Tag color={UserRoleColors[role] || "default"} key={index}>
                {role.toUpperCase().replace(/_/g, ' ')}
              </Tag>
            ))
          ) : (
            <Tag color={UserRoleColors[record.role] || "default"}>
              {record.role?.toUpperCase() || "USER"}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={UserStatusColors[record.status] || (record.isActive ? "green" : "red")}>
          {record.status?.toUpperCase() || (record.isActive ? "ACTIVE" : "INACTIVE")}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      key: "createdAt",
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record._id)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Popconfirm
            title="Delete this user?"
            description="Are you sure you want to delete this user? This action cannot be undone."
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <UniversalTable
        columns={columns}
        data={users.map(user => ({...user, key: user._id}))}
        loading={loading}
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
}

export default MiddleSection;
