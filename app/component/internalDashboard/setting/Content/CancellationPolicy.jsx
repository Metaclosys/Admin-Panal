"use client";
import React, { useState } from 'react';
import { Button, Radio, Input, Checkbox } from 'antd';

const { TextArea } = Input;

export default function CancellationPolicy() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isEditingReasons, setIsEditingReasons] = useState(false);
  const [form, setForm] = useState({
    applyPolicy: 'yes',
    applyTo: 'allCustomers',
    feeWithin: 1,
    cancellationFee: 'full',
    flatAmount: 0.00,
    percentageAmount: 0,
    staffContribution: 'none',
    staffContributionPercentage: 0,
    noShowFee: true,
    noShowStaffContribution: 'none',
    noShowPercentage: 0,
    enableReasons: 'yes',
    enableTax: 'yes'
  });

  const [policyText, setPolicyText] = useState(
    "We understand that things come up, when they do, please give us a courtesy call or cancel online at least 1 hour ahead of time. Not cancelling or calling ahead of time will be considered a NO SHOW and will result in a 35.00 charge to the card on file. Three NO-SHOW occasions will result in revoking online booking privileges along with having to pre pay for future appointments. ALL BOOKINGS MUST BE CONFIRMED OR ARE SUBJECT TO BE CANCELED WITHOUT NOTICE."
  );

  const [reasons, setReasons] = useState([
    { id: 1, text: 'Made by mistake' },
    { id: 2, text: 'No-call No-Show' },
    { id: 3, text: 'Other' },
    { id: 4, text: 'Rescheduled for another day' }
  ]);

  const [isRequired, setIsRequired] = useState(true);

  const handleSave = () => {
    console.log('Saving form:', form);
    setIsEditing(false);
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
  };

  const renderPolicySection = () => {
    if (isEditingNotes) {
      return (
        <div className="bg-white border rounded-lg mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Cancellation Policy</h2>
            <TextArea
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              rows={6}
              className="mb-6"
            />
            <div className="flex justify-end gap-4">
              <Button onClick={() => setIsEditingNotes(false)}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                className="bg-[#0F172A]"
                onClick={handleSaveNotes}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-base font-medium">Cancellation Policy</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingNotes(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>

        <div className="p-4">
          <p className="text-gray-700 leading-relaxed">
            {policyText}
          </p>
        </div>
      </div>
    );
  };

  const renderReasonsSection = () => {
    if (isEditingReasons) {
      return (
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-base font-medium">Cancellation Reasons</h3>
          </div>

          <div className="p-4">
            {reasons.map((reason) => (
              <div key={reason.id} className="flex items-center justify-between mb-3">
                <span>{reason.text}</span>
                <div className="flex gap-2">
                  <Button 
                    type="link" 
                    className="text-blue-500 p-0"
                  >
                    Remove
                  </Button>
                  <Button 
                    type="link" 
                    className="text-blue-500 p-0"
                  >
                    Rename
                  </Button>
                </div>
              </div>
            ))}

            <Button 
              className="mt-2 mb-4"
              size="small"
            >
              Add
            </Button>

            <div className="border-t pt-4">
              <Checkbox 
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
              >
                Required
              </Checkbox>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button 
                onClick={() => setIsEditingReasons(false)}
              >
                Close Edit
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-base font-medium">Cancellation Reasons</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingReasons(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>

        <div className="p-4 space-y-3">
          {reasons.map((reason) => (
            <div key={reason.id}>{reason.text}</div>
          ))}
          
          <div className="flex mt-6">
            <span className="w-24">Required:</span>
            <span>{isRequired ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    );
  };

  if (isEditing) {
    return (
      <div className="bg-gray-300 text-black rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Edit Cancellation Policy Rules</h2>
        <div className="bg-white rounded-lg p-6 space-y-6">
          <div>
            <div className="mb-2">Apply Cancellation Policy:</div>
            <Radio.Group 
              value={form.applyPolicy}
              onChange={e => setForm({...form, applyPolicy: e.target.value})}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Apply To:</div>
            <Radio.Group 
              value={form.applyTo}
              onChange={e => setForm({...form, applyTo: e.target.value})}
            >
              <Radio value="allCustomers">All customers</Radio>
              <Radio value="newCustomers">New customers only</Radio>
              <Radio value="existingCustomers">Existing customers only</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Apply Cancellation Fee within:</div>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={form.feeWithin}
                onChange={e => setForm({...form, feeWithin: e.target.value})}
                className="w-20"
              />
              <span>hours before appointment</span>
            </div>
          </div>

          <div>
            <div className="mb-2">Cancellation Fee:</div>
            <Radio.Group 
              value={form.cancellationFee}
              onChange={e => setForm({...form, cancellationFee: e.target.value})}
              className="space-y-2"
            >
              <Radio value="full">Full appointment fee</Radio>
              <Radio value="flat">
                <span className="flex items-center gap-2">
                  Flat dollar amount $
                  <Input 
                    value={form.flatAmount}
                    onChange={e => setForm({...form, flatAmount: e.target.value})}
                    className="w-20"
                    disabled={form.cancellationFee !== 'flat'}
                  />
                  (USD)
                </span>
              </Radio>
              <Radio value="percentage">
                <span className="flex items-center gap-2">
                  Percentage of Appointment value
                  <Input 
                    value={form.percentageAmount}
                    onChange={e => setForm({...form, percentageAmount: e.target.value})}
                    className="w-20"
                    disabled={form.cancellationFee !== 'percentage'}
                  />
                  %
                </span>
              </Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Pay Staff contribution from No Show Fee:</div>
            <Radio.Group 
              value={form.staffContribution}
              onChange={e => setForm({...form, staffContribution: e.target.value})}
            >
              <Radio value="none">None</Radio>
              <Radio value="full">Full No Show fee</Radio>
              <Radio value="percentage">
                <span className="flex items-center gap-2">
                  Percentage of No Show fee
                  <Input 
                    value={form.noShowPercentage}
                    onChange={e => setForm({...form, noShowPercentage: e.target.value})}
                    className="w-20"
                    disabled={form.staffContribution !== 'percentage'}
                  />
                  %
                </span>
              </Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">No Show Fee:</div>
            <Checkbox 
              checked={form.noShowFee}
              onChange={e => setForm({...form, noShowFee: e.target.checked})}
            >
              Same fee as Cancellation
            </Checkbox>
          </div>

          <div>
            <div className="mb-2">Enable Cancellation Reasons:</div>
            <Radio.Group 
              value={form.enableReasons}
              onChange={e => setForm({...form, enableReasons: e.target.value})}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div>
            <div className="mb-2">Enable Cancellation Tax:</div>
            <Radio.Group 
              value={form.enableTax}
              onChange={e => setForm({...form, enableTax: e.target.value})}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              className="bg-[#0F172A]"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      {/* Rules Section */}
      <div className=" bg-white border  rounded-lg mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-base font-medium">Rules</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditing(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>

        <div className="bg-white p-4 space-y-3">
          <div className="flex">
            <span className="w-64">Apply to:</span>
            <span>All customers</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">Apply Cancellation Fee Within:</span>
            <span>1 hours</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">Cancellation Fee:</span>
            <span>$35.00 Flat dollar amount</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">Cancellation Staff contribution:</span>
            <span>None</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">No Show Fee:</span>
            <span>$35.00 Flat dollar amount</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">No Show Staff contribution:</span>
            <span>None</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">Enable Cancellation Reasons:</span>
            <span>Yes</span>
          </div>

          <div className="bg-white flex">
            <span className="w-64">Enable Cancellation Tax:</span>
            <span>No</span>
          </div>
        </div>
      </div>

      {/* Cancellation Policy Text Section */}
      {renderPolicySection()}

      {/* Cancellation Reasons Section */}
      {renderReasonsSection()}
    </div>
  );
} 