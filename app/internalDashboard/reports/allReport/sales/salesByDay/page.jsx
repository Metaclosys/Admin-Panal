'use client'
import React, { useState } from 'react'
import { Options } from '../../../../../component/internalDashboard/reports/allreports/Options/Options'
import ReportTable from '../../../../../component/dashboard/table/reportTables'
import Link from 'next/link'

const SalesByDay = () => {
  const [dateRange, setDateRange] = useState('')
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('simple') // 'simple' or 'detailed'
  const [salesData, setSalesData] = useState([
    {
      key: '1',
      date: 'abc',
      orders: 'abc',
      services: 'xxx',
      products: 'abc',
      gcCards: 'abc',
      series: 'xxx',
      cnclFee: 'xxx',
      membership: 'xxx',
      adjustment: 'abc',
      serviceCharge: 'xxx',
      grossSales: 'xxx'
    },
    {
      key: '2',
      date: 'abc',
      orders: 'abc',
      services: 'xxx',
      products: 'abc',
      gcCards: 'abc',
      series: 'xxx',
      cnclFee: 'xxx',
      membership: 'xxx',
      adjustment: 'abc',
      serviceCharge: 'xxx',
      grossSales: 'xxx'
    },
    {
      key: '3',
      date: 'abc',
      orders: 'abc',
      services: 'xxx',
      products: 'abc',
      gcCards: 'abc',
      series: 'xxx',
      cnclFee: 'xxx',
      membership: 'xxx',
      adjustment: 'abc',
      serviceCharge: 'xxx',
      grossSales: 'xxx'
    },
  ])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      sorter: (a, b) => a.orders.localeCompare(b.orders),
    },
    {
      title: 'Services',
      dataIndex: 'services',
      sorter: (a, b) => a.services - b.services,
    },
    {
      title: 'Products',
      dataIndex: 'products',
      sorter: (a, b) => a.products.localeCompare(b.products),
    },
    {
      title: 'GC/Cards',
      dataIndex: 'gcCards',
      sorter: (a, b) => a.gcCards.localeCompare(b.gcCards),
    },
    {
      title: 'Series',
      dataIndex: 'series',
      sorter: (a, b) => a.series - b.series,
    },
    {
      title: 'Cncl Fee',
      dataIndex: 'cnclFee',
      sorter: (a, b) => a.cnclFee - b.cnclFee,
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      sorter: (a, b) => a.membership - b.membership,
    },
    {
      title: 'Adjustment',
      dataIndex: 'adjustment',
      sorter: (a, b) => a.adjustment.localeCompare(b.adjustment),
    },
    {
      title: 'Service Charge',
      dataIndex: 'serviceCharge',
      sorter: (a, b) => a.serviceCharge - b.serviceCharge,
    },
    {
      title: 'Gross Sales',
      dataIndex: 'grossSales',
      sorter: (a, b) => a.grossSales - b.grossSales,
    },
  ]

  const handleViewReport = () => {
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
      <h1 className="text-2xl font-semibold mb-4">Sales By Day</h1>
      
      {/* Report Criteria Section */}
      <div className="bg-rose-100 p-4 mb-4">
        <h2 className="font-medium mb-2">Report Criteria</h2>
        <div className="flex gap-4 items-center">
          <Options 
            value={dateRange}
            onChange={(value) => setDateRange(value)}
            placeholder="--Date Range--"
          />
          <button
            onClick={handleViewReport}
            className="bg-[#0f3460] text-white px-4 py-2 rounded"
          >
            View Report
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2">Sales By Day</h2>
        <p className="text-sm text-gray-600 mb-2">Jan 11, 2024 - Jan 12, 2024</p>
        <Link href="/internalDashboard/reports" className="text-blue-500 text-sm">
          Back to Reports
        </Link>
      </div>

      {/* View Toggle */}
      <div className="flex gap-4 mb-4">
        <button 
          className={`${viewMode === 'simple' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setViewMode('simple')}
        >
          Simple View
        </button>
        <button 
          className={`${viewMode === 'detailed' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setViewMode('detailed')}
        >
          Detailed View
        </button>
      </div>

      {/* Sales Table */}
      <ReportTable 
        columns={columns}
        data={salesData}
        loading={loading}
      />

      {/* Timestamp */}
      <div className="mt-4 text-sm text-gray-600">
        1/9/2024 1:22:27 PM EST
      </div>
    </div>
  )
}

export default SalesByDay
