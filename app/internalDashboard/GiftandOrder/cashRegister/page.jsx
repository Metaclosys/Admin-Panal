"use client";
import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Space } from "antd";
import Link from "next/link";
import ReportTable from "../../../component/dashboard/table/reportTables";

export default function CashRegister() {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tabs = [
    { id: 1, name: "Payouts", icon: "⚙️" },
    { id: 2, name: "Payins", icon: "🔄" },
    { id: 3, name: "End of the Day", icon: "🔄" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "# Order",
      dataIndex: "order",
      key: "order",
      render: (text) => (
        <Link
          href={`/internalDashboard/GiftandOrder/reports/Accounting/new_reservations_detail_by_location/location_Clicked`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link" className="text-blue-600 hover:underline">
            Edit
          </Button>
          <Button type="link" className="text-red-600 hover:underline">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "abc",
      type: "xxx",
      amount: "xxx",
      order: "xxx",
      comment: "xxx",
      date: "xxx",
    },
    {
      key: "2",
      name: "abc",
      type: "xxx",
      amount: "xxx",
      order: "xxx",
      comment: "xxx",
      date: "xxx",
    },
    {
      key: "3",
      name: "abc",
      type: "xxx",
      amount: "xxx",
      order: "xxx",
      comment: "xxx",
      date: "xxx",
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
      <Button
        onClick={prevPage}
        className="border-black text-black"
        disabled={currentPage === 1}
      >
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">on</div>
                  <Select defaultValue="date" style={{ width: 120 }}>
                    <Select.Option value="date">Select Dates</Select.Option>
                  </Select>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">&nbsp;</div>
                  <DatePicker className="w-[200px]" />
                </div>
              </div>

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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">on</div>
                  <Select defaultValue="date" style={{ width: 120 }}>
                    <Select.Option value="date">Select Dates</Select.Option>
                  </Select>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">&nbsp;</div>
                  <DatePicker className="w-[200px]" />
                </div>
              </div>

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
            <p className="underline text-blue-500">New Product</p>
            <p className="text-gray-500">
              There are no payments that match your criteria.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="p-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Close out to</div>
                  <Select defaultValue="date" style={{ width: 120 }}>
                    <Select.Option value="date">Select Dates</Select.Option>
                  </Select>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">&nbsp;</div>
                  <DatePicker className="w-[200px]" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="primary"
                  className="bg-[#06283D] rounded-full py-4 px-6"
                >
                  Run
                </Button>
              </div>
            </div>
            <p className="flex text-gray-500 gap-2">
              <span className="font-bold text-black">Cash Register</span>End of
              the Day.
            </p>
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
          href="/internalDashboard/Products/manageProducts/addProducts"
          className="bg-[#0F172A] text-white px-4 py-2 rounded-full hover:bg-opacity-90"
        >
          + Add a New Product
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
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
