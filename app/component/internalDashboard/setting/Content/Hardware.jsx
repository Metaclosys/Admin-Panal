"use client";
import React, { useState } from 'react';
import { Button, Radio } from 'antd';

export default function Hardware() {
  const [isEditingPrinter, setIsEditingPrinter] = useState(false);
  const [isEditingRegister, setIsEditingRegister] = useState(false);
  const [settings, setSettings] = useState({
    receiptPrinter: {
      use: 'no'
    },
    cashRegister: {
      use: 'yes',
      registers: [
        { id: '001', name: 'Cash Register', deviceId: '' },
        { id: '002', name: 'SJ Front Desk', deviceId: 'ID: tmr_FuZoZQ4E4muuQ' }
      ]
    }
  });

  const renderReceiptPrinter = () => {
    if (isEditingPrinter) {
      return (
        <div className="bg-white border rounded-lg mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Receipt Printer</h3>
            <div className="mb-6">
              <div className="mb-2">Use Receipt Printer:</div>
              <Radio.Group 
                value={settings.receiptPrinter.use}
                onChange={e => setSettings({
                  ...settings,
                  receiptPrinter: {
                    ...settings.receiptPrinter,
                    use: e.target.value
                  }
                })}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingPrinter(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingPrinter(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg mb-4">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Receipt Printer</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingPrinter(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0">
          <div className="flex">
            <span className="w-32">Use Receipt Printer:</span>
            <span>{settings.receiptPrinter.use === 'yes' ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCashRegister = () => {
    if (isEditingRegister) {
      return (
        <div className="bg-white border rounded-lg">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Cash Register</h3>
            <div className="mb-6">
              <div className="mb-2">Use Cash Register:</div>
              <Radio.Group 
                value={settings.cashRegister.use}
                onChange={e => setSettings({
                  ...settings,
                  cashRegister: {
                    ...settings.cashRegister,
                    use: e.target.value
                  }
                })}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>

            {settings.cashRegister.use === 'yes' && (
              <>
                <Button 
                  type="link"
                  className="text-blue-500 p-0 mb-4"
                >
                  Add Cash Register
                </Button>
                <div className="mb-6">
                  <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                    <div>Register Name</div>
                    <div>Device ID</div>
                    <div>Terminal ID</div>
                  </div>
                  {settings.cashRegister.registers.map(register => (
                    <div key={register.id} className="grid grid-cols-3 gap-4 items-center py-1">
                      <div>{register.name}</div>
                      <div className="text-gray-500">{register.deviceId}</div>
                      <div className="flex items-center gap-2">
                        <span>{register.id}</span>
                        <Button 
                          type="link" 
                          className="text-blue-500 p-0"
                        >
                          Edit
                        </Button>
                        <Button 
                          type="link" 
                          className="text-red-500 p-0"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingRegister(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingRegister(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Cash Register</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingRegister(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0">
          <div className="flex mb-4">
            <span className="w-32">Use Cash Register:</span>
            <span>{settings.cashRegister.use === 'yes' ? 'Yes' : 'No'}</span>
          </div>
          {settings.cashRegister.use === 'yes' && (
            <div className="space-y-2">
              {settings.cashRegister.registers.map(register => (
                <div key={register.id} className="flex justify-between">
                  <div>{register.name}</div>
                  <div className="flex gap-4">
                    <span className="text-gray-500">{register.deviceId}</span>
                    <span>{register.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Hardware Settings</h2>
      {renderReceiptPrinter()}
      {renderCashRegister()}
    </div>
  );
} 