"use client";
import React from 'react';
import CancellationPolicy from './CancellationPolicy';
import ClientForms from './ClientForms';
import AppointmentSettings from './AppointmentSettings';
import Hardware from './Hardware';
import MarketingSettings from './MarketingSettings';
import WaitlistSettings from './WaitlistSettings';
import InternalNotifications from './InternalNotifications';
import Security from './Security';
import PaymentSettings from './PaymentSettings';
import CustomPaymentTypes from './CustomPaymentTypes';
import MerchandiseTaxes from './MerchandiseTaxes';
import TaxTypes from './TaxTypes';

export default function Content({ selectedOption }) {
  const renderContent = () => {
    switch (selectedOption) {
      case 'Cancellation Policy':
        return <CancellationPolicy />;
      case 'Client Forms':
        return <ClientForms />;
      case 'Appointment Settings':
        return <AppointmentSettings />;
      case 'Hardware':
        return <Hardware />;
      case 'Marketing Settings':
        return <MarketingSettings />;
      case 'Waitlist Settings':
        return <WaitlistSettings />;
      case 'Internal Notifications':
        return <InternalNotifications />;
      case 'Security':
        return <Security />;
      case 'Payment Settings':
        return <PaymentSettings />;
      case 'Tax Types':
        return <TaxTypes />;
      case 'Custom Payment Types':
        return <CustomPaymentTypes />;
      case 'Merchandise Tax':
        return <MerchandiseTaxes />;
      default:
        return (
          <div className="bg-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{selectedOption}</h2>
            {/* Default content */}
          </div>
        );
    }
  };

  return renderContent();
}