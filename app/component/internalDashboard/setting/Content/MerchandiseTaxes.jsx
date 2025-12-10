"use client";
import React, { useState } from 'react';
import { Button, Tabs, Checkbox } from 'antd';

export default function MerchandiseTaxes() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Product');
  const [editingTaxes, setEditingTaxes] = useState({
    Product: {
      'Sales Tax': false,
      'Service Tax': false
    },
    Service: {
      'Sales Tax': false,
      'Service Tax': false
    },
    Membership: {
      'Sales Tax': false,
      'Service Tax': false
    }
  });

  const [taxes, setTaxes] = useState({
    Product: {
      'Sales Tax': 'Yes',
      'Service Tax': ''
    },
    Service: {
      'Sales Tax': 'Yes',
      'Service Tax': ''
    },
    Membership: {
      'Sales Tax': 'Yes',
      'Service Tax': ''
    }
  });

  const renderTaxTable = () => (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg">
        <h3 className="font-medium">Applicable Taxes</h3>
        <Button 
          type="link" 
          className="text-blue-500 p-0 flex items-center gap-1 h-auto"
          onClick={() => setIsEditing(true)}
        >
          <span className="text-blue-500">✏️</span>
          Edit
        </Button>
      </div>

      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex gap-8 mb-4 border-b">
          {Object.keys(taxes).map((category) => (
            <button
              key={category}
              className={`pb-2 px-1 relative ${
                activeTab === category 
                  ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500' 
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tax List */}
        <div className="space-y-4">
          {Object.entries(taxes[activeTab]).map(([taxName, value]) => (
            <div key={taxName} className="flex">
              <span className="w-32 text-gray-600">{taxName}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <div className="bg-white rounded-lg">
      <div className="p-4">
        <div className="bg-gray-100 p-2 mb-4">
          <h3 className="font-medium">Applicable Taxes</h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 mb-6 text-blue-500">
          {Object.keys(editingTaxes).map((category) => (
            <button
              key={category}
              className={`${activeTab === category ? 'font-medium' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tax Checkboxes */}
        <div className="space-y-4">
          {Object.entries(editingTaxes[activeTab]).map(([taxName, checked]) => (
            <div key={taxName} className="flex items-center">
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  setEditingTaxes({
                    ...editingTaxes,
                    [activeTab]: {
                      ...editingTaxes[activeTab],
                      [taxName]: e.target.checked
                    }
                  });
                }}
              >
                {taxName}
              </Checkbox>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            shape="round"
            onClick={() => {
              setIsEditing(false);
              // Reset editing state
              setEditingTaxes({
                Product: {
                  'Sales Tax': taxes.Product['Sales Tax'] === 'Yes',
                  'Service Tax': taxes.Product['Service Tax'] === 'Yes'
                },
                Service: {
                  'Sales Tax': taxes.Service['Sales Tax'] === 'Yes',
                  'Service Tax': taxes.Service['Service Tax'] === 'Yes'
                },
                Membership: {
                  'Sales Tax': taxes.Membership['Sales Tax'] === 'Yes',
                  'Service Tax': taxes.Membership['Service Tax'] === 'Yes'
                }
              });
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            shape="round"
            className="bg-[#0F172A]"
            onClick={() => {
              // Save changes
              setTaxes({
                Product: {
                  'Sales Tax': editingTaxes.Product['Sales Tax'] ? 'Yes' : '',
                  'Service Tax': editingTaxes.Product['Service Tax'] ? 'Yes' : ''
                },
                Service: {
                  'Sales Tax': editingTaxes.Service['Sales Tax'] ? 'Yes' : '',
                  'Service Tax': editingTaxes.Service['Service Tax'] ? 'Yes' : ''
                },
                Membership: {
                  'Sales Tax': editingTaxes.Membership['Sales Tax'] ? 'Yes' : '',
                  'Service Tax': editingTaxes.Membership['Service Tax'] ? 'Yes' : ''
                }
              });
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        Merchandise Taxes {isEditing ? '> Edit' : ''}
      </h2>
      {isEditing ? renderEditForm() : renderTaxTable()}
    </div>
  );
} 