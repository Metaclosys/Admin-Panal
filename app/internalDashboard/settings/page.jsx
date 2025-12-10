"use client";
import React, { useState } from 'react';
import SettingsTabs from "../../component/internalDashboard/setting/SettingsTabs/SettingsTabs";
import Wrapper from "../../component/internalDashboard/setting/Wrapper/Wrapper";

export default function Settings() {
  // Move TABS inside the component
  const TABS = {
    GENERAL: 'general',
    PAYMENT: 'payment',
    NOTIFICATION: 'notification',
    SECURITY: 'security'
  };
  
  const [activeTab, setActiveTab] = useState(TABS.GENERAL);

  return (
    <div className="p-6">
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} TABS={TABS} />
      <Wrapper activeTab={activeTab} />
    </div>
  );
}
