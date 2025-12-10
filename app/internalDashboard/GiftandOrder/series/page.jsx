"use client";
import { React, useState } from "react";
import { RiExportFill } from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";
import { MdLocalPrintshop } from "react-icons/md";
import {
  Input,
  Select,
  Button,
  Space,
  DatePicker,
  Card,
  Collapse,
  Checkbox,
} from "antd";
import UniversalTable from "../../../component/dashboard/table/universalTable";
import Link from "next/link";

const { Panel } = Collapse;

function ManageProductspage() {

  const columns = [
    {
      title: "Series Number",
      key: "seriesNumber",
    },
    {
      title: "Series Name",
      key: "seriesName",
    },
    {
      title: "Customer Name",
      key: "customerName",
    },
    {
      title: "Date Issued",
      key: "dateIssued",
    },
    {
      title: "Purchase Amount",
      key: "purchaseAmount",
    },
    {
      title: "Orignal Quality",
      key: "orignalQuality",
    },
    {
      title: "Remaining",
      key: "remaining",
    },
    {
      title: "Expiration",
      key: "expiration",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button
            type="link"
            className="text-blue-600 hover:underline border-r-2  pr-2"
          >
            Edit
          </Button>
          |
          <Button type="link" className="text-blue-600 hover:underline">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Sample data for the table
  const data = [
    {
      key: "1",
      seriesNumber: "abc",
      seriesName: "xxx",
      customerName: "xxx",
      dateIssued: "abc",
      purchaseAmount: "xxx",
      orignalQuality: "xxx",
      remaining: "xxx",
      expiration: "xxx",
      status: "xxx",
    },
    {
      key: "2",
      seriesNumber: "abc",
      seriesName: "xxx",
      customerName: "xxx",
      dateIssued: "abc",
      purchaseAmount: "xxx",
      orignalQuality: "xxx",
      remaining: "xxx",
      expiration: "xxx",
      status: "xxx",
    },
    {
      key: "3",
      seriesNumber: "abc",
      seriesName: "xxx",
      customerName: "xxx",
      dateIssued: "abc",
      purchaseAmount: "xxx",
      orignalQuality: "xxx",
      remaining: "xxx",
      expiration: "xxx",
      status: "xxx",
    },
    {
      key: "4",
      seriesNumber: "abc",
      seriesName: "xxx",
      customerName: "xxx",
      dateIssued: "abc",
      purchaseAmount: "xxx",
      orignalQuality: "xxx",
      remaining: "xxx",
      expiration: "xxx",
      status: "xxx",
    },
  ];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
      <div className="mb-4">
        <div className="p-3 border-b flex text-black justify-between items-center bg-gray-300 mb-2">
          <span className="font-medium">Search Criteria</span>
          <Button type="text">+</Button>
        </div>
        <div className="bg-[#47B5FF24] rounded-md p-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div>
              <div className="text-sm text-gray-600 mb-2">Series Number</div>
              <Input placeholder="" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Status</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">
                Customer Full Name
              </div>
              <Input placeholder="" className="w-full" />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Checkbox className="items-center">
              Only show this location's customers
            </Checkbox>
            ;
            <div className="flex gap-2">
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
      </div>

      {/* Bulk Selections */}
      <div className="flex justify-start items-center gap-2 mb-4">
        <Link
          href="/internalDashboard/manageProducts/addProducts"
          className="bg-[#0F172A] text-white px-4 py-2 rounded-full hover:bg-opacity-90"
        >
          Set Bulk Expiration Date
        </Link>
      </div>

      {/* Viewing Section */}
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex flex-row items-center gap-2">
          <div>
            <Checkbox className="items-center">
              Select All (Max 5000 records)
            </Checkbox>
          </div>
          <div>
            <Checkbox className="items-center">Include Expired</Checkbox>
          </div>
          <div>
            <DatePicker className="w-[200px]" />
          </div>
          <div>
            <p className="text-blue-500">Save</p>
          </div>
          <div>
            <p className="text-blue-500">Cancel</p>
          </div>
        </div>
      </div>

      <UniversalTable
        columns={columns}
        data={data}
        loading={false}
        rowClassName={(record) => "cursor-pointer"}
      />
    </div>
  );
}

export default ManageProductspage;
