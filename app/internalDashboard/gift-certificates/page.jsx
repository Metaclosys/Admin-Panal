"use client";
import { useState } from "react";
import { Select, Button } from "antd";
import UniversalTable from "../../component/dashboard/table/universalTable";
import { useSession } from "next-auth/react";
import useFetchData from "../../hooks/useFetchData";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";

export default function GiftCertificatesPage() {
  const { data: session } = useSession();
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { data: certificates, loading } = useFetchData(async () => {
    try {
      if (!session?.accessToken) {
        throw new Error("No access token found in session. Please log in again.");
      }
      
      const data = await apiCall(API_ENDPOINTS.GIFT_CERTIFICATES.BASE, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      });
      return data;
    } catch (error) {
      console.error("Error fetching gift certificates:", error);
      throw error;
    }
  }, {
    loadOnMount: true,
  });

  const columns = [
    {
      title: "Gift Certificates/Card #",
      key: "certificateId", 
      dataIndex: "certificateId",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Customer",
      key: "customer",
      dataIndex: "customer",
    },
    {
      title: "Date Issued",
      key: "dateIssued",
      dataIndex: "dateIssued",
    },
    {
      title: "Date Expires",
      key: "dateExpires",
      dataIndex: "dateExpires",
    },
    {
      title: "Original Amount",
      key: "originalAmount",
      dataIndex: "originalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "From",
      key: "from",
      dataIndex: "from",
    },
    {
      title: "To",
      key: "to",
      dataIndex: "to",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2 text-blue-500">
          <button className="hover:underline">View</button>
          <span>|</span>
          <button className="hover:underline">Email</button>
          <span>|</span>
          <button className="hover:underline">History</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Search Criteria Section */}
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Search Criteria</span>
          <Button type="text">+</Button>
        </div>

        <div className="flex gap-4 items-center">
          <Select
            placeholder="Select Date Range"
            className="w-48"
            onChange={setSelectedDateRange}
            allowClear
          >
            <Select.Option value="today">Today</Select.Option>
            <Select.Option value="yesterday">Yesterday</Select.Option>
            <Select.Option value="last7days">Last 7 Days</Select.Option>
            <Select.Option value="last30days">Last 30 Days</Select.Option>
            <Select.Option value="custom">Custom Range</Select.Option>
          </Select>

          <Select
            placeholder="Select Statuses"
            className="w-48"
            onChange={setSelectedStatus}
            allowClear
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="expired">Expired</Select.Option>
            <Select.Option value="redeemed">Redeemed</Select.Option>
          </Select>

          <Select
            placeholder="Select Location"
            className="w-48"
            onChange={setSelectedLocation}
            allowClear
          >
            <Select.Option value="all">All Locations</Select.Option>
            <Select.Option value="location1">Location 1</Select.Option>
            <Select.Option value="location2">Location 2</Select.Option>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <UniversalTable columns={columns} data={certificates} loading={loading} />
    </div>
  );
}
