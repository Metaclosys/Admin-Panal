"use client";
import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function NewOrder() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: "Services",
      icon: "📋",
      enabled: true,
      path: "/internalDashboard/GiftandOrder/newOrder/services",
    },
    {
      name: "Products",
      icon: "🔲",
      enabled: true,
      path: "/internalDashboard/GiftandOrder/newOrder/products",
    },
    { name: "Series", icon: "🛍️", enabled: false, path: "/internalDashboard/GiftandOrder/newOrder/series" },
    { name: "Tips", icon: "🤲", enabled: true, path: "/internalDashboard/GiftandOrder/newOrder/tips" },
    {
      name: "Memberships",
      icon: "🏅",
      enabled: false,
      path: "/internalDashboard/GiftandOrder/newOrder/memberships",
    },
    {
      name: "Gift Certificates",
      icon: "🎁",
      enabled: true,
      path: "/internalDashboard/GiftandOrder/newOrder/checkout",
    },
    {
      name: "Specials",
      icon: "⭐",
      enabled: false,
      path: "/internalDashboard/GiftandOrder/newOrder/specials",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between gap-6">
        {/* Customer Search */}
        <div className="w-full max-w-md flex items-center mt-4 bg-white rounded-lg overflow-hidden shadow">
          <Input
            placeholder="Search by Name or Phone"
            className="w-full px-4 py-2 border-none"
          />
          <Button type="text" icon={<SearchOutlined />} className="p-2" />
        </div>

        {/* Walk-in Button */}
        <Link href={`/internalDashboard/GiftandOrder/newOrder/walkin`}>
          <Button
            type="primary"
            className="mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-2"
          >
            Walk-in
          </Button>
        </Link>
      </div>

      {/* Add to Order Section */}
      <div className="flex flex-col items-center">
        <div className="mt-6 w-full max-w-3xl bg-blue-200 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black mb-4">
            ADD TO ORDER
          </h2>

          {/* Category Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {categories.slice(0, 4).map((category, index) => (
              <Link href={category.enabled ? category.path : "#"} key={index}>
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-md shadow w-full ${
                    category.enabled
                      ? selectedCategory === category.name
                        ? "border-blue-600 bg-white"
                        : "border-gray-300 bg-white hover:border-blue-400"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    category.enabled && setSelectedCategory(category.name)
                  }
                  disabled={!category.enabled}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="mt-2 text-black font-medium">
                    {category.name}
                  </span>
                </button>
              </Link>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-4">
            {categories.slice(4).map((category, index) => (
              <Link href={category.enabled ? category.path : "#"} key={index}>
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-md shadow w-full ${
                    category.enabled
                      ? selectedCategory === category.name
                        ? "border-blue-600 bg-white"
                        : "border-gray-300 bg-white hover:border-blue-400"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    category.enabled && setSelectedCategory(category.name)
                  }
                  disabled={!category.enabled}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="mt-2 text-black font-medium">
                    {category.name}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
