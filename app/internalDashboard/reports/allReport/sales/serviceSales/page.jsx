'use client'
import React, { useState } from 'react'
import ReportTable from '../../../../../component/dashboard/table/reportTables'
import Link from 'next/link'
import { DatePicker, Button, Typography, Space, Divider } from 'antd'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

const ServiceSales = () => {
  const [dateRange, setDateRange] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('byCategory') // 'byCategory' or 'allServiceSales'
  const [salesData, setSalesData] = useState([
    { 
      key: '1',
      category: 'abc',
      quantity: 'xx',
      amount: 'xx',
      adjustment: 'xx',
      totalSales: 'xx',
      refund: 'xx'
    },
    { 
      key: '2',
      category: 'abc',
      quantity: 'xx',
      amount: 'xx',
      adjustment: 'xx',
      totalSales: 'xx',
      refund: 'xx'
    },
    { 
      key: '3',
      category: 'abc',
      quantity: 'xx',
      amount: 'xx',
      adjustment: 'xx',
      totalSales: 'xx',
      refund: 'xx'
    },
  ])

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Adjustment',
      dataIndex: 'adjustment',
      sorter: (a, b) => a.adjustment - b.adjustment,
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalSales',
      sorter: (a, b) => a.totalSales - b.totalSales,
    },
    {
      title: 'Refund',
      dataIndex: 'refund',
      sorter: (a, b) => a.refund - b.refund,
    },
  ]

  const handleViewReport = () => {
    if (!dateRange) {
      return
    }
    setLoading(true)
    // Add logic to fetch and update sales data based on date range
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
        <Title level={4}>Service Sales Report</Title>
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

      {/* View Toggle */}
      <Space className="mb-4">
        <Button 
          type={viewMode === 'byCategory' ? 'primary' : 'default'}
          onClick={() => setViewMode('byCategory')}
          className={viewMode === 'byCategory' ? 'bg-[#0f3460]' : ''}
        >
          By Category
        </Button>
        <Button
          type={viewMode === 'allServiceSales' ? 'primary' : 'default'}
          onClick={() => setViewMode('allServiceSales')}
          className={viewMode === 'allServiceSales' ? 'bg-[#0f3460]' : ''}
        >
          All Service Sales
        </Button>
      </Space>

      {/* Sales Table */}
      <ReportTable 
        columns={columns}
        data={salesData}
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

export default ServiceSales
