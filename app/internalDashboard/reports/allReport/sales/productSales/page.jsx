'use client'
import React, { useState } from 'react'
import { DatePicker, Button, Typography, Space, Table, Divider } from 'antd'
import Link from 'next/link'
import ReportTable from '../../../../../component/dashboard/table/reportTables'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

const ProductSales = () => {
  const [dateRange, setDateRange] = useState(null)
  const [loading, setLoading] = useState(false)
  const [salesData, setSalesData] = useState([
    { key: '1', brand: 'Brand A', quantity: '10', amount: '100.00', adjustment: '0.00', totalSales: '100.00', tax: '7.00', refund: '0.00' },
    { key: '2', brand: 'Brand B', quantity: '5', amount: '75.00', adjustment: '-5.00', totalSales: '70.00', tax: '4.90', refund: '0.00' },
    { key: '3', brand: 'Brand C', quantity: '8', amount: '120.00', adjustment: '10.00', totalSales: '130.00', tax: '9.10', refund: '20.00' },
  ])

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => parseFloat(a.quantity) - parseFloat(b.quantity),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
      render: (text) => `$${text}`
    },
    {
      title: 'Adjustment',
      dataIndex: 'adjustment',
      sorter: (a, b) => parseFloat(a.adjustment) - parseFloat(b.adjustment),
      render: (text) => `$${text}`
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalSales', 
      sorter: (a, b) => parseFloat(a.totalSales) - parseFloat(b.totalSales),
      render: (text) => `$${text}`
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      sorter: (a, b) => parseFloat(a.tax) - parseFloat(b.tax),
      render: (text) => `$${text}`
    },
    {
      title: 'Refund',
      dataIndex: 'refund',
      sorter: (a, b) => parseFloat(a.refund) - parseFloat(b.refund),
      render: (text) => `$${text}`
    },
  ]

  const handleViewReport = () => {
    if (!dateRange) {
      return
    }
    setLoading(true)
    // Simulate API call with actual date range
    console.log('Fetching report for date range:', dateRange)
    setTimeout(() => {
      // Here you would normally update salesData with the API response
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="p-4">
      <Title level={2}>Product Sales</Title>
      
      {/* Report Criteria Section */}
      <div className="bg-gray-100 p-4 rounded-md mb-4">
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
              shape='round'
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
        <Title level={4}>Product Sales Report</Title>
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

      {/* Report Categories */}
      <Space className="mb-4">
        <Button type="link">By Override Reasons</Button>
        <Button type="link">By Category</Button>
        <Button type="link">By Product Sales</Button>
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

export default ProductSales