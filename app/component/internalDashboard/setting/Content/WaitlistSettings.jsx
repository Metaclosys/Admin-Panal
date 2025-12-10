"use client";
import React, { useState } from 'react';
import { Button, Radio, Select } from 'antd';

export default function WaitlistSettings() {
  const [isEditingAppointment, setIsEditingAppointment] = useState(false);
  const [isEditingWalkIn, setIsEditingWalkIn] = useState(false);

  const [settings, setSettings] = useState({
    appointmentRequest: {
      enable: 'Yes',
      excludeFromCancellation: 'Yes',
      enableWaitlist: 'Yes',
      whenCategorySpecified: 'Shortest Duration',
      checkWhen: 'moved'
    },
    walkIn: {
      enable: 'Yes',
      enableCountdown: 'Yes'
    }
  });

  const renderAppointmentSettings = () => {
    if (isEditingAppointment) {
      return (
        <div className="bg-white border rounded-lg mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium">Appointment Request Waitlist Settings</h3>
            <div className="space-y-4 mt-4">
              <div>
                <div className="mb-2">Enable Appointment Request Waitlist:</div>
                <Radio.Group 
                  value={settings.appointmentRequest.enable === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    appointmentRequest: {
                      ...settings.appointmentRequest,
                      enable: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>

              <div>
                <div className="mb-2">Exclude Appointments booked off the Waitlist from Cancellation Fees:</div>
                <Radio.Group 
                  value={settings.appointmentRequest.excludeFromCancellation === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    appointmentRequest: {
                      ...settings.appointmentRequest,
                      excludeFromCancellation: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>

              <div>
                <div className="mb-2">Enable Appointment Request Waitlist:</div>
                <Radio.Group 
                  value={settings.appointmentRequest.enableWaitlist === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    appointmentRequest: {
                      ...settings.appointmentRequest,
                      enableWaitlist: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>

              <div>
                <div className="mb-2">When only a Category is specified, book service with:</div>
                <Select
                  value="Shortest Duration"
                  className="w-40"
                >
                  <Select.Option value="Shortest Duration">Shortest Duration</Select.Option>
                </Select>
              </div>

              <div>
                <div className="mb-2">Check Waitlist when:</div>
                <Radio.Group 
                  value="moved"
                  onChange={e => setSettings({
                    ...settings,
                    appointmentRequest: {
                      ...settings.appointmentRequest,
                      checkWhen: e.target.value
                    }
                  })}
                >
                  <Radio value="moved">Appointments are moved, edited or cancelled</Radio>
                  <Radio value="cancelled">Appointments are cancelled</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingAppointment(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingAppointment(false)}
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
          <h3 className="text-base font-medium">Appointment Request Waitlist Settings</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingAppointment(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0 space-y-2">
          <div className="flex">
            <span className="flex-1">Enable Appointment Request Waitlist:</span>
            <span>{settings.appointmentRequest.enable}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Exclude Appointments booked off the Waitlist from Cancellation Fees:</span>
            <span>{settings.appointmentRequest.excludeFromCancellation}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Enable Appointment Request Waitlist:</span>
            <span>{settings.appointmentRequest.enableWaitlist}</span>
          </div>
          <div className="flex">
            <span className="flex-1">When only a Category is specified, book service with:</span>
            <span>{settings.appointmentRequest.whenCategorySpecified}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Check Waitlist when:</span>
            <span>{settings.appointmentRequest.checkWhen === 'moved' ? 'Appointments are moved, edited or cancelled' : 'Appointments are cancelled'}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderWalkInSettings = () => {
    if (isEditingWalkIn) {
      return (
        <div className="bg-white border rounded-lg">
          <div className="p-4">
            <h3 className="text-base font-medium">Walk-In Waitlist Settings</h3>
            <div className="space-y-4 mt-4">
              <div>
                <div className="mb-2">Enable Walk-In Waitlist:</div>
                <Radio.Group 
                  value={settings.walkIn.enable === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    walkIn: {
                      ...settings.walkIn,
                      enable: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>

              <div>
                <div className="mb-2">Enable 5 min Countdown for Waiting Customer:</div>
                <Radio.Group 
                  value={settings.walkIn.enableCountdown === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    walkIn: {
                      ...settings.walkIn,
                      enableCountdown: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingWalkIn(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingWalkIn(false)}
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
          <h3 className="text-base font-medium">Walk-In Waitlist Settings</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingWalkIn(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0 space-y-2">
          <div className="flex">
            <span className="flex-1">Enable Walk-In Waitlist:</span>
            <span>{settings.walkIn.enable}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Enable 5 min Countdown for Waiting Customer:</span>
            <span>{settings.walkIn.enableCountdown}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      {renderAppointmentSettings()}
      {renderWalkInSettings()}
    </div>
  );
} 