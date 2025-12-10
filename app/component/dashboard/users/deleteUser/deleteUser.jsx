"use client";
import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { deleteUserById, getAccessToken } from "../../../../api/apiContent/apiContent";

function DeleteUser({ user, visible, onCancel, onSuccess }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const accessToken = session?.accessToken || getAccessToken();
      
      if (!accessToken) {
        throw new Error("No access token available");
      }
      
      await deleteUserById(user._id, accessToken);
      
      message.success("User deleted successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(`Failed to delete user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete User"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          loading={loading}
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      <p className="font-semibold mt-2">{user?.name}</p>
    </Modal>
  );
}

export default DeleteUser; 