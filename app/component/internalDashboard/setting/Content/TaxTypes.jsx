"use client";
import React, { useState } from 'react';
import { Button, Table, Input, Radio, Select } from 'antd';
import DeletePop from '../../deletePop/deletePop';

export default function TaxTypes() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingTax, setDeletingTax] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaxType, setNewTaxType] = useState({
    name: '',
    rate: '',
    appliedToExternal: 'Yes',
    category: '',
    subcategory: '',
    allowFlexible: 'Yes',
    includedInItemPrice: 'Yes',
    isActive: 'Yes'
  });

  const [taxTypes, setTaxTypes] = useState([
    {
      key: '1',
      name: 'Sales Tax',
      status: 'Active',
      rate: '9.38%',
      flexible: 'FALSE',
      includedInItemPrice: 'No',
      appliedTo: 'Product'
    },
    {
      key: '2',
      name: 'Service Tax',
      status: 'Active',
      rate: '%',
      flexible: 'FALSE',
      includedInItemPrice: 'No',
      appliedTo: ''
    }
  ]);

  const handleDelete = (record) => {
    setDeletingTax(record);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setTaxTypes(taxTypes.filter(tax => tax.key !== deletingTax.key));
    setShowDeleteConfirm(false);
    setDeletingTax(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Flexible',
      dataIndex: 'flexible',
      key: 'flexible',
    },
    {
      title: 'Included in Item Price',
      dataIndex: 'includedInItemPrice',
      key: 'includedInItemPrice',
    },
    {
      title: 'Applied To',
      dataIndex: 'appliedTo',
      key: 'appliedTo',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="link" 
            className="text-blue-500 p-0"
            onClick={() => {
              setEditingTax(record);
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          <span className="text-gray-300">|</span>
          <Button 
            type="link" 
            className="text-red-500 p-0"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const renderEditForm = () => (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tax Types {'>'} Edit</h2>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <div className="mb-2">
            Name <span className="text-red-500">*</span>
          </div>
          <Input
            value={editingTax.name}
            onChange={e => setEditingTax({...editingTax, name: e.target.value})}
            placeholder="Enter name"
          />
        </div>

        <div>
          <div className="mb-2">
            Rate <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={editingTax.rate?.replace('%', '')}
              onChange={e => setEditingTax({...editingTax, rate: e.target.value})}
              placeholder="Enter rate"
              className="w-32"
            />
            <span>%</span>
          </div>
        </div>

        <div>
          <div className="mb-2">Tax is applied to external order items:</div>
          <Radio.Group
            value={editingTax.appliedToExternal || 'Yes'}
            onChange={e => setEditingTax({...editingTax, appliedToExternal: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">
            Category <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select One -"
            className="w-full"
            value={editingTax.category}
            onChange={value => setEditingTax({...editingTax, category: value})}
          />
        </div>

        <div>
          <div className="mb-2">
            Subcategory <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select Category First -"
            className="w-full"
            value={editingTax.subcategory}
            onChange={value => setEditingTax({...editingTax, subcategory: value})}
            disabled={!editingTax.category}
          />
        </div>

        <div>
          <div className="mb-2">Allow Flexible:</div>
          <Radio.Group
            value={editingTax.flexible === 'TRUE' ? 'Yes' : 'No'}
            onChange={e => setEditingTax({...editingTax, flexible: e.target.value === 'Yes' ? 'TRUE' : 'FALSE'})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">Included in Item Price:</div>
          <Radio.Group
            value={editingTax.includedInItemPrice}
            onChange={e => setEditingTax({...editingTax, includedInItemPrice: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">Is Active:</div>
          <Radio.Group
            value={editingTax.status === 'Active' ? 'Yes' : 'No'}
            onChange={e => setEditingTax({...editingTax, status: e.target.value === 'Yes' ? 'Active' : 'Inactive'})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            shape="round"
            onClick={() => {
              setIsEditing(false);
              setEditingTax(null);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            shape="round"
            className="bg-[#0F172A]"
            onClick={() => {
              // Update the tax type in the list
              setTaxTypes(taxTypes.map(tax => 
                tax.key === editingTax.key ? editingTax : tax
              ));
              setIsEditing(false);
              setEditingTax(null);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAddForm = () => (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tax Types {'>'} Add</h2>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <div className="mb-2">
            Name <span className="text-red-500">*</span>
          </div>
          <Input
            value={newTaxType.name}
            onChange={e => setNewTaxType({...newTaxType, name: e.target.value})}
            placeholder="Enter name"
          />
        </div>

        <div>
          <div className="mb-2">
            Rate <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={newTaxType.rate}
              onChange={e => setNewTaxType({...newTaxType, rate: e.target.value})}
              placeholder="Enter rate"
              className="w-32"
            />
            <span>%</span>
          </div>
        </div>

        <div>
          <div className="mb-2">Tax is applied to external order items:</div>
          <Radio.Group
            value={newTaxType.appliedToExternal}
            onChange={e => setNewTaxType({...newTaxType, appliedToExternal: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">
            Category <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select One -"
            className="w-full"
            value={newTaxType.category}
            onChange={value => setNewTaxType({...newTaxType, category: value})}
          />
        </div>

        <div>
          <div className="mb-2">
            Subcategory <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select Category First -"
            className="w-full"
            value={newTaxType.subcategory}
            onChange={value => setNewTaxType({...newTaxType, subcategory: value})}
            disabled={!newTaxType.category}
          />
        </div>

        <div>
          <div className="mb-2">Allow Flexible:</div>
          <Radio.Group
            value={newTaxType.allowFlexible}
            onChange={e => setNewTaxType({...newTaxType, allowFlexible: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">Included in Item Price:</div>
          <Radio.Group
            value={newTaxType.includedInItemPrice}
            onChange={e => setNewTaxType({...newTaxType, includedInItemPrice: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div>
          <div className="mb-2">Is Active:</div>
          <Radio.Group
            value={newTaxType.isActive}
            onChange={e => setNewTaxType({...newTaxType, isActive: e.target.value})}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            shape="round"
            onClick={() => {
              setIsAdding(false);
              setNewTaxType({
                name: '',
                rate: '',
                appliedToExternal: 'Yes',
                category: '',
                subcategory: '',
                allowFlexible: 'Yes',
                includedInItemPrice: 'Yes',
                isActive: 'Yes'
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
              // Add validation and save logic here
              setTaxTypes([
                ...taxTypes,
                {
                  key: String(taxTypes.length + 1),
                  name: newTaxType.name,
                  status: newTaxType.isActive === 'Yes' ? 'Active' : 'Inactive',
                  rate: `${newTaxType.rate}%`,
                  flexible: newTaxType.allowFlexible === 'Yes' ? 'TRUE' : 'FALSE',
                  includedInItemPrice: newTaxType.includedInItemPrice,
                  appliedTo: newTaxType.category
                }
              ]);
              setIsAdding(false);
              setNewTaxType({
                name: '',
                rate: '',
                appliedToExternal: 'Yes',
                category: '',
                subcategory: '',
                allowFlexible: 'Yes',
                includedInItemPrice: 'Yes',
                isActive: 'Yes'
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  if (isEditing && editingTax) {
    return renderEditForm();
  }

  if (isAdding) {
    return renderAddForm();
  }

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tax Types</h2>
        <Button 
          type="primary"
          className="bg-[#0F172A]"
          size="large"
          shape="round"
          onClick={() => setIsAdding(true)}
        >
          + Add Tax Type
        </Button>
      </div>

      <div className="bg-white rounded-lg">
        <Table 
          columns={columns} 
          dataSource={taxTypes}
          pagination={false}
          className="[&_.ant-table-thead>tr>th]:bg-gray-100"
        />
      </div>

      {showDeleteConfirm && (
        <DeletePop
          title="Are you sure you want to delete this tax type?"
          message="This will delete the tax type permanently you will not undo this action."
          onCancel={() => {
            setShowDeleteConfirm(false);
            setDeletingTax(null);
          }}
          onDelete={handleDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setDeletingTax(null);
          }}
        />
      )}
    </div>
  );
} 