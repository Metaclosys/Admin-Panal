"use client";
import React from "react";
import Cards from "../../card/dashboard/dashboardCard";
import { DownOutlined, ShopOutlined, UsergroupAddOutlined, PlusSquareOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Dropdown, Space, message } from "antd";
import { useRouter } from "next/navigation";

const handleReportGeneration = async (type) => {
  try {
    const response = await fetch(`/api/reports/generate?type=${type}`);
    if (!response.ok) throw new Error('Failed to generate report');
    
    // Handle report download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report.${type}`;
    a.click();
  } catch (error) {
    message.error('Failed to generate report');
  }
};

const reportItems = [
  {
    label: "EXCEL",
    key: "excel",
    onClick: () => handleReportGeneration('excel')
  },
  {
    type: "divider",
  },
  {
    label: "PDF",
    key: "pdf",
    onClick: () => handleReportGeneration('pdf')
  },
];

function TopSection({ stats, loading }) {
  const router = useRouter();

  const cardData = [
    {
      id: "shops",
      icon: <ShopOutlined color="#000" />,
      title: "Total Shops",
      number: stats?.totalShops || 0,
      onClick: () => router.push('/dashboard/shops')
    },
    {
      id: "employees",
      icon: <PlusSquareOutlined color="#000" />,
      title: "Total Employees",
      number: stats?.totalEmployees || 0,
      onClick: () => router.push('/dashboard/employees')
    },
    {
      id: "services",
      icon: <AppstoreOutlined color="#000" />,
      title: "Total Services",
      number: stats?.totalServices || 0,
      onClick: () => router.push('/dashboard/services')
    }
  ];

  return (
    <div className="flex gap-5 flex-col bg-[var(--bgSoft)] opacity-80 p-5 mx-5 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base text-gray-700">A quick data overview of the shops.</p>
        <Dropdown
          menu={{ items: reportItems }}
          trigger={["click"]}
          className="hover:bg-gray-50 transition-colors"
        >
          <button className="flex items-center gap-2 bg-white text-black rounded-full px-6 py-2">
            <span>Generate Report</span>
            <DownOutlined className="text-xs" />
          </button>
        </Dropdown>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {cardData.map(({ id, icon, title, number, onClick }) => (
          <Cards
            key={id}
            icon={icon}
            title={title}
            number={number}
            loading={loading}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default TopSection;
