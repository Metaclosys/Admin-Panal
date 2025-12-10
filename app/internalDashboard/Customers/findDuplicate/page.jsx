"use client";
import { useState } from "react";
import { Input, Button, Checkbox } from "antd";
import ReportTable from "../../../component/dashboard/table/reportTables";

export default function FindDuplicates() {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: "",
      dataIndex: "select",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, record.key]);
            } else {
              setSelectedRows(selectedRows.filter((key) => key !== record.key));
            }
          }}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Membership",
      dataIndex: "membership",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
  ];

  const data = [
    {
      key: "1",
      firstName: "abc",
      lastName: "abx",
      phone: "xxx",
      email: "abc",
      address: "xxx",
      membership: "xxx",
      createdDate: "xxxx",
    },
    {
      key: "2",
      firstName: "abc",
      lastName: "abx",
      phone: "xxx",
      email: "abc",
      address: "xxx",
      membership: "xxx",
      createdDate: "xxxx",
    },
    {
      key: "3",
      firstName: "abc",
      lastName: "abx",
      phone: "xxx",
      email: "abc",
      address: "xxx",
      membership: "xxx",
      createdDate: "xxxx",
    },
    {
      key: "4",
      firstName: "abc",
      lastName: "abx",
      phone: "xxx",
      email: "abc",
      address: "xxx",
      membership: "xxx",
      createdDate: "xxxx",
    },
    {
      key: "5",
      firstName: "abc",
      lastName: "abx",
      phone: "xxx",
      email: "abc",
      address: "xxx",
      membership: "xxx",
      createdDate: "xxxx",
    },
  ];

  return (
    <div className="p-6">
      {/* Search Section */}
      <div className="mb-4">
        <div className="p-3 border-b flex text-black justify-between items-center bg-gray-300 mb-2">
          <span className="font-medium">Search Criteria</span>
          <Button type="text">+</Button>
        </div>
        <div className="bg-[#47B5FF24] rounded-md p-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div>
              <div className="text-sm text-gray-600 mb-2">Customer Name</div>
              <Input placeholder="Customer Name" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Email</div>
              <Input placeholder="Email" className="w-full" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Phone</div>
              <Input placeholder="XXX-XXX-XXXX" className="w-full" />
            </div>
            <Button type="primary" className="bg-[#06283D] rounded-full mt-6">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Merge Button */}
      <Button
        type="primary"
        className="bg-[#06283D] mb-4"
        disabled={selectedRows.length < 2}
      >
        Merge Selected Customers
      </Button>

      {/* Table */}
      <ReportTable columns={columns} data={data} loading={false} />
    </div>
  );
}
