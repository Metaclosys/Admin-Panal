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
} from "antd";
import UniversalTable from "../../../component/dashboard/table/universalTable";
import Link from "next/link";

const { Panel } = Collapse;

function ManageOrderspage() {

  const columns = [
    {
      title: "Order Date",
      key: "orderDate",
    },
    {
      title: "Order Number",
      key: "orderNumber",
      render: (text) => (
        <Link
          href={`/internalDashboard/GiftandOrder/reports/Accounting/new_reservations_detail_by_location/location_Clicked`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Customer Name",
      key: "customerName",
    },
    {
      title: "Order Items",
      key: "orderItems",
      render: (text) => (
        <Link
          href={`/internalDashboard/GiftandOrder/reports/Accounting/new_reservations_detail_by_location/location_Clicked`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Tax",
      key: "tax",
    },
    {
      title: "Total Tips",
      key: "totalTips",
    },
    {
      title: "Total Price",
      key: "totalPrice",
    },
    {
      title: "Payment Method",
      key: "paymentMethod",
    },
    {
      title: "Recipt Number",
      key: "reciptNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button
            type="link"
            className="text-blue-600 hover:underline border-r-2 pr-2"
          >
            Edit
          </Button>
          |
          <Button type="link" className="text-blue-600 hover:underline">
            History
          </Button>
        </Space>
      ),
    },
  ];

  // Sample data for the table
  const data = [
    {
      key: "1",
      orderDate: "abc",
      orderNumber: "abc",
      status: "xxx",
      customerName: "abc",
      orderItems: "abc",
      tax: "xxx",
      totalTips: "xxx",
      totalPrice: "xxx",
      paymentMethod: "xxx",
      reciptNumber: "xxx",
    },
    {
      key: "2",
      orderDate: "abc",
      orderNumber: "abc",
      status: "xxx",
      customerName: "abc",
      orderItems: "abc",
      tax: "xxx",
      totalTips: "xxx",
      totalPrice: "xxx",
      paymentMethod: "xxx",
      reciptNumber: "xxx",
    },
    {
      key: "3",
      orderDate: "abc",
      orderNumber: "abc",
      status: "xxx",
      customerName: "abc",
      orderItems: "abc",
      tax: "xxx",
      totalTips: "xxx",
      totalPrice: "xxx",
      paymentMethod: "xxx",
      reciptNumber: "xxx",
    },
    {
      key: "4",
      orderDate: "abc",
      orderNumber: "abc",
      status: "xxx",
      customerName: "abc",
      orderItems: "abc",
      tax: "xxx",
      totalTips: "xxx",
      totalPrice: "xxx",
      paymentMethod: "xxx",
      reciptNumber: "xxx",
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
              <div className="text-sm text-gray-600 mb-2">Booking #</div>
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
              <Select defaultValue="selectCategoryFirst" className="w-full">
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="selectCategoryFirst">
                  Select Category First
                </Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Product Brand</div>
              <Select defaultValue="any" className="w-full">
                <Select.Option value="any">Any</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Vendor</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">filter By</div>
              <Select defaultValue="all" className="w-full">
                <Select.Option value="all">All</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Date added</div>
              <Select defaultValue="anyDate" className="w-full">
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="anyDate">Any Date</Select.Option>
              </Select>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Last Updated</div>
              <Select defaultValue="anyDate" className="w-full">
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="anyDate">Any Date</Select.Option>
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

      {/* Viewing Section */}
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex flex-row items-center gap-2">
          <div>
            <div className="text-sm text-gray-600 mb-2">View</div>
            <Select defaultValue="default" classname="w-24">
              <Select.Option value="default">Flat Sortable</Select.Option>
            </Select>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Date Range</div>
            <Select defaultValue="date" style={{ width: 120 }}>
              <Select.Option value="date">Select Dates</Select.Option>
            </Select>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">&nbsp;</div>
            <DatePicker className="w-[200px]" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 ">
          <div className="flex flex-row items-center gap-1">
            <GiKnifeFork className="text-black" />
            <p className="text-black">Cutomizeable View</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <MdLocalPrintshop className="text-black" />
            <p className="text-black">Print</p>
          </div>
        </div>
      </div>

      {/* Export Csv Btn Section */}
      <div className="flex justify-end items-center gap-2 mb-4">
        {/* see later the icon is creating an error */}
        {/* <RiExportFill /> */}
        <Button type="primary" className="bg-transparent text-blue-500">
          Export CSV
        </Button>
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

export default ManageOrderspage;
