"use client";
import { useState } from "react";
import { Input, Button } from "antd";
import UniversalTable from "../../../component/dashboard/table/universalTable";

export default function InvalidCreditCard() {
  const columns = [
    {
      title: "Customer ID",
      key: "customerId",
    },
    {
      title: "Customer Name",
      key: "customerName",
    },
    {
      title: "Customer Email",
      key: "customerEmail",
    },
    {
      title: "CreditCard Last 4 Digits",
      key: "cardLastDigits",
    },
    {
      title: "CreditCard Type",
      key: "cardType",
    },
    {
      title: "CreditCard Expiry Date",
      key: "cardExpiry",
    },
    {
      title: "CreditCard LastUpdated",
      key: "cardLastUpdated",
    },
    {
      title: "CreditCard Status",
      key: "cardStatus",
    },
    {
      title: "Reason",
      key: "reason",
    },
    {
      title: "OnTransaction Date",
      key: "transactionDate",
    },
    {
      title: "Memberships Impacted",
      key: "membershipsImpacted",
    },
  ];

  const data = [
    {
      key: "1",
      customerId: "xxx",
      customerName: "xxx",
      customerEmail: "xxx",
      cardLastDigits: "xxx",
      cardType: "xxx",
      cardExpiry: "xxx",
      cardLastUpdated: "xxx",
      cardStatus: "xxx",
      reason: "xxx",
      transactionDate: "xxx",
      membershipsImpacted: "xxx",
    },
    {
      key: "2",
      customerId: "xxx",
      customerName: "xxx",
      customerEmail: "xxx",
      cardLastDigits: "xxx",
      cardType: "xxx",
      cardExpiry: "xxx",
      cardLastUpdated: "xxx",
      cardStatus: "xxx",
      reason: "xxx",
      transactionDate: "xxx",
      membershipsImpacted: "xxx",
    },
    {
      key: "3",
      customerId: "xxx",
      customerName: "xxx",
      customerEmail: "xxx",
      cardLastDigits: "xxx",
      cardType: "xxx",
      cardExpiry: "xxx",
      cardLastUpdated: "xxx",
      cardStatus: "xxx",
      reason: "xxx",
      transactionDate: "xxx",
      membershipsImpacted: "xxx",
    },
    {
      key: "4",
      customerId: "xxx",
      customerName: "xxx",
      customerEmail: "xxx",
      cardLastDigits: "xxx",
      cardType: "xxx",
      cardExpiry: "xxx",
      cardLastUpdated: "xxx",
      cardStatus: "xxx",
      reason: "xxx",
      transactionDate: "xxx",
      membershipsImpacted: "xxx",
    },
  ];

  return (
    <div className="p-6">
      {/* Search Section */}
      <div className=" flex flex-row gap-4 mb-4">
        <div className="flex flex-col justify-between">
          <div className="text-sm text-gray-600 mb-2">Customer Name</div>
          <Input placeholder="Customer Name" className="w-full" />
        </div>
        <Button type="primary" className="bg-[#06283D] rounded-full mt-7">
          Search
        </Button>
      </div>

      {/* Table */}
      <UniversalTable
        columns={columns}
        data={data}
        loading={false}
        rowClassName={(record) => "cursor-pointer"}
      />
    </div>
  );
}
