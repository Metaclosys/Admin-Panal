"use client";
import React, { useState } from 'react';
import { Button } from 'antd';

export default function PaymentSettings() {
  const [settings, setSettings] = useState({
    checks: {
      accept: 'No'
    },
    cash: {
      accept: 'Yes'
    },
    creditCard: {
      accept: 'Yes',
      types: 'VISA',
      mapPartner: 'MINDBODY Payments',
      feeMod3: 'CP 2.7% + $0.10 | CNP 2.9% + $0.15',
      integrationMID: '6kd23fd84151fd9ec53572c',
      reportingMID: 'acct_1PfcmHFqGd6kVGPN',
      mapEnabled: 'No',
      onlineTerminalID: '599'
    },
    giftCards: {
      accept: 'Yes',
      enableCashBack: 'No',
      expireAfter: '5 years after Purchase Date',
      inactivateIn: '36 months after being Used/Expired'
    },
    prePaidSeries: {
      inactivateIn: '36 months after being Used/Expired'
    },
    splitOrders: {
      allow: true
    },
    pointsMinutes: {
      enable: 'No'
    },
    tipsGratuity: {
      enableTips: 'Yes',
      autoTransfer: 'Yes',
      paymentMethod: 'Pay tips with payroll',
      calculatorPercentage: 'Service Total Only',
      subTotalBasedOn: 'Non-Discounted Price',
      preCalculatedPercentages: {
        option1: '15%',
        option2: '20%',
        option3: '25%'
      },
      enableServiceCharge: 'Yes',
      serviceChargeRate: '15%',
      calculateServiceChargeOn: 'Final Service Price'
    },
    overrideReasons: [
      'Barber product use',
      'Member Product',
      'Owner approved complimentary cut-service make up',
      'Owner approved complimentary cut-customer loyalty Owner approved complimentary cut-special occasion Required: No'
    ],
    refundPolicy: {
      summary: 'No Refunds Accepted on Open Products'
    },
    receipt: {
      showEmployeeInfo: 'Yes',
      showSpecials: 'Yes',
      receiptMessage: '',
      invoiceMessage: ''
    }
  });

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6 space-y-4">
      {/* Checks */}
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Checks</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="px-4 pb-4">
          <div className="flex">
            <span className="flex-1">Accept Checks:</span>
            <span>{settings.checks.accept}</span>
          </div>
        </div>
      </div>

      {/* Cash */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Cash</h3>
          <div className="mt-2">
            <div className="flex">
              <span className="flex-1">Accept Cash:</span>
              <span>{settings.cash.accept}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Credit Card</h3>
          <div className="mt-2 space-y-2">
            <div className="flex">
              <span className="flex-1">Accept Credit Card:</span>
              <span>{settings.creditCard.accept}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Types:</span>
              <span>{settings.creditCard.types}</span>
            </div>
            <div className="flex">
              <span className="flex-1">MAP Partner:</span>
              <span>{settings.creditCard.mapPartner}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Fee-Mod3:</span>
              <span>{settings.creditCard.feeMod3}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Integration MID:</span>
              <span>{settings.creditCard.integrationMID}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Reporting MID:</span>
              <span>{settings.creditCard.reportingMID}</span>
              <Button type="link" className="text-blue-500 p-0 ml-2">Get Card reader</Button>
            </div>
            <div className="flex">
              <span className="flex-1">MAP Enabled:</span>
              <span>{settings.creditCard.mapEnabled}</span>
              <span className="text-blue-500 ml-2">MINDBODY Payments</span>
            </div>
            <div className="flex">
              <span className="flex-1">Online Terminal ID:</span>
              <span>{settings.creditCard.onlineTerminalID}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Gift Cards</h3>
          <div className="mt-2 space-y-2">
            <div className="flex">
              <span className="flex-1">Accept Gift Cards:</span>
              <span>{settings.giftCards.accept}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Enable Cash Back for Gift Certificate Balance:</span>
              <span>{settings.giftCards.enableCashBack}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Expire Gift Certificates:</span>
              <span>{settings.giftCards.expireAfter}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Inactivate In:</span>
              <span>{settings.giftCards.inactivateIn}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pre Paid Series */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Pre Paid Series</h3>
          <div className="mt-2">
            <div className="flex">
              <span className="flex-1">Inactivate In:</span>
              <span>{settings.prePaidSeries.inactivateIn}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Split Orders */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Split Orders</h3>
          <div className="mt-2">
            <div className="flex">
              <span className="flex-1">Allow orders to be split:</span>
              <span>{settings.splitOrders.allow ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Points/Minutes */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Points/Minutes</h3>
          <div className="mt-2">
            <div className="flex">
              <span className="flex-1">Enable Points/Minutes:</span>
              <span>{settings.pointsMinutes.enable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips/Gratuity */}
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Tips/Gratuity</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="px-4 pb-4 space-y-2">
          <div className="flex">
            <span className="flex-1">Enable Tips/Gratuity for Services:</span>
            <span>{settings.tipsGratuity.enableTips}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Auto Transfer Tips to Pay-outs (requires active cash register):</span>
            <span>{settings.tipsGratuity.autoTransfer}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Payment Method:</span>
            <span>{settings.tipsGratuity.paymentMethod}</span>
          </div>
          {/* ... rest of tips/gratuity settings ... */}
        </div>
      </div>

      {/* Override Reasons */}
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Override Reasons</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="px-4 pb-4">
          <ul className="list-disc pl-4">
            {settings.overrideReasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Refund Policy</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="px-4 pb-4">
          <div className="flex">
            <span className="flex-1">Summary:</span>
            <span>{settings.refundPolicy.summary}</span>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <h3 className="text-base font-medium">Receipt</h3>
          <div className="mt-2 space-y-2">
            <div className="flex">
              <span className="flex-1">Show Employee Info:</span>
              <span>{settings.receipt.showEmployeeInfo}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Show Specials:</span>
              <span>{settings.receipt.showSpecials}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Receipt Message:</span>
              <span>{settings.receipt.receiptMessage}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Invoice Message:</span>
              <span>{settings.receipt.invoiceMessage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 