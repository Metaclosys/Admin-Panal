"use client";
import React, { useState } from 'react';
import GeneralOptions from '../Options/GeneralOptions';
import PaymentOptions from '../Options/PaymentOptions';
import NotificationOptions from '../Options/NotificationOptions';
import SecurityOptions from '../Options/SecurityOptions';
import Content from '../Content/Content';

export default function Wrapper({ activeTab }) {
  const [selectedOption, setSelectedOption] = useState('Location Info');

  const getOptionsComponent = () => {
    const props = { selectedOption, setSelectedOption };
    
    switch (activeTab) {
      case 'general':
        return <GeneralOptions {...props} />;
      case 'payment':
        return <PaymentOptions {...props} />;
      case 'notification':
        return <NotificationOptions {...props} />;
      case 'security':
        return <SecurityOptions {...props} />;
      default:
        return <GeneralOptions {...props} />;
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        {getOptionsComponent()}
      </div>
      <div className="flex-[3]">
        <Content selectedOption={selectedOption} />
      </div>
    </div>
  );
}
