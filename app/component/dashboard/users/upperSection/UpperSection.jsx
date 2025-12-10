"use client";
import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import AddUser from "../addUsers/addUser";

const { Option } = Select;

function UpperSection({ onUserAdded, onSearch, onRoleFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);

  const handleSearch = (value) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleRoleChange = (value) => {
    if (onRoleFilter) {
      onRoleFilter(value);
    }
  };

  const handleUserAdded = () => {
    if (onUserAdded) {
      onUserAdded();
    }
  };

  return (
    <div className="mb-8">
      <p className="text-gray-600 mb-6">
        Manage system users and their permissions.
      </p>

      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 flex-1">
          <div className="relative">
            <Input
              placeholder="Search users"
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64"
            />
          </div>

          <Select
            placeholder="Filter by role"
            style={{ width: 150 }}
            onChange={handleRoleChange}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
            <Option value="staff">Staff</Option>
          </Select>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New User
        </Button>
      </div>

      <AddUser
        visible={showAddUser}
        onClose={() => setShowAddUser(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
}

export default UpperSection;
