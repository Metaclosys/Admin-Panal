"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Modal,
  message,
  Upload,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../../../lib/apiClient";

const { Option } = Select;
const { TextArea } = Input;

// Enum definitions
const Gender = {
  MALE: "Male",
  FEMALE: "Female",
};

const EmployeeStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ON_LEAVE: "On Leave",
  TERMINATED: "Terminated",
};

const EmployeeType = {
  SCHEDULED: "Scheduled",
  UNSCHEDULED: "Unscheduled",
};

function UpperSection({
  onEmployeeAdded,
  onSearch,
  onLocationFilter,
  selectedLocation = "",
  searchTerm = "",
  accessToken,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [specifyEndDate, setSpecifyEndDate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) return;
    fetchLocations(accessToken);
  }, [accessToken]);

  const fetchLocations = async (token) => {
    try {
      setLoadingLocations(true);
      const response = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
        accessToken: token,
        method: "GET",
      });
      const resolvedLocations = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];
      setLocations(resolvedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      message.error("Failed to load locations");
    } finally {
      setLoadingLocations(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSpecifyEndDate(false);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Format the employee data according to your API requirements
      const employeeData = {
        firstName: values.firstName,
        lastName: values.lastName,
        displayName:
          values.displayName || `${values.firstName} ${values.lastName}`,
        gender: values.gender,
        email: values.email,
        phone: values.phone,
        status: values.status,
        type: values.type,
        maxAppointmentsPerDay: values.maxAppointmentsPerDay,
        description: values.description,
        notes: values.notes,
        locationId: values.locationId,
        address: values.address,
        createLogin: values.createLogin || false,
        specifyEmploymentEndDate: specifyEndDate,
        employmentEndDate: specifyEndDate
          ? values.employmentEndDate?.format("YYYY-MM-DD")
          : undefined,
      };

      // Handle image upload if provided
      if (values.profileImage && values.profileImage.length > 0) {
        // This is a placeholder for actual image upload logic
        // You would typically upload the image to your server or a cloud storage service
        // and then set the returned URL in the employeeData
        employeeData.imageUrl = "placeholder-url-for-uploaded-image";
      }

      if (!accessToken) {
        message.error("Authentication required. Please sign in again.");
        setLoading(false);
        return;
      }

      await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
        accessToken,
        method: "POST",
        body: JSON.stringify(employeeData),
      });

      message.success("Employee created successfully");
      setIsModalVisible(false);
      setSpecifyEndDate(false);

      if (onEmployeeAdded) {
        onEmployeeAdded();
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      message.error(`Failed to create employee: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    router.push("/dashboard/employees/addEmployee");
  };

  return (
    <div className="mb-8">
      <p className="text-gray-600 mb-6">
        Manage employees and their schedules.
      </p>

      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 flex-1">
          <div className="relative">
            <Input
              placeholder="Search employees"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-64"
            />
          </div>

          <Select
            placeholder="Filter by location"
            style={{ width: 200 }}
            onChange={(value) => onLocationFilter?.(value || "")}
            value={selectedLocation || undefined}
            loading={loadingLocations}
            allowClear
          >
            {locations.map((location) => (
              <Option key={location._id} value={location._id}>
                {location.name}
              </Option>
            ))}
          </Select>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddEmployee}
          className="bg-[#214a64] hover:bg-blue-800"
        >
          Add New Employee
        </Button>
      </div>
    </div>
  );
}

export default UpperSection;
