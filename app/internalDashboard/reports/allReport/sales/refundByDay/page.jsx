'use client'
import React, { useState } from 'react'
import { DatePicker, Button, Typography, Space, Divider } from 'antd'
import ReportTable from '../../../../../component/dashboard/table/reportTables'
import Link from 'next/link'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

const RefundsByDay = () => {
  const [dateRange, setDateRange] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refundsData, setRefundsData] = useState([
    { 
      key: '1', 
      date: 'abc',
      numberOfRefunds: 'xx',
      serviceRefunds: 'xx',
      retailRefunds: 'xx',
      giftCardRefunds: 'xx',
      membershipRefunds: 'xx',
      miscRefunds: 'xx',
      taxRefund: 'xx',
      tipRefund: 'xx',
      totalRefundAmount: 'xx'
    },
    { 
      key: '2', 
      date: 'abc',
      numberOfRefunds: 'xx',
      serviceRefunds: 'xx',
      retailRefunds: 'xx',
      giftCardRefunds: 'xx',
      membershipRefunds: 'xx',
      miscRefunds: 'xx',
      taxRefund: 'xx',
      tipRefund: 'xx',
      totalRefundAmount: 'xx'
    },
    { 
      key: '3', 
      date: 'abc',
      numberOfRefunds: 'xx',
      serviceRefunds: 'xx',
      retailRefunds: 'xx',
      giftCardRefunds: 'xx',
      membershipRefunds: 'xx',
      miscRefunds: 'xx',
      taxRefund: 'xx',
      tipRefund: 'xx',
      totalRefundAmount: 'xx'
    },
  ])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Number of Refunds',
      dataIndex: 'numberOfRefunds',
      sorter: (a, b) => a.numberOfRefunds - b.numberOfRefunds,
    },
    {
      title: 'Service Refunds',
      dataIndex: 'serviceRefunds',
      sorter: (a, b) => a.serviceRefunds - b.serviceRefunds,
    },
    {
      title: 'Retail Refunds',
      dataIndex: 'retailRefunds',
      sorter: (a, b) => a.retailRefunds - b.retailRefunds,
    },
    {
      title: 'Gift Card/Series Refunds',
      dataIndex: 'giftCardRefunds',
      sorter: (a, b) => a.giftCardRefunds - b.giftCardRefunds,
    },
    {
      title: 'Membership Refunds',
      dataIndex: 'membershipRefunds',
      sorter: (a, b) => a.membershipRefunds - b.membershipRefunds,
    },
    {
      title: 'Misc Refunds',
      dataIndex: 'miscRefunds',
      sorter: (a, b) => a.miscRefunds - b.miscRefunds,
    },
    {
      title: 'Tax Refund',
      dataIndex: 'taxRefund',
      sorter: (a, b) => a.taxRefund - b.taxRefund,
    },
    {
      title: 'Tip Refund',
      dataIndex: 'tipRefund',
      sorter: (a, b) => a.tipRefund - b.tipRefund,
    },
    {
      title: 'Total Refund Amount',
      dataIndex: 'totalRefundAmount',
      sorter: (a, b) => a.totalRefundAmount - b.totalRefundAmount,
    },
  ]

  const handleViewReport = () => {
    if (!dateRange) {
      return
    }
    setLoading(true)
    // Add logic to fetch and update refunds data based on date range
    console.log('Fetching report for date range:', dateRange)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="p-4">
      
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-md">
        <Title level={5}>Report Criteria</Title>
        </div>
        <div className="my-4">
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Text type="secondary" className="block mb-1">Date Range</Text>
                <RangePicker 
                  className="w-full"
                  placeholder={['From', 'To']}
                  onChange={setDateRange}
                />
              </div>
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={handleViewReport}
                disabled={!dateRange}
                className="bg-[#0f3460] text-white"
              >
                View Report
              </Button>
            </div>
          </Space>
        </div>

      {/* Report Header */}
      <Space direction="vertical" className="w-full mb-4">
        <Title level={4}>Refunds By Day Report</Title>
        <Text type="secondary">
          {dateRange ? 
            `${dateRange[0].format('MMM DD, YYYY')} - ${dateRange[1].format('MMM DD, YYYY')}` :
            'No date range selected'
          }
        </Text>
        <Link href="/internalDashboard/reports" className="text-blue-500">
          Back to Reports
        </Link>
      </Space>

      {/* Refunds Table */}
      <ReportTable 
        columns={columns}
        data={refundsData}
        loading={loading}
      />

      {/* Timestamp */}
      <Divider />
      <Text type="secondary">
        {new Date().toLocaleString('en-US', { 
          timeZone: 'America/New_York',
          dateStyle: 'short',
          timeStyle: 'medium'
        })} EST
      </Text>
    </div>
  )
}

export default RefundsByDay
