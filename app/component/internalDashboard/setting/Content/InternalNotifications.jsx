"use client";
import React, { useState } from "react";
import { Button, Radio, Input, Checkbox } from "antd";

export default function InternalNotifications() {
  const [settings, setSettings] = useState({
    includeLocation: "Yes",
    sendNotifications: 2,
    customerBookings: {
      books: {
        serviceProvider: { email: false, sms: false },
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
      cancels: {
        serviceProvider: { email: false, sms: false },
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
      checksIn: {
        serviceProvider: { sms: false },
        admin: { sms: false },
        franchise: { sms: false },
        reservationist: { sms: false },
        staff: { sms: false },
      },
    },
    internalBookings: {
      books: {
        serviceProvider: { email: false, sms: false },
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
      modifies: {
        serviceProvider: { email: false, sms: false },
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
      cancels: {
        serviceProvider: { email: false, sms: false },
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
    },
    ordersProducts: {
      inventoryAlerts: {
        admin: { email: false, sms: false },
        franchise: { email: false, sms: false },
        reservationist: { email: false, sms: false },
        staff: { email: false, sms: false },
        other: { email: false, sms: false },
      },
      staffChecksIn: {
        serviceProvider: { email: false, sms: false },
        other: { email: false, sms: false },
      },
    },
    waitlist: {
      customerAdded: {
        admin: { sms: false },
        franchise: { sms: false },
        reservationist: { sms: false },
      },
      timeSlotAvailable: {
        reservationist: { email: false },
      },
    },
  });

  const renderNotificationTable = (data) => {
    return (
      <div className="bg-white border rounded-lg p-4">
        <div className="grid grid-cols-[2fr,1fr,1fr] text-sm">
          <div className="font-medium">User/Role</div>
          <div className="font-medium">Email</div>
          <div className="font-medium">SMS</div>
        </div>
        {Object.entries(data).map(([role, notifications]) => (
          <div
            key={role}
            className="grid grid-cols-[2fr,1fr,1fr] items-center py-2 border-b"
          >
            <div>
              {role === "serviceProvider"
                ? "Service Provider"
                : role === "admin"
                ? "Admin (All)"
                : role === "franchise"
                ? "Franchise (All)"
                : role === "reservationist"
                ? "Reservationist (All)"
                : role === "staff"
                ? "Staff (All)"
                : "Other"}
            </div>
            <div>
              <Checkbox
                checked={notifications.email}
                onChange={(e) => {
                  const newData = { ...data };
                  newData[role].email = e.target.checked;
                  // Update state here
                }}
              />
            </div>
            <div>
              <Checkbox
                checked={notifications.sms}
                onChange={(e) => {
                  const newData = { ...data };
                  newData[role].sms = e.target.checked;
                  // Update state here
                }}
              />
            </div>
          </div>
        ))}
        {Object.keys(data).includes("other") && (
          <div className="pt-2">
            <Input
              placeholder="Separate multiple emails using a semicolon (;)"
              className="w-full"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-500 mb-4">
          Note: A valid SMS/Email Address must be provided in the Employee
          Profile in order for a User/Employee to receive Email messages.
        </div>
        <div className="text-sm text-gray-500 mb-4">
          (*) Indicates that all users/employees at the location will get the
          notification.
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          size="large"
          shape="round"
          className="bg-[#0F172A]"
        >
          Save
        </Button>
      </div>

      {/* Notification Tables in 2 Columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Customer Bookings */}
        <div>
          <div className="bg-gray-200 p-2 mb-4">
            <h3 className="font-medium">Customer Bookings</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-sm mb-2">
                When a customer books an appointment online, notify:
              </div>
              {renderNotificationTable(settings.customerBookings.books)}
            </div>
            <div>
              <div className="text-sm mb-2">
                When a customer cancels an appointment online, notify:
              </div>
              {renderNotificationTable(settings.customerBookings.cancels)}
            </div>
          </div>
        </div>

        {/* Right Column - Internal Bookings */}
        <div>
          <div className="bg-gray-200 p-2 mb-4">
            <h3 className="font-medium">Internal Bookings</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-sm mb-2">
                When a member of your staff books an appointment, notify:
              </div>
              {renderNotificationTable(settings.internalBookings.books)}
            </div>
            <div>
              <div className="text-sm mb-2">
                When a member of your staff modifies an appointment, notify:
              </div>
              {renderNotificationTable(settings.internalBookings.modifies)}
            </div>
          </div>
        </div>
      </div>

      {/* Orders/Products Section */}
      <div className="mt-6">
        <div className="bg-gray-200 p-2 mb-4">
          <h3 className="font-medium">Orders/Products</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Inventory Alerts */}
          <div>
            <div className="text-sm mb-2">
              When products send Inventory Alerts to:
            </div>
            {renderNotificationTable({
              admin: { email: false, sms: false },
              franchise: { email: false, sms: false },
              reservationist: { email: false, sms: false },
              staff: { email: false, sms: false },
              other: { email: false, sms: false },
            })}
          </div>

          {/* Right Column - Staff Check-ins */}
          <div>
            <div className="text-sm mb-2">
              When a member of your staff checks in a customer, notify:
            </div>
            {renderNotificationTable({
              serviceProvider: { email: false, sms: false },
            })}

            {/* General Section */}
            <div className="bg-gray-200 p-2 mb-4 mt-4">
              <h3 className="font-medium">General</h3>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <div className="mb-2">Include location name in Subject:</div>
                  <Radio.Group
                    value={settings.includeLocation === "Yes" ? "yes" : "no"}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        includeLocation:
                          e.target.value === "yes" ? "Yes" : "No",
                      })
                    }
                  >
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </div>

                <div className="flex items-center gap-2">
                  <span>
                    Send Internal SMS notifications when appointment is within
                    next:
                  </span>
                  <Input
                    value={settings.sendNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sendNotifications: e.target.value,
                      })
                    }
                    className="w-16"
                  />
                  <span>days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="mt-6">
        <div className="bg-gray-200 p-2 mb-4">
          <h3 className="font-medium">Waitlist</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Customer Added */}
          <div>
            <div className="text-sm mb-2">
              When a customer is added to the waitlist, notify:
            </div>
            {renderNotificationTable(
              {
                admin: { sms: false },
                franchise: { sms: false },
                reservationist: { sms: false },
              },
              { email: false, sms: true }
            )}
          </div>

          {/* Right Column - Time Slot Available */}
          <div>
            <div className="text-sm mb-2">
              When a time slot is available, notify:
            </div>
            {renderNotificationTable(
              {
                reservationist: { email: false },
              },
              { email: true, sms: false }
            )}
            <div className="mt-2">
              <Input
                placeholder="Separate multiple emails using a semicolon (;)"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
