"use client";
import { Upload, Button } from "antd";
import Link from "next/link";

export default function TakeInventory() {
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

      <div className="mt-4">
        <p className="text-gray-700">
          If you have a Wireless Barcode Scanner, upload your file here.
        </p>
        <div className="flex flex-row mt-2 items-center gap-2">
          <p className="text-black">File</p>
          <Button className="bg-gray-400">Choose File</Button>
          <p className="text-black">No File Chosen</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700">
          If you are not utilizing wireless technology, we recommend that you
          first PRINT OUT the inventory forms for your staff to take away.
        </p>
        <a href="#" className="text-blue-500 underline">
          Enter Inventory Manually
        </a>
      </div>
    </div>
  );
}
