"use client";
import React, { useState } from 'react';
import { Button, Input, Select, Checkbox, Radio } from 'antd';

const { TextArea } = Input;

export default function CreateClientForm({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    serviceCategory: '',
    description: '',
    defaultFields: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
      preferredContact: true,
      dateOfBirth: true
    },
    requireSignature: false,
    sendingOptions: {
      whenToSend: 'firstTime',
      sendAfterBooking: false,
      sendAfterConfirmation: false
    }
  });

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create Form</h2>
        <Button 
          type="link" 
          className="text-blue-500"
          onClick={onBack}
        >
          Back
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <div className="mb-2">
            Name <span className="text-red-500">*</span>
          </div>
          <Input 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>

        <div>
          <div className="mb-2">
            Service Category <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select One -"
            className="w-full"
            value={form.serviceCategory}
            onChange={value => setForm({...form, serviceCategory: value})}
          />
        </div>

        <div>
          <div className="mb-2">
            Description <span className="text-red-500">*</span>
          </div>
          <TextArea
            placeholder="Tell your clients what this form is for"
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            rows={4}
          />
        </div>

        {/* Default Fields */}
        <div>
          <div className="font-medium mb-4">What do you need to know about your clients?</div>
          <div className="text-sm text-gray-500 mb-4">This intake form already includes:</div>
          <div className="space-y-2">
            {Object.entries(form.defaultFields).map(([field, checked]) => (
              <div key={field}>
                <Checkbox
                  checked={checked}
                  onChange={e => setForm({
                    ...form,
                    defaultFields: {
                      ...form.defaultFields,
                      [field]: e.target.checked
                    }
                  })}
                >
                  {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </Checkbox>
              </div>
            ))}
          </div>
          <Button 
            type="primary"
            className="mt-4 bg-[#0F172A]"
            size="large"
            shape="round"
          >
            Add Custom Question
          </Button>
        </div>

        {/* Business Policies */}
        <div>
          <div className="font-medium mb-2">What are your business policies?</div>
          <TextArea
            placeholder="Tell clients what to expect if they cancel or don't show up."
            rows={4}
            className="mb-4"
          />
          <div className="text-sm mb-2">List other policies that need your client's signature, like a liability waiver, consent info, and code of conduct.</div>
          <Button 
            type="primary"
            className="bg-[#0F172A]"
            size="large"
            shape="round"
          >
            Add More Policies
          </Button>
          <div className="mt-4">
            <Checkbox
              checked={form.requireSignature}
              onChange={e => setForm({...form, requireSignature: e.target.checked})}
            >
              Require client signature
            </Checkbox>
          </div>
        </div>

        {/* Form Settings */}
        <div>
          <div className="font-medium mb-2">Who should get this form?</div>
          <Radio.Group 
            value={form.sendingOptions.whenToSend}
            onChange={e => setForm({
              ...form,
              sendingOptions: {
                ...form.sendingOptions,
                whenToSend: e.target.value
              }
            })}
            className="space-y-2"
          >
            <Radio value="newClient">Only when a new client books this service</Radio>
            <Radio value="firstTime">When someone books this service for the first time</Radio>
            <Radio value="always">When anyone books this service, even if they've had it before</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="font-medium mb-2">When do you want to send it?</div>
          <div className="space-y-2">
            <Checkbox
              checked={form.sendingOptions.sendAfterBooking}
              onChange={e => setForm({
                ...form,
                sendingOptions: {
                  ...form.sendingOptions,
                  sendAfterBooking: e.target.checked
                }
              })}
            >
              Send it after the client books their service
            </Checkbox>
            <Checkbox
              checked={form.sendingOptions.sendAfterConfirmation}
              onChange={e => setForm({
                ...form,
                sendingOptions: {
                  ...form.sendingOptions,
                  sendAfterConfirmation: e.target.checked
                }
              })}
            >
              Send it after the client confirms their service
            </Checkbox>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button>Preview</Button>
          <Button 
            type="primary"
            className="bg-[#0F172A]"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
} 