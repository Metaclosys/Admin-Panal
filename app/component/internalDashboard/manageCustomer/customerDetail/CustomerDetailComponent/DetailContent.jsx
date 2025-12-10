"use client";
import { Input, Select, DatePicker, Checkbox, Button } from "antd";

function DetailContent() {
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-230px)]">
      <div className="grid grid-cols-3 gap-6">
        {/* Personal Information */}
        <div>
          <label className="text-sm text-gray-600">First Name*</label>
          <Input defaultValue="Angel" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Last Name*</label>
          <Input defaultValue="Marquez-Cabrera" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email*</label>
          <Input defaultValue="angelmarquez370@gmail.com" className="w-full" />
        </div>

        {/* Location Information */}
        <div>
          <label className="text-sm text-gray-600">Country</label>
          <Select defaultValue="United States" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Gender</label>
          <Select defaultValue="Not Specified" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Occupation</label>
          <Input className="w-full" />
        </div>

        {/* Contact Information */}
        <div>
          <label className="text-sm text-gray-600">Mobile Phone</label>
          <Input defaultValue="(408) 401-4783" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Home Phone</label>
          <Input placeholder="(XXX) XXX - XXXX" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Work Phone</label>
          <Input placeholder="(XXX) XXX - XXXX" className="w-full" />
        </div>

        {/* Dates */}
        <div>
          <label className="text-sm text-gray-600">Birthday</label>
          <div className="flex gap-2">
            <Select placeholder="MM" className="w-24" />
            <Select placeholder="DD" className="w-24" />
            <Select placeholder="YYYY" className="w-24" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Anniversary Date</label>
          <div className="flex gap-2">
            <Select placeholder="MM" className="w-24" />
            <Select placeholder="DD" className="w-24" />
            <Select placeholder="YYYY" className="w-24" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Preferred Contact</label>
          <Select defaultValue="Email" className="w-full" />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Active Profile
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Mailing List
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Email Types
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Transactional
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Promotional
        </label>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-gray-600">Booking Alert</label>
          <Input.TextArea rows={4} className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Check-In Alert</label>
          <Input.TextArea rows={4} className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Check-out Alert</label>
          <Input.TextArea rows={4} className="w-full" />
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-blue-500 text-white px-4 py-2 font-medium">
        ADDRESS INFORMATION
      </div>
      <div className="space-y-6">
        {/* Home Address */}
        <div>
          <label className="text-sm text-gray-600">Home Address:</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <label className="text-sm text-gray-600">Street 1</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Street 2</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">City</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">State</label>
              <Select className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Postal Code</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Country</label>
              <Select defaultValue="United States" className="w-full" />
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Business Address:</label>
            <Checkbox>Same as Home Address</Checkbox>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <label className="text-sm text-gray-600">Street 1</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Street 2</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">City</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">State</label>
              <Select className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Postal Code</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Country</label>
              <Select defaultValue="United States" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-blue-500 text-white px-4 py-2 font-medium">
        PREFERENCES
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Preferred Staff Gender:</label>
          <Select defaultValue="No Preference" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Preferred Staff Member:</label>
          <Select defaultValue="No Preference" className="w-full" />
        </div>
      </div>

      {/* Account Login */}
      <div className="bg-blue-500 text-white px-4 py-2 font-medium">
        ACCOUNT LOGIN
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Login:</label>
            <Input defaultValue="angelmarquez370@gmail.com" disabled className="w-full bg-gray-100" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Login Alert:</label>
            <Input className="w-full" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Password:</label>
          <button className="text-blue-500 hover:underline">Change</button>
          <p className="text-sm text-gray-500 ml-4">Appears in Customer on Login</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button style={{width: "80px"}} size="large" type="primary" shape="default" className="bg-transparent text-black border border-gray-300 hover:bg-gray-50">Back</Button>
        <Button style={{width: "80px"}} size="large" type="primary" shape="default" className="bg-blue-900 text-white hover:bg-blue-800">Save</Button>
      </div>
    </div>
  );
}

export default DetailContent;
