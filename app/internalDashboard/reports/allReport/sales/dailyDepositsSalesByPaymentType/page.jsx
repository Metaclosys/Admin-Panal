"use client";
import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import ReportTable from '../../../../../component/dashboard/table/reportTables';

export default function DailyDepositsSalesByPaymentType() {
  const [dateRange, setDateRange] = useState('This Month');
  const [viewType, setViewType] = useState('simple');

  const columns = [
    { 
      title: 'Payment Type',
      dataIndex: 'paymentType',
    },
      { 
      title: 'Sub Type',
      dataIndex: 'subType',
    },
    { 
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
  ];

  const mockData = [
    {
      key: '1',
      paymentType: 'Cash',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '2',
      paymentType: 'Cash Equivalent',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '3',
      paymentType: '',
      subType: 'Cash Tendered',
      totalAmount: 'xxx',
    },
    {
      key: '4',
      paymentType: 'Check',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '5',
      paymentType: 'Credit Cards',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '6',
      paymentType: '',
      subType: 'American Express',
      totalAmount: 'xxx',
    },
    {
      key: '7',
      paymentType: 'Gift Certificate',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '8',
      paymentType: 'Groupon',
      subType: '',
      totalAmount: 'xxx',
    },
    {
      key: '9',
      paymentType: 'Marketing',
      subType: '',
      totalAmount: 'xxx',
    },
  ];

  return (
    <div className="p-6">
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Report Criteria</h2>
        </div>
        <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <span className="block mb-2 text-black">Date Range</span>
              <Select
                value={dateRange}
                onChange={setDateRange}
                className="w-[200px]"
                options={[
                  { value: 'This Month', label: 'This Month' },
                  { value: 'Last Month', label: 'Last Month' },
                ]}
              />
            </div>
            <Button 
              type="primary" 
              className="bg-[#0F172A] self-end"
            >
              View Report
            </Button>
          </div>
          <Button 
            icon={<PrinterOutlined />}
            className="flex items-center"
          >
            Print Report
          </Button>
        </div>
      </div>

      {/* Location Title */}
      <h2 className="text-xl font-semibold mb-4 text-black">Gents Barber - San Jose</h2>

      {/* Daily Deposits Section */}
      <div className="mb-4">
        <div className="text-blue-500 hover:underline cursor-pointer mb-2">
          Back to Reports
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Jan 6, 2025 - Jan 12, 2025
        </div>

        {/* View Type Links */}
        <div className="flex gap-4 mb-4">
          <button 
            className={`text-blue-500 hover:underline ${viewType === 'simple' ? 'font-bold' : ''}`}
            onClick={() => setViewType('simple')}
          >
            Simple View
          </button>
          <button 
            className={`text-blue-500 hover:underline ${viewType === 'detailed' ? 'font-bold' : ''}`}
            onClick={() => setViewType('detailed')}
          >
            Detailed View
          </button>
        </div>
      </div>

      {/* Results Table */}
      <ReportTable 
        columns={columns}
        data={mockData}
        loading={false}
      />
    </div>
  );
}
