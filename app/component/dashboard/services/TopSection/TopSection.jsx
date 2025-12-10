"use client";
import { React } from "react";
import Link from "next/link";
import { Button, Select, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

function TopSection({ onServiceAdded, onSearch, onCategoryFilter }) {
  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleCategoryChange = (value) => {
    if (onCategoryFilter) {
      onCategoryFilter(value);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600">Check all services of your shop.</p>
        </div>
        <Link href={`/dashboard/services/addService`}>
          <Button
            icon={<PlusOutlined />}
            shape="round"
            className="bg-[#0F172A] text-white hover:bg-opacity-90"
            size="large"
          >
            Add a New Service
          </Button>
        </Link>
      </div>
      {/* Search and Filter Controls */}
      <div className="flex justify-between gap-4 mb-6">
        <div className="relative">
          <Input
            placeholder="Search Service by Name"
            prefix={<SearchOutlined className="text-gray-400" />}
            onChange={handleSearch}
            className="w-[300px]"
            allowClear
          />
        </div>

        <div className="flex gap-2">
          <Select
            className="w-40"
            size="large"
            placeholder="Filter by Status"
            onChange={handleCategoryChange}
            allowClear
            options={[
              {
                value: "active",
                label: "Active",
              },
              {
                value: "inactive",
                label: "Inactive",
              },
            ]}
          />

          <Select
            className="w-50"
            size="large"
            placeholder="Filter by Category"
            onChange={handleCategoryChange}
            allowClear
            options={[
              {
                value: "haircut",
                label: "Haircut",
              },
              {
                value: "styling",
                label: "Styling",
              },
              {
                value: "coloring",
                label: "Coloring",
              },
              {
                value: "treatment",
                label: "Treatment",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default TopSection;
