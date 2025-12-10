"use client";
import { useState } from "react";
import { Select, Button } from "antd";
import { PlusOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";

export default function WalkInOrder() {
  const [creditCard, setCreditCard] = useState(null);
  const [manualPayment, setManualPayment] = useState(null);
  const [creditType, setCreditType] = useState(null);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-black">Orders</h1>
        <p className="text-lg text-gray-600">New Order</p>

        {/* Walk-in Title + Icons */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold text-black">WALK-IN</h2>
          <div className="flex gap-2">
            <Button icon={<ReloadOutlined />} className="text-black" />
            <Button icon={<SaveOutlined />} className="text-black" />
          </div>
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

        {/* Payment Options */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {/* Credit Cards */}
          <div className="border border-gray-400 rounded-lg bg-blue-200 p-4">
            <h3 className="text-blue-700 font-semibold mb-2">CREDIT CARDS</h3>
            <Select
              className="w-full"
              placeholder="Choose"
              value={creditCard}
              onChange={setCreditCard}
              options={[
                { value: "card_reader", label: "Card Reader" },
                { value: "typed_in", label: "Typed In" },
              ]}
            />
          </div>

          {/* Manual Payments */}
          <div className="border border-gray-400 rounded-lg bg-blue-200 p-4">
            <h3 className="text-blue-700 font-semibold mb-2">
              MANUAL PAYMENTS
            </h3>
            <Select
              className="w-full"
              placeholder="Choose"
              value={manualPayment}
              onChange={setManualPayment}
              options={[
                { value: "cash", label: "Cash" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>

          {/* Credits */}
          <div className="border border-gray-400 rounded-lg bg-blue-200 p-4">
            <h3 className="text-blue-700 font-semibold mb-2">CREDITS</h3>
            <Select
              className="w-full"
              placeholder="Choose"
              value={creditType}
              onChange={setCreditType}
              options={[
                { value: "gift_certificates", label: "Gift Certificates" },
                { value: "series_benefits", label: "Series & Benefits" },
              ]}
            />
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            className="bg-[#06283D] hover:bg-blue-800 text-white px-8 py-6 text-lg rounded-full"
          >
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}
