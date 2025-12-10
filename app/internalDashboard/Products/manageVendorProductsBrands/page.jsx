"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import ReportTable from "../../../component/dashboard/table/reportTables";

export default function ManageProductBrands() {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () =>
    currentPage > 1
      ? setCurrentPage((prev) => prev - 1)
      : window.history.back();

  const tabs = [
    { id: 1, name: "Manage Vendors", icon: "⚙️" },
    { id: 2, name: "Manage Product Brands", icon: "🔄" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];

  const data = [
    {
      key: "1",
      name: "abc",
      address: "abc",
      dateCreated: "xxx",
      actions: "abc",
    },
    {
      key: "2",
      name: "abc",
      address: "abc",
      dateCreated: "xxx",
      actions: "abc",
    },
  ];

  const brandList = [
    "1821 Man Made",
    "XYZ Cosmetics",
    "Urban Styles",
    "Elite Skincare",
  ];

  const NavigationButtons = () => (
    <div className="flex justify-end gap-3 mt-6">
      <Button onClick={prevPage} className="border-black text-black">
        Back
      </Button>
      <Button
        type="primary"
        onClick={nextPage}
        className="bg-[#0F172A] text-white"
      >
        Continue
      </Button>
    </div>
  );

  const renderTabContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="p-6">
            <div className="flex flex-row items-center gap-4">
              <Form.Item label="Vendor Name" name="vendorSearch">
                <Input placeholder="Enter vendor name..." />
              </Form.Item>
              <div className="flex gap-2">
                <Button className="border-[#06283D] text-[#06283D] rounded-full py-4 px-6">
                  Reset
                </Button>
                <Button
                  type="primary"
                  className="bg-[#06283D] rounded-full py-4 px-6"
                >
                  Search
                </Button>
              </div>
            </div>
            <ReportTable data={data} columns={columns} />
          </div>
        );

      case 2:
        return (
          <div className="p-6">
            <div className="flex flex-row items-center gap-4">
              <Form.Item label="Vendor Name" name="vendorBrand">
                <Input placeholder="Enter vendor name..." />
              </Form.Item>
              <Button
                type="primary"
                className="bg-[#06283D] rounded-full py-4 px-8"
              >
                Add Product Brand
              </Button>
            </div>
            <div className="mt-6 space-y-3">
              {brandList.map((brand, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <h1 className="font-bold">{brand}</h1>
                  <div className="text-blue-500 cursor-pointer space-x-2">
                    <span className="hover:underline">Rename</span>
                    <span className="hover:underline">Remove</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-end items-center mb-4">
        <Link
          href="/internalDashboard/manageProducts/addProducts"
          className="bg-[#0F172A] text-white px-4 py-2 rounded-full hover:bg-opacity-90"
        >
          + Add a New Product
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Tabs Navigation */}
        <div className="flex border-b pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className={`flex-1 text-center py-2 font-medium ${
                currentPage === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <Form
          form={form}
          layout="vertical"
          onFinish={() => console.log("Submitted!")}
        >
          {renderTabContent()}
          <NavigationButtons />
        </Form>
      </div>
    </div>
  );
}
