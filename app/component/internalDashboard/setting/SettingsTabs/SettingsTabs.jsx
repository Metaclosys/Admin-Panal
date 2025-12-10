"use client";
import React from 'react';
import { Button } from 'antd';

export default function SettingsTabs({ activeTab, setActiveTab, TABS }) {
  return (
    <div className="flex gap-4 mb-6 ">
      {Object.entries(TABS).map(([key, value]) => (
        <Button
          key={value}
          type={activeTab === value ? 'link' : 'text'}
          onClick={() => setActiveTab(value)}
          className={`pb-4 px-6 relative ${
            activeTab === value 
              ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' 
              : 'text-gray-700'
          }`}
        >
          {key.charAt(0) + key.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  );
} 