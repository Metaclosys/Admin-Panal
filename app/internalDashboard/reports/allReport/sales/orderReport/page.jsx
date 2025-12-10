"use client";
import React, { useState } from 'react';
import { Select, Button } from 'antd';
import ReportTable from '../../../../../component/dashboard/table/reportTables';

export default function OrderReport() {
  const [dateRange, setDateRange] = useState('This Month');

  const columns = [
    { 
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    { 
      title: 'Order Number',
      dataIndex: 'orderNumber',
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
    },
    { 
      title: 'Customer First Name',
      dataIndex: 'customerFirstName',
      sorter: (a, b) => a.customerFirstName.localeCompare(b.customerFirstName),
    },
    { 
      title: 'Customer Last Name',
      dataIndex: 'customerLastName',
      sorter: (a, b) => a.customerLastName.localeCompare(b.customerLastName),
    },
    { 
      title: 'Item Name',
      dataIndex: 'itemName',
      sorter: (a, b) => a.itemName.localeCompare(b.itemName),
    },
    { 
      title: 'Item Type',
      dataIndex: 'itemType',
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
    },
    { 
      title: 'Item Category',
      dataIndex: 'itemCategory',
      sorter: (a, b) => a.itemCategory.localeCompare(b.itemCategory),
    },
    { 
      title: 'Staff Member',
      dataIndex: 'staffMember',
      sorter: (a, b) => a.staffMember.localeCompare(b.staffMember),
    },
    { 
      title: 'Qty',
      dataIndex: 'qty',
      sorter: (a, b) => parseFloat(a.qty) - parseFloat(b.qty),
    },
    { 
      title: 'Original Price',
      dataIndex: 'originalPrice',
      sorter: (a, b) => parseFloat(a.originalPrice) - parseFloat(b.originalPrice),
    },
    { 
      title: 'Adjustment',
      dataIndex: 'adjustment',
      sorter: (a, b) => parseFloat(a.adjustment) - parseFloat(b.adjustment),
    },
  ];

  const mockData = [
    {
      key: '1',
      date: 'abc',
      orderNumber: 'abc',
      customerFirstName: 'xxx',
      customerLastName: 'abc',
      itemName: 'abc',
      itemType: 'xxx',
      itemCategory: 'xxx',
      staffMember: 'xxx',
      qty: 'abc',
      originalPrice: 'xxx',
      adjustment: 'xxx',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Report</h1>
      
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium mb-4">Report Criteria</h2>
        
        <div className="flex items-center gap-4">
          <div>
            <span className="block mb-2">Date Range</span>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-[200px]"
              options={[
                { value: 'This Month', label: 'This Month' },
                { value: 'Last Month', label: 'Last Month' },
                // Add more options as needed
              ]}
            />
          </div>
          <Button 
            type="primary" 
            className="bg-[#0F172A] ml-4 self-end"
          >
            View Report
          </Button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mb-4">
        <div className="text-blue-500 hover:underline cursor-pointer mb-2">
          Back to Reports
        </div>
        <div className="text-sm text-gray-600">
          Jan 6, 2025 - Jan 12, 2025
        </div>
      </div>

      {/* Results Table */}
      <ReportTable 
        columns={columns}
        data={mockData}
        loading={false}
      />

      {/* Timestamp */}
      <div className="text-sm text-gray-500 mt-4">
        1/6/2025 02:27 PM EST
      </div>
    </div>
  );
}
