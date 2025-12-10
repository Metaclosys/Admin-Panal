"use client";
import React from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import UniversalTable from '../../../dashboard/table/universalTable';

const MiddleSection = ({ bookings, loading }) => {
  console.log('bookings', bookings);
  
  // Transform bookings data to extract nested objects
  const transformedBookings = bookings.map(booking => ({
    ...booking,
    // Extract customer name from customerId object
    customerName: booking.customerId?.firstName && booking.customerId?.lastName 
      ? `${booking.customerId.firstName} ${booking.customerId.lastName}`
      : booking.customerId?.email || 'N/A',
    // Extract service name from serviceId object
    serviceName: booking.serviceId?.name || 'N/A',
    // Extract employee name from employeeId object
    employeeName: booking.employeeId?.firstName && booking.employeeId?.lastName
      ? `${booking.employeeId.firstName} ${booking.employeeId.lastName}`
      : 'N/A',
    // Extract room name from roomId object
    roomName: booking.roomId?.name || 'N/A',
  }));
  
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Client Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Date & Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => dayjs(text).format('MMM D, YYYY h:mm A'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        switch (status?.toLowerCase()) {
          case 'completed':
            color = 'green';
            break;
          case 'cancelled':
            color = 'red';
            break;
          case 'pending':
            color = 'orange';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Room',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Payment Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid) => (
        <Tag color={isPaid ? 'green' : 'red'}>
          {isPaid ? 'Paid' : 'Unpaid'}
        </Tag>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes) => notes?.customerNotes || '-',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Booking Results</h2>
    <UniversalTable
      columns={columns}
        data={transformedBookings}
        loading={loading}
    />
    </div>
  );
};

export default MiddleSection;
