"use client";
import React, { useState } from 'react';
import { Button, Input, Radio, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export default function Security() {
  const [isEditingIP, setIsEditingIP] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingTimeout, setIsEditingTimeout] = useState(false);
  const [isShowingKey, setIsShowingKey] = useState(false);

  const [settings, setSettings] = useState({
    allowedIPs: [],
    ipStart: '',
    ipEnd: '',
    passwordExpiry: '90 days',
    timeout: 120,
    publicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: BCPG C# v1.6.1.0\n\nxhsBFBQPQXEBB/9Qy+LILNEYYRkQRPYkAkFPuJILRxBqRAJBZPZY1MA\nmJKVhVhXZVbw+EtheCOvZGgr/YqSYVVXXKMGKSQPwW6N7uZBU7ms\n...',
    encryptFile: null
  });

  const renderIPAddressEdit = () => (
    <div className="bg-white border rounded-lg">
      <div className="p-4">
        <h3 className="text-base font-medium">Allow IP Address</h3>
        <div className="space-y-4 mt-4">
          <div>
            <div className="mb-2">IP Address Start:</div>
            <Input 
              value={settings.ipStart}
              onChange={e => setSettings({...settings, ipStart: e.target.value})}
              placeholder="Enter IP address"
            />
          </div>
          <div>
            <div className="mb-2">IP Address End:</div>
            <Input 
              value={settings.ipEnd}
              onChange={e => setSettings({...settings, ipEnd: e.target.value})}
              placeholder="Enter IP address"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              className="border border-gray-300"
              onClick={() => setIsEditingIP(false)}
            >
              Cancel
            </Button>
            <Button 
              type="primary"
              className="bg-[#0F172A]"
              onClick={() => setIsEditingIP(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPasswordEdit = () => (
    <div className="bg-white border rounded-lg">
      <div className="p-4">
        <h3 className="text-base font-medium">Password Settings</h3>
        <div className="mt-4">
          <div className="mb-2">Passwords Expire In:</div>
          <Radio.Group 
            value={settings.passwordExpiry}
            onChange={e => setSettings({...settings, passwordExpiry: e.target.value})}
          >
            <Radio value="90 days">90 days</Radio>
            <Radio value="never">never expires</Radio>
          </Radio.Group>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button 
            className="border border-gray-300"
            onClick={() => setIsEditingPassword(false)}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            className="bg-[#0F172A]"
            onClick={() => setIsEditingPassword(false)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTimeoutEdit = () => (
    <div className="bg-white border rounded-lg">
      <div className="p-4">
        <h3 className="text-base font-medium">Timeout Settings</h3>
        <div className="mt-4 flex items-center gap-2">
          <span>Require Login after</span>
          <Select
            value={settings.timeout}
            onChange={value => setSettings({...settings, timeout: value})}
            className="w-24"
          >
            <Select.Option value={120}>120</Select.Option>
          </Select>
          <span>minutes of inactivity.</span>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button 
            className="border border-gray-300"
            onClick={() => setIsEditingTimeout(false)}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            className="bg-[#0F172A]"
            onClick={() => setIsEditingTimeout(false)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPublicKey = () => (
    <div className="bg-white border rounded-lg">
      <div className="p-4">
        <h3 className="text-base font-medium mb-2">Public Key Settings</h3>
        <Button 
          type="link"
          className="text-blue-500 p-0 h-auto"
          onClick={() => setIsShowingKey(!isShowingKey)}
        >
          {isShowingKey ? 'Hide Key' : 'View Key'}
        </Button>
        {isShowingKey && (
          <div className="mt-2 p-4 bg-gray-50 font-mono text-sm whitespace-pre-wrap border rounded">
            {settings.publicKey}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6 space-y-4">
      {isEditingIP ? renderIPAddressEdit() :
       isEditingPassword ? renderPasswordEdit() :
       isEditingTimeout ? renderTimeoutEdit() :
       <>
        {/* IP Address Section */}
        <div className="bg-white border rounded-lg">
          <div className="p-4">
            <h3 className="text-base font-medium mb-2">Allow IP Address</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <InfoCircleOutlined />
                No IP Address ranges set
              </div>
              <Button 
                type="link" 
                className="text-blue-500 p-0 h-auto"
              >
                Add IP Address Range
              </Button>
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <div className="bg-white border rounded-lg">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-base font-medium">Password Settings</h3>
            <Button 
              type="link" 
              className="text-blue-500 p-0 flex items-center gap-1 h-auto"
              onClick={() => setIsEditingPassword(true)}
            >
              <span className="text-blue-500">✏️</span>
              Edit
            </Button>
          </div>
          <div className="px-4 pb-4">
            <div className="flex">
              <span className="flex-1">Passwords Expire In:</span>
              <span>{settings.passwordExpiry}</span>
            </div>
          </div>
        </div>

        {/* Timeout Settings */}
        <div className="bg-white border rounded-lg">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-base font-medium">Timeout Settings</h3>
            <Button 
              type="link" 
              className="text-blue-500 p-0 flex items-center gap-1 h-auto"
              onClick={() => setIsEditingTimeout(true)}
            >
              <span className="text-blue-500">✏️</span>
              Edit
            </Button>
          </div>
          <div className="px-4 pb-4">
            <div>Require login after {settings.timeout} minutes of inactivity.</div>
          </div>
        </div>

        {/* Public Key Settings */}
        {renderPublicKey()}

        {/* Encrypt File */}
        <div className="bg-white border rounded-lg">
          <div className="p-4">
            <h3 className="text-base font-medium mb-2">Encrypt File for Customer Credit Card Import</h3>
            <Button 
              type="link"
              className="text-blue-500 p-0 h-auto"
              disabled={!settings.encryptFile}
            >
              Choose File
            </Button>
            {!settings.encryptFile && (
              <div className="text-sm text-gray-500 mt-1">No File Chosen</div>
            )}
          </div>
        </div>
       </>
      }
    </div>
  );
} 