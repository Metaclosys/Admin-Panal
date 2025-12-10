"use client";
import React, { useState } from "react";
import { Select, Input, Checkbox, Button } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import ReportTable from "../../../../../component/dashboard/table/reportTables";
import { useRouter } from "next/navigation";

export default function MembershipCharge() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState("This Month");
  const [customerName, setCustomerName] = useState("");
  const [dayToCharge, setDayToCharge] = useState("1");
  const [onlyActiveMemberships, setOnlyActiveMemberships] = useState(true);
  const [filters, setFilters] = useState({
    selectAll: false,
    scheduled: false,
    skippedNotCharged: false,
    movedOnAccount: false,
    scheduledRetryOnly: false,
    chargedSuccess: false,
    chargedFailed: false,
    notMovedLimitExceeded: false,
    creditCard: false,
    cash: false,
  });

  const handleViewStatement = (membershipId) => {
    router.push(
      `/internalDashboard/reports/allReport/bulkcharge/membership_charge/statement/${membershipId}`
    );
  };

  const columns = [
    {
      title: "Membership Period",
      dataIndex: "membershipId",
      render: (text) => (
        <a
          onClick={() => handleViewStatement(text)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          {text}
        </a>
      ),
    },
    { title: "Customer", dataIndex: "customer" },
    { title: "Membership", dataIndex: "membership" },
    { title: "Day of Month To Charge", dataIndex: "dayToCharge" },
    { title: "Signup Day Of Month", dataIndex: "signupDay" },
    { title: "Order#", dataIndex: "orderId" },
    { title: "Charge To", dataIndex: "chargeTo" },
    { title: "Transaction ID", dataIndex: "transactionId" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <a 
          onClick={() => handleViewStatement(record.membershipId)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          View Statement
        </a>
      ),
    },
  ];

  const mockData = [
    {
      key: "1",
      membershipId: "100744223995",
      customer: "Karan Cheema",
      membership: "Monthly Membership",
      dayToCharge: "1",
      signupDay: "15",
      orderId: "ORD123456",
      chargeTo: "Credit Card",
      transactionId: "TXN789012",
      amount: "$379.00",
      status: "Scheduled",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Search Criteria</h2>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <span className="block mb-2 text-black">Date Range</span>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
              options={[
                { value: "This Month", label: "This Month" },
                { value: "Last Month", label: "Last Month" },
                // Add more options as needed
              ]}
            />
          </div>
          <div>
            <span className="block mb-2 text-black">Customer Name</span>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <span className="block mb-2 text-black">Day of Month To Charge</span>
            <Select
              value={dayToCharge}
              onChange={setDayToCharge}
              className="w-full"
              options={Array.from({ length: 31 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>
        </div>

        <div className="mb-4">
          <Checkbox
            checked={onlyActiveMemberships}
            onChange={(e) => setOnlyActiveMemberships(e.target.checked)}
          >
            Only Active Memberships
          </Checkbox>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-gray-400 rounded p-3">
            <Checkbox
              checked={filters.selectAll}
              onChange={(e) =>
                setFilters({ ...filters, selectAll: e.target.checked })
              }
            >
              Select All
            </Checkbox>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Checkbox checked={filters.scheduled}>Scheduled</Checkbox>
              <Checkbox checked={filters.skippedNotCharged}>
                Skipped (Not Charged)
              </Checkbox>
              <Checkbox checked={filters.movedOnAccount}>
                Moved - On Account
              </Checkbox>
              <Checkbox checked={filters.scheduledRetryOnly}>
                Scheduled - Retry Only
              </Checkbox>
              <Checkbox checked={filters.chargedSuccess}>
                Charged - Success
              </Checkbox>
              <Checkbox checked={filters.chargedFailed}>
                Charged - Failed
              </Checkbox>
              <Checkbox checked={filters.notMovedLimitExceeded}>
                Not Moved - Limit Exceeded
              </Checkbox>
            </div>
          </div>
          <div className="border border-gray-400 rounded p-3">
            <div className="flex gap-4">
              <Checkbox checked={filters.creditCard}>Credit Card</Checkbox>
              <Checkbox checked={filters.cash}>Cash</Checkbox>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              type="primary"
              className="bg-[#0F172A]"
              size="large"
              shape="round"
            >
              Search
            </Button>
            <Button size="large" shape="round">
              Reset
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="primary" className="bg-blue-500" size="large">
              Skip Donot Charge Selected
            </Button>
            <Button type="primary" className="bg-blue-500" size="large">
              Charge Selected
            </Button>
            <Button type="primary" className="bg-blue-500" size="large">
              Suspend Selected Memberships
            </Button>
            <Button type="primary" className="border-blue-500 bg-transparent text-blue-500" size="large">
              Automate Membership Charge Processing
            </Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <ReportTable columns={columns} data={mockData} loading={false} />
    </div>
  );
}
