"use client";
import React, { useState } from 'react';
import { Radio, Select, Checkbox, Input, Button } from 'antd';

export default function AppointmentSettings() {
  const [settings, setSettings] = useState({
    scheduling: {
      allowAfterClosing: 'yes',
      averageDuration: '2 hours',
      allowPastAppointments: 'yes',
      allowResourceOverbooking: 'yes',
      allowStaffConcurrency: 'yes',
      requireStaffAvailability: 'yes',
      enableAutoPackage: 'yes'
    },
    alerts: {
      enableNoShow: 'yes',
      showAlertAfter: '2 hours',
      enableStaffPricing: 'yes'
    },
    status: {
      enableCheckIn: 'yes'
    },
    staff: {
      enableStaffBooking: 'yes',
      enableStaffDays: 'yes'
    },
    display: {
      itineraryDisplay: {
        staff: true,
        room: false
      },
      appointmentPreview: {
        staffService: true,
        customerService: true,
        customerHistory: true,
        packageDetails: true
      },
      appointmentStart: {
        hours: 2,
        beforeStart: true
      },
      calendar: {
        showStartTime: true,
        displayFormat: 'service_name_then_customer'
      }
    }
  });

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      {/* All Appointments Section */}
      <div className="bg-gray-200 p-2 mb-4">
        <h3 className="font-medium">All Appointments</h3>
      </div>

      {/* Scheduling Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="font-medium mb-4">Scheduling</h4>
        <div className="space-y-4">
          <div>
            <div className="mb-2">Allow Appointments to end after your location's official Closing Time:</div>
            <Radio.Group 
              value={settings.scheduling.allowAfterClosing}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  allowAfterClosing: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div className="flex items-center gap-2">
            <span>Average duration:</span>
            <Select
              value={settings.scheduling.averageDuration}
              onChange={value => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  averageDuration: value
                }
              })}
              className="w-32"
            >
              <Select.Option value="2 hours">2 hours</Select.Option>
              {/* Add more options as needed */}
            </Select>
          </div>

          <div>
            <div className="mb-2">Allow Appointments in the past:</div>
            <Radio.Group 
              value={settings.scheduling.allowPastAppointments}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  allowPastAppointments: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Allow Resource Overbooking:</div>
            <Radio.Group 
              value={settings.scheduling.allowResourceOverbooking}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  allowResourceOverbooking: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Allow staff Concurrency:</div>
            <Radio.Group 
              value={settings.scheduling.allowStaffConcurrency}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  allowStaffConcurrency: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Require Staff on Availability Search:</div>
            <Radio.Group 
              value={settings.scheduling.requireStaffAvailability}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  requireStaffAvailability: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Enable Auto Package Detection:</div>
            <Radio.Group 
              value={settings.scheduling.enableAutoPackage}
              onChange={e => setSettings({
                ...settings,
                scheduling: {
                  ...settings.scheduling,
                  enableAutoPackage: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="font-medium mb-4">Alerts</h4>
        <div className="space-y-4">
          <div>
            <div className="mb-2">Enable No-Show Alert:</div>
            <Radio.Group 
              value={settings.alerts.enableNoShow}
              onChange={e => setSettings({
                ...settings,
                alerts: {
                  ...settings.alerts,
                  enableNoShow: e.target.value
                }
              })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div className="flex items-center gap-2">
            <span>Show alert when a Customer has:</span>
            <Select
              value={settings.alerts.showAlertAfter}
              onChange={value => setSettings({
                ...settings,
                alerts: {
                  ...settings.alerts,
                  showAlertAfter: value
                }
              })}
              className="w-32"
            >
              <Select.Option value="2 hours">2 hours</Select.Option>
            </Select>
            <span>or more No-Shows on record</span>
          </div>
        </div>
      </div>

      {/* Display Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="font-medium mb-4">Display</h4>
        <div className="space-y-4">
          <div>
            <div className="mb-2">In Customer Itinerary display:</div>
            <div className="space-y-2">
              <Checkbox
                checked={settings.display.itineraryDisplay.staff}
                onChange={e => setSettings({
                  ...settings,
                  display: {
                    ...settings.display,
                    itineraryDisplay: {
                      ...settings.display.itineraryDisplay,
                      staff: e.target.checked
                    }
                  }
                })}
              >
                Staff
              </Checkbox>
              <Checkbox
                checked={settings.display.itineraryDisplay.room}
                onChange={e => setSettings({
                  ...settings,
                  display: {
                    ...settings.display,
                    itineraryDisplay: {
                      ...settings.display.itineraryDisplay,
                      room: e.target.checked
                    }
                  }
                })}
              >
                Room
              </Checkbox>
            </div>
          </div>

          <div>
            <div className="mb-2">In Appointment Preview, display:</div>
            <div className="space-y-2">
              {Object.entries(settings.display.appointmentPreview).map(([key, value]) => (
                <Checkbox
                  key={key}
                  checked={value}
                  onChange={e => setSettings({
                    ...settings,
                    display: {
                      ...settings.display,
                      appointmentPreview: {
                        ...settings.display.appointmentPreview,
                        [key]: e.target.checked
                      }
                    }
                  })}
                >
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Appointments Section */}
      <div className="bg-gray-200 p-2 mb-4">
        <h3 className="font-medium">Service Appointments</h3>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h4 className="font-medium mb-4">Display</h4>
        <div className="space-y-4">
          <div>
            <div className="mb-2">On Calendar:</div>
            <Checkbox
              checked={settings.display.calendar.showStartTime}
              onChange={e => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  calendar: {
                    ...settings.display.calendar,
                    showStartTime: e.target.checked
                  }
                }
              })}
            >
              Show Start Time, then
            </Checkbox>
            <Select
              value={settings.display.calendar.displayFormat}
              onChange={value => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  calendar: {
                    ...settings.display.calendar,
                    displayFormat: value
                  }
                }
              })}
              className="w-full mt-2"
            >
              <Select.Option value="service_name_then_customer">Service Name, then Customer Name</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button 
          type="primary"
          className="bg-[#0F172A]"
        >
          Save
        </Button>
      </div>
    </div>
  );
} 