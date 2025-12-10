"use client";
import React, { useState } from 'react';
import { Select, Button, Tabs } from 'antd';
import ReportTable from '../../../../../component/dashboard/table/reportTables';

export default function OverrideReasons() {
  const [dateRange, setDateRange] = useState('This Month');
  const [activeTab, setActiveTab] = useState('byOverride');

  const columns = [
    { 
      title: 'Override Reason',
      dataIndex: 'reason',
      sorter: (a, b) => a.reason.localeCompare(b.reason),
    },
    { 
      title: 'Line Amount',
      dataIndex: 'lineAmount',
      sorter: (a, b) => parseFloat(a.lineAmount) - parseFloat(b.lineAmount),
    },
    { 
      title: 'Adjustment Amount',
      dataIndex: 'adjustmentAmount',
      sorter: (a, b) => parseFloat(a.adjustmentAmount) - parseFloat(b.adjustmentAmount),
    },
  ];

  const mockData = [
    {
      key: '1',
      reason: 'Barber product use',
      lineAmount: 'xx',
      adjustmentAmount: 'xx',
    },
    {
      key: '2',
      reason: 'Member Product',
      lineAmount: 'xx',
      adjustmentAmount: 'xx',
    },
    {
      key: '3',
      reason: 'Unassigned',
      lineAmount: 'xx',
      adjustmentAmount: 'xx',
    },
  ];

  const items = [
    {
      key: 'byOverride',
      label: 'By Override Reasons',
    },
    {
      key: 'byStaff',
      label: 'By Staff',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Override Reasons</h1>
      
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

      {/* Override Reasons Section */}
      <div className="mb-4">
        <div className="text-blue-500 hover:underline cursor-pointer mb-2">
          Back to Reports
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Jan 6, 2025 - Jan 12, 2025
        </div>

        {/* Tabs */}
        <Tabs 
          items={items}
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-4"
        />
      </div>

      {/* Results Table */}
      <ReportTable 
        columns={columns}
        data={mockData}
        loading={false}
      />

      {/* Timestamp */}
      <div className="text-sm text-gray-500 mt-4">
        1/9/2025 02:27 PM EST
      </div>
    </div>
  );
}
