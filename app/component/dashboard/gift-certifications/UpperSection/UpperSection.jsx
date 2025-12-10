"use client";
import { React, useState } from "react";
import { Input, Select, DatePicker, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;
const { Option } = Select;

function UpperSection({ onSearch, onFilterChange }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onSearch({
      searchText,
      dateRange: dateRange
        ? [dateRange[0].format("YYYY-MM-DD"), dateRange[1].format("YYYY-MM-DD")]
        : null,
      status,
    });
  };

  const handleAddNew = () => {
    // router.push("/dashboard/gift-certifications/new");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Gift Certificates
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all gift certificates and cards
          </p>
        </div>
        {/* <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddNew}
          className="bg-blue-600"
        >
          Add New Certificate
        </Button> */}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Input
          placeholder="Search by certificate number, customer..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
        />

        <RangePicker
          className="w-full"
          placeholder={["Start Date", "End Date"]}
          onChange={(dates) => setDateRange(dates)}
        />

        <Select
          placeholder="Status"
          className="w-full"
          allowClear
          value={status}
          onChange={(value) => setStatus(value)}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
          <Option value="Expired">Expired</Option>
          <Option value="Redeemed">Redeemed</Option>
        </Select>

        <Button type="primary" onClick={handleSearch} className="bg-blue-600">
          Search
        </Button>
      </div>
    </div>
  );
}

export default UpperSection;
