"use client";
import React, { useState } from 'react';
import { Select, Button, Card } from 'antd';
import { RedoOutlined, PrinterOutlined } from '@ant-design/icons';

export default function CashRegisterEndOfDay() {
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedRegister, setSelectedRegister] = useState('SJ Front Desk');

  return (
    <div className="p-6">
      
      {/* Search Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black mb-4">Search Criteria</h2>
      </div>
      <div >
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <span className="block mb-2 text-black">Date Range</span>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
              options={[
                { value: 'This Month', label: 'This Month' },
                { value: 'Last Month', label: 'Last Month' },
                // Add more options as needed
              ]}
            />
          </div>
          <div className="flex gap-2 self-end">
            <Button 
              type="primary" 
              className="bg-[#0F172A]"
            >
              View Report
            </Button>
            <Button>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Custom Payment Detail Report Section */}
      <div className="mb-6">
        <div className="text-blue-500 hover:underline cursor-pointer mb-2">
          Back to Reports
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Jan 1, 2025 - Jan 30, 2025
        </div>
      </div>

      {/* Cash Register Selection */}
      <Card
        title="Cash Register"
        className="mb-6"
      >
        <Select
          value={selectedRegister}
          onChange={setSelectedRegister}
          className="w-full max-w-xs"
          options={[
            { value: 'SJ Front Desk', label: 'SJ Front Desk' },
            // Add more registers as needed
          ]}
        />
      </Card>

      {/* Timestamp */}
      <div className="text-sm text-gray-500 mt-4">
        1/9/2025 10:27 PM EST
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button 
          icon={<RedoOutlined />}
          className="flex items-center"
        />
        <Button 
          icon={<PrinterOutlined />}
          className="flex items-center"
        />
      </div>
    </div>
  );
}