"use client";
import { React, useState } from "react";
import {
  Input,
  Select,
  Button,
  Space,
  DatePicker,
  Card,
  Collapse,
} from "antd";
import UniversalTable from "../../../component/dashboard/table/universalTable";
import Link from "next/link";

const { Panel } = Collapse;

function ManagePurchaseOrdersPage() {

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600 text-sm ">Gents Barber - San Jose</p>
        </div>
        <Link
          href="/internalDashboard/manageProducts/addProducts"
          className="bg-[#0F172A] text-white px-4 py-2 rounded-full hover:bg-opacity-90"
        >
          + Add a New Product
        </Link>
      </div>
      {/* Search Criteria Section */}
      <div className="mb-4">
        <div className="p-3 border-b flex text-black justify-between items-center bg-gray-300 mb-2">
          <span className="font-medium">Search Criteria</span>
          <Button type="text">+</Button>
        </div>
        <div className="bg-[#47B5FF24] rounded-md p-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div>
              <div className="text-sm text-gray-600 mb-2">P.O. #</div>
              <Input placeholder="" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">P.O. Name</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">P.O. Status</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Date Range</div>
              <Select defaultValue="anyDate" className="w-full">
                <Select.Option value="anyDate">Any Date</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Vendor</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Scan Product</div>
              <Input placeholder="" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Product Name</div>
              <Input placeholder="" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Category</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Subcategory</div>
              <Select
                placeholder="Select Category First"
                defaultValue="all"
                className="w-full"
              >
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Product Brand</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="primary"
              className="bg-transparent text-[#06283D] border-[#06283D] rounded-full py-4 px-8"
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="bg-[#06283D] rounded-full py-4 px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* here will be the resuylt that would be a resutl of the search */}
    </div>
  );
}

export default ManagePurchaseOrdersPage;
