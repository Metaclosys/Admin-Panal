"use client";
import { useState, useEffect } from 'react';
import { Select, Button, Popover, Checkbox, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from '../../../../api/apiContent/apiContent';

const BookingFilters = ({ onFilterChange, defaultView = "rooms", onViewChange }) => {
  const { data: session } = useSession();
  const [selectedView, setSelectedView] = useState(defaultView);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [employeesData, servicesData, roomsData] = await Promise.all([
          apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }
          }),
          apiCall(API_ENDPOINTS.SERVICES.BASE, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }
          }),
          apiCall(API_ENDPOINTS.ROOMS.BASE, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }
          })
        ]);

        setEmployees(employeesData || []);
        setServices(servicesData || []);
        setRooms(roomsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchData();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    setSelectedView(defaultView);
  }, [defaultView]);

  const handleViewChange = (value) => {
    setSelectedView(value);
    if (value !== "employees" && typeof onFilterChange === "function") {
      onFilterChange({ type: value });
    }
    if (typeof onViewChange === "function") {
      onViewChange(value);
    }
  };

  const handleEmployeeSelect = (checkedValues) => {
    setSelectedEmployees(checkedValues);
    onFilterChange({ employees: checkedValues });
  };

  const employeeContent = (
    <div className="p-4" style={{ maxWidth: '300px' }}>
      <div className="mb-4">
        <h3 className="text-lg mb-2">Filter Staff:</h3>
        <Checkbox.Group 
          onChange={handleEmployeeSelect}
          value={selectedEmployees}
        >
          <Space direction="vertical">
            {employees.map(employee => (
              <Checkbox key={employee.id} value={employee.id}>
                {employee.name}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={() => setSelectedEmployees([])}>Cancel</Button>
        <Button type="primary" className="ml-2">Show</Button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-4 mb-4">
      <Select
        value={selectedView}
        style={{ width: 120 }}
        onChange={handleViewChange}
        options={[
          { value: 'rooms', label: 'Rooms' },
          { value: 'employees', label: 'By Staff' },
          { value: 'services', label: 'By Service' },
        ]}
      />
      
      <Popover 
        content={employeeContent}
        title="Select Staff"
        trigger="click"
        placement="bottom"
      >
        <Button icon={<UserOutlined />}>
          {selectedEmployees.length ? `${selectedEmployees.length} Selected` : 'Staff'}
        </Button>
      </Popover>
    </div>
  );
};

export default BookingFilters;
