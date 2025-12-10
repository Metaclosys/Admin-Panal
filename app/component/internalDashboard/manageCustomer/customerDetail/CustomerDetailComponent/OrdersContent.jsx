"use client";
import { Select, DatePicker, Button, Table } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

function OrdersContent() {
  // Table columns configuration
  const columns = [
    {
      title: "Booking #",
      dataIndex: "bookingNo",
      key: "bookingNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Appointment on",
      dataIndex: "appointmentOn",
      key: "appointmentOn",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Button type="link" className="text-blue-500 p-0">
          View
        </Button>
      ),
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      bookingNo: "xxx",
      status: "xxx",
      staff: "xxx",
      service: "xxx",
      room: "xxx",
      appointmentOn: "xxx",
      dateCreated: "xxx",
    },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-230px)]">
      {/* Search Criteria */}
      <div className="bg-gray-100 p-4 rounded">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Search Criteria</h3>
          <button className="text-gray-500">
            <span className="transform rotate-180 inline-block">▼</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Status Filter */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Status</label>
            <Select
              defaultValue="All"
              className="w-full"
              options={[{ value: "All", label: "All" }]}
            />
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600 block mb-1">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <DatePicker className="w-full" placeholder="From" />
                <span>To</span>
                <DatePicker className="w-full" placeholder="To" />
              </div>
            </div>
          </div>

          {/* Search Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="primary" className="bg-blue-900">
              Search
            </Button>
            <Button>Reset</Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="w-full"
        />
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <Button icon={<PrinterOutlined />}>Print</Button>
      </div>
    </div>
  );
}
export default OrdersContent;
