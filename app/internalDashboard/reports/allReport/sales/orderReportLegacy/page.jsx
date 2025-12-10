"use client";
import React, { useState } from 'react';
import { Select, Button } from 'antd';
import ReportTable from '../../../../../component/dashboard/table/reportTables';

export default function OrderReportLegacy() {
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
      title: 'Services/Retail',
      dataIndex: 'services',
      sorter: (a, b) => a.services.localeCompare(b.services),
    },
    { 
      title: 'Staff',
      dataIndex: 'staff',
      sorter: (a, b) => a.staff.localeCompare(b.staff),
    },
    { 
      title: 'SubTotal',
      dataIndex: 'subtotal',
      sorter: (a, b) => parseFloat(a.subtotal) - parseFloat(b.subtotal),
    },
    { 
      title: 'Taxes',
      dataIndex: 'taxes',
      sorter: (a, b) => parseFloat(a.taxes) - parseFloat(b.taxes),
    },
    { 
      title: 'Tip',
      dataIndex: 'tip',
      sorter: (a, b) => parseFloat(a.tip) - parseFloat(b.tip),
    },
    { 
      title: 'Total',
      dataIndex: 'total',
      sorter: (a, b) => parseFloat(a.total) - parseFloat(b.total),
    },
    { 
      title: 'Change',
      dataIndex: 'change',
      sorter: (a, b) => parseFloat(a.change) - parseFloat(b.change),
    },
  ];

  const mockData = [
    {
      key: '1',
      date: 'abc',
      orderNumber: 'abc',
      customerFirstName: 'xxx',
      customerLastName: 'abc',
      services: 'abc',
      staff: 'xxx',
      subtotal: 'xxx',
      taxes: 'xxx',
      tip: 'abc',
      total: 'xxx',
      change: 'xxx',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Report (Legacy)</h1>
      
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
