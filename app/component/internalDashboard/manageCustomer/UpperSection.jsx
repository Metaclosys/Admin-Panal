"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select, message } from "antd";
import { PrinterOutlined, SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { API_ENDPOINTS, apiCall } from "../../../api/apiContent/apiContent";

function UpperSection({ onCustomerSelect }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    email: "",
    name: "", 
    memberCard: "",
    phone: "",
  });

  // Load all customers basic data on component mount
  useEffect(() => {
    const loadCustomers = async () => {
      if (!session?.accessToken) return;

      setLoading(true);
      try {
        const data = await apiCall(API_ENDPOINTS.CUSTOMERS.BASE, {
          method: 'GET'
        });
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        message.error("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, [session]);

  // Generate options for select fields from customers data
  const getOptions = (field) => {
    const uniqueValues = new Set(
      customers.map((customer) => {
        if (field === "name") {
          return `${customer.firstName} ${customer.lastName}`;
        }
        return customer[field];
      })
    );
    return Array.from(uniqueValues)
      .filter(Boolean)
      .map((value) => ({ label: value, value }));
  };

  const handleSearch = () => {
    const foundCustomer = customers.find(customer => {
      const fullName = `${customer.firstName} ${customer.lastName}`;
      return (
        (searchParams.email && customer.email === searchParams.email) ||
        (searchParams.name && fullName === searchParams.name) ||
        (searchParams.memberCard && customer.memberCard === searchParams.memberCard) ||
        (searchParams.phone && customer.phone === searchParams.phone)
      );
    });

    if (foundCustomer) {
      onCustomerSelect(foundCustomer._id);
    } else {
      message.info("No customer found with the provided criteria");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-4">
          <Link href="/internalDashboard/Customers/manageCustomers/addCustomer">
            <Button type="primary" className="bg-[#06283D]">
              + Add a New Customer
            </Button>
          </Link>
          <Button
            type="text"
            icon={<SettingOutlined />}
            className="text-gray-600"
          >
            Customize View
          </Button>
          <Button
            type="text"
            icon={<PrinterOutlined />}
            className="text-gray-600"
          >
            Print
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div>
        <div className="p-3 border-b flex text-black justify-between items-center bg-gray-300 mb-2">
          <span className="font-medium">Find a Customer</span>
          <Button type="text">+</Button>
        </div>
        <div className="bg-[#47B5FF24] rounded-md p-4">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div>
              <div className="text-sm text-gray-600 mb-2">Email</div>
              <Select
                showSearch
                placeholder="Select or type email"
                value={searchParams.email}
                onChange={(value) =>
                  setSearchParams({ ...searchParams, email: value })
                }
                options={getOptions("email")}
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                className="w-full"
                allowClear
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Customer Name</div>
              <Select
                showSearch
                placeholder="Select or type name"
                value={searchParams.name}
                onChange={(value) =>
                  setSearchParams({ ...searchParams, name: value })
                }
                options={getOptions("name")}
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                className="w-full"
                allowClear
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Member Card #</div>
              <Select
                showSearch
                placeholder="Select member card"
                value={searchParams.memberCard}
                onChange={(value) =>
                  setSearchParams({ ...searchParams, memberCard: value })
                }
                options={getOptions("memberCard")}
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                className="w-full"
                allowClear
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Phone</div>
              <Select
                showSearch
                placeholder="Select or type phone"
                value={searchParams.phone}
                onChange={(value) =>
                  setSearchParams({ ...searchParams, phone: value })
                }
                options={getOptions("phone")}
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                className="w-full"
                allowClear
              />
            </div>
            <Button
              type="primary"
              className="bg-[#06283D] rounded-full mt-6"
              onClick={handleSearch}
              loading={loading}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperSection;
