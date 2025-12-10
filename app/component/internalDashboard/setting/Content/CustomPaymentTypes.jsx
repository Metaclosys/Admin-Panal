"use client";
import React, { useState } from 'react';
import { Button, Table, Select, Input, Checkbox } from 'antd';
import DeletePop from '../../deletePop/deletePop';

export default function CustomPaymentTypes() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPaymentType, setEditingPaymentType] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPaymentType, setDeletingPaymentType] = useState(null);
  const [newPaymentType, setNewPaymentType] = useState({
    type: '',
    name: '',
    selectableInPOS: true
  });

  const [paymentTypes, setPaymentTypes] = useState([
    {
      key: '1',
      type: 'Cash Equivalent',
      name: 'Barber product use',
      selectableInPOS: true,
    },
    {
      key: '2',
      type: 'Cash Equivalent', 
      name: 'Barber product use',
      selectableInPOS: true,
    },
    {
      key: '3',
      type: 'Cash Equivalent',
      name: 'Barber product use', 
      selectableInPOS: true,
    },
    {
      key: '4',
      type: 'Cash Equivalent',
      name: 'Barber product use',
      selectableInPOS: true,
    },
    {
      key: '5',
      type: 'Cash Equivalent',
      name: 'Barber product use',
      selectableInPOS: true,
    }
  ]);

  const handleDelete = (record) => {
    setDeletingPaymentType(record);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setPaymentTypes(paymentTypes.filter(pt => pt.key !== deletingPaymentType.key));
    setShowDeleteConfirm(false);
    setDeletingPaymentType(null);
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Selectable in POS',
      dataIndex: 'selectableInPOS',
      key: 'selectableInPOS',
      render: (selectable) => (
        <span>{selectable ? '✓' : ''}</span>
      ),
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
              setEditingPaymentType(record);
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

  const renderAddForm = () => (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Custom Payment Types {'>'} Add</h2>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <div className="mb-2">
            Type <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select One -"
            className="w-full"
            value={newPaymentType.type}
            onChange={value => setNewPaymentType({...newPaymentType, type: value})}
            options={[
              { value: 'cash_equivalent', label: 'Cash Equivalent' },
              { value: 'credit_card', label: 'Credit Card' },
              { value: 'gift_card', label: 'Gift Card' },
            ]}
          />
        </div>

        <div>
          <div className="mb-2">
            Name <span className="text-red-500">*</span>
          </div>
          <Input
            value={newPaymentType.name}
            onChange={e => setNewPaymentType({...newPaymentType, name: e.target.value})}
            placeholder="Enter name"
          />
        </div>

        <div>
          <Checkbox
            checked={newPaymentType.selectableInPOS}
            onChange={e => setNewPaymentType({...newPaymentType, selectableInPOS: e.target.checked})}
          >
            Selectable in Point of Sale
          </Checkbox>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            shape="round"
            onClick={() => {
              setIsAdding(false);
              setNewPaymentType({
                type: '',
                name: '',
                selectableInPOS: true
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
              setPaymentTypes([
                ...paymentTypes,
                {
                  key: String(paymentTypes.length + 1),
                  ...newPaymentType
                }
              ]);
              setIsAdding(false);
              setNewPaymentType({
                type: '',
                name: '',
                selectableInPOS: true
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Custom Payment Types {'>'} Edit</h2>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <div className="mb-2">
            Type <span className="text-red-500">*</span>
          </div>
          <Select
            placeholder="- Select One -"
            className="w-full"
            value={editingPaymentType.type}
            onChange={value => setEditingPaymentType({
              ...editingPaymentType,
              type: value
            })}
            options={[
              { value: 'Cash Equivalent', label: 'Cash Equivalent' },
              { value: 'Credit Card', label: 'Credit Card' },
              { value: 'Gift Card', label: 'Gift Card' },
            ]}
          />
        </div>

        <div>
          <div className="mb-2">
            Name <span className="text-red-500">*</span>
          </div>
          <Input
            value={editingPaymentType.name}
            onChange={e => setEditingPaymentType({
              ...editingPaymentType,
              name: e.target.value
            })}
            placeholder="Enter name"
          />
        </div>

        <div>
          <Checkbox
            checked={editingPaymentType.selectableInPOS}
            onChange={e => setEditingPaymentType({
              ...editingPaymentType,
              selectableInPOS: e.target.checked
            })}
          >
            Selectable in Point of Sale
          </Checkbox>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            shape="round"
            onClick={() => {
              setIsEditing(false);
              setEditingPaymentType(null);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            shape="round"
            className="bg-[#0F172A]"
            onClick={() => {
              // Update the payment type in the list
              setPaymentTypes(paymentTypes.map(pt => 
                pt.key === editingPaymentType.key ? editingPaymentType : pt
              ));
              setIsEditing(false);
              setEditingPaymentType(null);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  if (isEditing && editingPaymentType) {
    return renderEditForm();
  }

  if (isAdding) {
    return renderAddForm();
  }

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Custom Payment Types</h2>
        <Button 
          type="primary"
          className="bg-[#0F172A]"
          size="large"
          shape="round"
          onClick={() => setIsAdding(true)}
        >
          + Add Custom Payment Type
        </Button>
      </div>

      <div className="bg-white rounded-lg">
        <Table 
          columns={columns} 
          dataSource={paymentTypes}
          pagination={false}
          className="[&_.ant-table-thead>tr>th]:bg-gray-100"
        />
      </div>

      {showDeleteConfirm && (
        <DeletePop
          title="Are you sure you want to delete this custom payment type?"
          message="This will delete the custom payment type permanently you will not undo this action."
          onCancel={() => {
            setShowDeleteConfirm(false);
            setDeletingPaymentType(null);
          }}
          onDelete={handleDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setDeletingPaymentType(null);
          }}
        />
      )}
    </div>
  );
}