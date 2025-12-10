"use client";
import React, { useState } from "react";
import { Button, Select, Input, Space } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import AddShop from "../addShop/addShop";

function TopSection({ onShopAdded, onSearch, onLocationFilter, canAddShop = true }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAddShopModalOpen, setIsAddShopModalOpen] = useState(false);

  // Handle search input changes with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  // Handle location filter changes
  const handleLocationChange = (value) => {
    setLocationFilter(value);
    onLocationFilter?.(value);
  };

  const handleShopAdded = () => {
    setIsAddShopModalOpen(false);
    onShopAdded?.();
  };

  return (
    <div className="p-6 mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Shops Management
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Space size="middle" className="w-full md:w-auto">
          <Input
            placeholder="Search shops..."
            prefix={<FaSearch className="text-gray-400" />}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-64"
            allowClear
          />

          <Select
            placeholder="Filter by location"
            className="w-full md:w-48"
            value={locationFilter || undefined}
            onChange={handleLocationChange}
            allowClear
            options={[
              { value: "san jose", label: "San Jose" },
              { value: "san francisco", label: "San Francisco" },
              { value: "los angeles", label: "Los Angeles" },
              { value: "new york", label: "New York" },
            ]}
          />
        </Space>

        {canAddShop && (
          <Button
            type="primary"
            icon={<FaPlus />}
            size="large"
            className="bg-[#0F172A] hover:bg-[#1E293B] border-none w-full md:w-auto"
            onClick={() => setIsAddShopModalOpen(true)}
          >
            Add New Shop
          </Button>
        )}
      </div>

      {canAddShop && (
        <AddShop
          open={isAddShopModalOpen}
          onClose={() => setIsAddShopModalOpen(false)}
          onShopAdded={handleShopAdded}
        />
      )}
    </div>
  );
}

export default TopSection;


