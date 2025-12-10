"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { message, Switch, Button } from "antd";
import DeletePop from "../../../dashboard/deletePop/deletePop";
import UniversalTable from "../../../dashboard/table/universalTable";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

function MiddleSection({ 
  employees = [], 
  loading, 
  onEmployeeUpdated,
  onEmployeeDeleted 
}) {
  const { data: session } = useSession();
  const [editingId, setEditingId] = useState(null);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleSave = async (record) => {
    if (!record?.id) return;
    
    try {
      const updatedValues = editedValues[record.id] || {};
      if (Object.keys(updatedValues).length === 0) {
        setEditingId(null);
        return;
      }

      await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(record.id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ ...record, ...updatedValues })
      });

      message.success("Employee updated successfully");
      onEmployeeUpdated();
      setEditedValues((prev) => {
        const newValues = { ...prev };
        delete newValues[record.id];
        return newValues;
      });
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update employee");
    }
    setEditingId(null);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (!employeeId) return;
    
    try {
      await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(employeeId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      });
      message.success("Employee deleted successfully");
      onEmployeeDeleted();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete employee");
    }
    setShowDeletePop(false);
  };

  const handleInputChange = (employeeId, field, value) => {
    if (!employeeId) return;
    
    setEditedValues((prev) => ({
      ...prev,
      [employeeId]: {
        ...(prev[employeeId] || {}),
        [field]: value,
      },
    }));
  };

  const tableData = Array.isArray(employees)
    ? employees.map((employee, index) => ({
        ...employee,
        key: employee.id || employee._id || employee.userId || employee.email || `employee-${index}`,
      }))
    : [];

  const columns = [
    {
      title: "Name",
      key: "name", 
      render: (_, record) => {
        if (!record) return 'N/A';
        
        const isEditing = record.id === editingId;
        if (isEditing) {
          return (
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue={record.firstName || ''}
                onChange={(e) => handleInputChange(record.id, "firstName", e.target.value)}
                className="w-full px-2 py-1 border rounded"
                placeholder="First Name"
              />
              <input
                type="text"
                defaultValue={record.lastName || ''}
                onChange={(e) => handleInputChange(record.id, "lastName", e.target.value)}
                className="w-full px-2 py-1 border rounded"
                placeholder="Last Name"
              />
            </div>
          );
        }
        return `${record.firstName || ''} ${record.lastName || ''}`.trim() || 'N/A';
      },
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => {
        if (!record) return 'N/A';
        
        const isEditing = record.id === editingId;
        return isEditing ? (
          <input
            type="email"
            defaultValue={record.email || ''}
            onChange={(e) => handleInputChange(record.id, "email", e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        ) : (
          record.email || 'N/A'
        );
      },
    },
    {
      title: "Phone",
      key: "phone",
      render: (_, record) => {
        if (!record) return 'N/A';
        
        const isEditing = record.id === editingId;
        return isEditing ? (
          <input
            type="tel"
            defaultValue={record.phone || ''}
            onChange={(e) => handleInputChange(record.id, "phone", e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        ) : (
          record.phone || 'N/A'
        );
      },
    },
    {
      title: "Position",
      key: "position",
      render: (_, record) => {
        if (!record) return 'N/A';
        
        const isEditing = record.id === editingId;
        return isEditing ? (
          <input
            type="text"
            defaultValue={record.position || ''}
            onChange={(e) => handleInputChange(record.id, "position", e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        ) : (
          record.position || 'N/A'
        );
      },
    },
    {
      title: "Status",
      key: "active",
      render: (_, record) => {
        if (!record) return 'N/A';
        
        const isEditing = record.id === editingId;
        return isEditing ? (
          <Switch
            checked={editedValues[record.id]?.active ?? record.active}
            onChange={(checked) => handleInputChange(record.id, "active", checked)}
            size="small"
          />
        ) : (
          <span className={record.active ? "text-green-600" : "text-red-600"}>
            {record.active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        if (!record) return null;
        
        const isEditing = record.id === editingId;
        return (
          <div className="flex gap-2 justify-center">
            <Button
              type="link"
              onClick={() => {
                if (isEditing) {
                  handleSave(record);
                } else {
                  setEditingId(record.id);
                  setEditedValues((prev) => ({ ...prev, [record.id]: {} }));
                }
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                type="link"
                onClick={() => {
                  setEditingId(null);
                  setEditedValues((prev) => {
                    const newValues = { ...prev };
                    delete newValues[record.id];
                    return newValues;
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              type="link"
              danger
              onClick={() => {
                setSelectedEmployee(record);
                setShowDeletePop(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <UniversalTable
        columns={columns}
        data={tableData}
        loading={loading}
        rowClassName={(record) => record?.id === editingId ? "bg-blue-50" : ""}
      />
      {showDeletePop && selectedEmployee && (
        <DeletePop
          title="Delete Employee"
          message="Are you sure you want to delete this employee? This action cannot be undone."
          onCancel={() => {
            setShowDeletePop(false);
            setSelectedEmployee(null);
          }}
          onDelete={() => handleDeleteEmployee(selectedEmployee.id)}
          onClose={() => setShowDeletePop(false)}
        />
      )}
    </>
  );
}

export default MiddleSection;

