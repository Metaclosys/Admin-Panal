"use client";
import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Space } from "antd";
import Link from "next/link";
import ReportTable from "../../../component/dashboard/table/reportTables";

function CustomerWebPage() {
    const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tabs = [
    { id: 1, name: "Select Field", icon: "⚙️" },
    { id: 2, name: "XXX", icon: "🔄" },
    { id: 3, name: "XXX", icon: "🔄" },
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
            <h2 className="text-2xl font-semibold text-center mb-6">Select Fields</h2>
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <h3 className="mb-2 text-sm font-medium">Available Fields</h3>
                <select multiple className="w-full h-48 border rounded-md p-2">
                  <option>Address City</option>
                  <option>Address Country</option>
                  <option>Address Postal Code</option>
                  <option>Address State</option>
                  <option>Address City</option>
                  <option>Address Country</option>
                  <option>Address Postal Code</option>
                  <option>Address State</option>
                  <option>Address City</option>
                  <option>Address Country</option>
                  <option>Address Postal Code</option>
                  <option>Address State</option>
                </select>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <button className="bg-gray-200 p-2 rounded-md">→</button>
                <button className="bg-gray-200 p-2 rounded-md">←</button>
              </div>
              <div className="w-1/2">
                <h3 className="mb-2 text-sm font-medium">Selected Fields</h3>
                <select multiple className="w-full h-48 border rounded-md p-2">
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Email</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex flex-row w-full items-center">
              <label className="block text-sm font-medium mb-2 w-1/4">Return URL*</label>
              <input 
                type="text" 
                className="w-full border rounded-md p-2"
                placeholder="Enter return URL"
              />
            </div>
              <p className="text-sm text-gray-500 mt-2">
                After Customers submit your form, they will be directed to the specified Return URL on your website, such as a "thank you" page.
              </p>
            <NavigationButtons />
          </div>
        );

      case 2:
        return (
          <div className="p-6">
            Page 2
          </div>
        );

      case 3:
        return (
          <div className="p-6">
            Page 3
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
        </Form>
      </div>
    </div>
  );
}


export default CustomerWebPage
