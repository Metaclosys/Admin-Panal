"use client";
import { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function NewOrder() {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <p className="text-lg text-gray-600">New Order</p>

        {/* Customer Search */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-700">
            ENTER CUSTOMER
          </label>
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow mt-1">
            <Input
              placeholder="Search by Name or Phone"
              className="w-full px-4 py-2 border-none"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            />
            <Button type="text" icon={<SearchOutlined />} className="p-2" />
          </div>
        </div>

        {/* Walk-in Button */}
        <div className="mt-4 flex justify-end">
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
          >
            Walk-in
          </Button>
        </div>

        {/* Add to Order Section */}
        <div className="mt-6 border border-gray-400 rounded-lg bg-blue-200 p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">ADD TO ORDER</h2>
          <Button
            type="text"
            icon={<PlusOutlined className="text-gray-700" />}
            className="p-2"
          />
        </div>

        {/* Order Summary */}
        <div className="mt-4 border border-gray-400 rounded-lg bg-blue-200 p-4">
          {/* Item */}
          <div className="flex justify-between text-black">
            <div>
              <h3 className="font-semibold">Yeti Rambler</h3>
              <p className="text-blue-600 text-sm">2 x $38.00 ea</p>
            </div>
            <span className="font-semibold">$76.00</span>
          </div>

          <hr className="my-2 border-gray-300" />

          {/* Subtotal */}
          <div className="flex justify-between text-black">
            <span>Subtotal</span>
            <span className="font-semibold">$76.00</span>
          </div>

          {/* Taxes */}
          <div className="flex justify-between text-black">
            <span>Taxes</span>
            <span>$7.13</span>
          </div>

          <hr className="my-2 border-gray-300" />

          {/* Total */}
          <div className="flex justify-between text-black">
            <span>Total</span>
            <span className="font-semibold">$83.13</span>
          </div>

          {/* Balance Due */}
          <div className="flex justify-between font-bold text-black text-lg mt-2">
            <span>Balance Due</span>
            <span>$83.13</span>
          </div>
        </div>

        {/* Proceed to Payment Button */}
        <div className="mt-6 flex justify-end">
          <Link href="/payment">
            <Button
              type="primary"
              className="bg-[#06283D] hover:bg-blue-800 text-white px-8 py-6 text-lg rounded-full"
            >
              Proceed to Payment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
