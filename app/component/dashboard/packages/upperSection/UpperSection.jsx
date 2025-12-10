"use client";
import { useState } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function UpperSection({ onPackageAdded, onSearch }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleAddPackage = () => {
    router.push("/dashboard/packages/addPackage");
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Manage your service packages here. Create, edit, or delete packages as
          needed.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="Search packages..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-md"
          />
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddPackage}
          className="bg-[#0F172A] hover:bg-[#1E293B]"
        >
          Add New Package
        </Button>
      </div>
    </div>
  );
}

export default UpperSection;
