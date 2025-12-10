import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

function MiddleSection() {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">
            Payment Information
          </h2>
          <Link href="/dashboard/billing-center/editBilling-center">
            <Button className="text-gray-600 border-none">
              <FaEdit className="text-gray-600" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="border rounded p-2 w-12">
            <img
              src="/images/pngFiles/visa-logo.png"
              alt="Visa"
              className="w-full"
            />
          </div>
          <div>
            <p className="font-medium text-black">Ending in 9518</p>
            <p className="text-sm text-gray-500">Expires 08/2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Services</h2>
          <p className="text-sm text-gray-500">Next Bill: January 15, 2025</p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center py-2 border-b"
            >
              <p className="text-gray-700">Booker Ultimate Bundle</p>
              <p className="font-medium text-black">$376.92 / Month</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          * Prices do not include applicable promotions or taxes.
        </p>
      </div>
    </>
  );
}

export default MiddleSection;
