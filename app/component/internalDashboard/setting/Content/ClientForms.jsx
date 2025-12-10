"use client";
import React, { useState } from 'react';
import { Button } from 'antd';
import CreateClientForm from './CreateClientForm';

export default function ClientForms() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <CreateClientForm onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      {/* Description */}
      <div className="mb-4 text-sm text-gray-600">
        These forms help you get to know clients, ask them questions, and share your policies.
      </div>

      {/* Forms Table */}
      <div className="bg-white border rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-3 border-b text-sm font-medium">
          <div className="p-4">Name</div>
          <div className="p-4">Last Updated</div>
          <div className="p-4">Client Type</div>
        </div>

        {/* Empty State */}
        <div className="p-4 text-gray-500">
          You don't have any forms.
        </div>
      </div>

      {/* Create Form Button */}
      <Button 
        type="primary"
        size="large"
        shape="round"
        className="mt-6 bg-[#0F172A]"
        onClick={() => setIsCreating(true)}
      >
        Create Form
      </Button>
    </div>
  );
} 