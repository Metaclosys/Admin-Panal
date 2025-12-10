"use client";
import React, { useState } from 'react';
import { DatePicker, Radio, Checkbox, Button } from 'antd';
import { DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import ReportTable from '../../../../../component/dashboard/table/reportTables';
import { useRouter } from 'next/navigation';

export default function CancellationFeeConfirmation() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState([]);
  const [filterType, setFilterType] = useState('dateCreated');
  const [includeFilters, setIncludeFilters] = useState({
    notCharged: true,
    charged: false,
    skipped: false,
    failed: false
  });

  const handleBookingClick = (bookingId) => {
    router.push(`/internalDashboard/reports/allReport/bulkcharge/cancellation_fee_confirmation/infoDetail/${bookingId}`);
  };

  const columns = [
    {
      title: 'Booking #',
      dataIndex: 'bookingId',
      render: (text) => (
        <a 
          onClick={() => handleBookingClick(text)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          {text}
        </a>
      ),
    },
    { title: 'Customer', dataIndex: 'customer' },
    { title: 'Staff', dataIndex: 'staff' },
    { title: 'Room', dataIndex: 'room' },
    { title: 'Appointment Date', dataIndex: 'appointmentDate' },
    { title: 'Created Date', dataIndex: 'createdDate' },
    { title: 'Reason', dataIndex: 'reason' },
    { title: 'Cancelled Date', dataIndex: 'cancelledDate' },
    { title: 'No Show Date', dataIndex: 'noShowDate' },
    { title: 'Fee Amount', dataIndex: 'feeAmount' },
    { title: 'Fee Status', dataIndex: 'feeStatus' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="text-blue-500">
          <a className="hover:underline mr-2">Charge</a>|
          <a className="hover:underline ml-2">Skip</a>
        </div>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      bookingId: '100683585249',
      customer: 'Ivan Aguilera',
      staff: 'Alexander Castellanos',
      room: 'Main',
      appointmentDate: 'Dec 3, 2023 3:30 pm',
      createdDate: 'Dec 3, 2023 11:14 am',
      reason: 'Cancelled',
      cancelledDate: 'Dec 3, 2023',
      noShowDate: '-',
      feeAmount: '$35.00',
      feeStatus: 'Not Charged',
    },
    // Add more mock data here
  ];

  const handleSearch = () => {
    // Implement search logic
  };

  const handleReset = () => {
    setDateRange([]);
    setFilterType('dateCreated');
    setIncludeFilters({
      notCharged: true,
      charged: false,
      skipped: false,
      failed: false
    });
  };

  return (
    <div className="p-6">
     
      {/* Search Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-medium text-black">Search Criteria</h2>
        
        </div>
        <div className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-black">Date Range</span>
          <DatePicker.RangePicker 
            onChange={setDateRange}
            className="bg-white"
          />
          <div className="ml-auto flex gap-2 text-black">
            <Button icon={<DownloadOutlined />} className="flex items-center">
              Download
            </Button>
            <Button icon={<RedoOutlined />} className="flex items-center">
              Refresh
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <span className="block mb-2 text-black">Include</span>
          <div className="flex gap-4">
            {Object.entries(includeFilters).map(([key, value]) => (
              <Checkbox 
                key={key}
                checked={value}
                onChange={e => setIncludeFilters({...includeFilters, [key]: e.target.checked})}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Radio.Group 
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <Radio value="dateCreated">By Date Created</Radio>
            <Radio value="appointmentDate">By Appointment Date</Radio>
          </Radio.Group>
          
          <div className="ml-auto">
            <Button type="primary" size='large' shape="round" onClick={handleSearch} className="mr-2 bg-[#0F172A]">
              Search
            </Button>
            <Button size='large' shape="round" onClick={handleReset}>Reset</Button>
          </div>
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