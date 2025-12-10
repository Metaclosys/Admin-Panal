"use client";
import React, { useState } from "react";
import { Button, Select, Input } from "antd";
import { FaSearch } from "react-icons/fa";

function UpperSection({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleSearch = () => {
    onSearch?.({
      searchTerm,
      status: statusFilter,
      type: typeFilter,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    onSearch?.({});
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
      </div>

      <div className="border rounded-md overflow-hidden">
        <div
          className="p-3 bg-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => setShowSearchBox(!showSearchBox)}
        >
          <span className="font-medium text-gray-700">Find an Employee</span>
          <Button type="text" className="border-none">
            {showSearchBox ? "-" : "+"}
          </Button>
        </div>

        {showSearchBox && (
          <div className="bg-[#47B5FF24] p-4 transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-4 gap-4 items-end">
              <div>
                <div className="text-sm text-gray-600 mb-2">Employee Name</div>
                <Input
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={<FaSearch className="text-gray-400" />}
                  className="w-full"
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Status</div>
                <Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                  placeholder="Select status"
                  className="w-full"
                  allowClear
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Employee Type</div>
                <Select
                  value={typeFilter}
                  onChange={(value) => setTypeFilter(value)}
                  placeholder="Select type"
                  className="w-full"
                  allowClear
                  options={[
                    { value: "inhouse", label: "In-house" },
                    { value: "contractor", label: "Contractor" },
                    { value: "temporary", label: "Temporary" },
                  ]}
                />
              </div>

              <div className="flex gap-2">
                <Button type="primary" onClick={handleSearch} className="bg-[#06283D] rounded-full">
                  Search
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpperSection;

