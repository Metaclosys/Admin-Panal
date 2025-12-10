"use client";
import { Card, Avatar, Button, Popconfirm, message } from "antd";
import { UserOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../../../../api/apiContent/apiContent";
import { useSession } from "next-auth/react";

const CustomerSidebar = ({ customer }) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!customer) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await apiCall(API_ENDPOINTS.CUSTOMERS.BY_ID(customer.id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`
        }
      });
      message.success("Customer deleted successfully");
      router.push("/internalDashboard/Customers/manageCustomers");
    } catch (error) {
      message.error("Failed to delete customer");
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Card className="w-72 shadow-sm overflow-y-auto">
      <div className="flex flex-col items-center">
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={customer.profileImage}
          className="mb-4"
        />
        <h2 className="text-xl font-semibold mb-1">
          {customer.firstName} {customer.lastName}
        </h2>
        <p className="text-gray-500 mb-4">{customer.email}</p>
        
        <div className="w-full space-y-2">
          <Link 
            href={`/internalDashboard/Customers/manageCustomers/editCustomer/${customer.id}`}
            className="w-full"
          >
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="w-full bg-[#06283D]"
            >
              Edit Customer
            </Button>
          </Link>
          
          <Popconfirm
            title="Delete Customer"
            description="Are you sure you want to delete this customer?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              className="w-full"
            >
              Delete Customer
            </Button>
          </Popconfirm>
        </div>

        <div className="mt-6 w-full">
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Contact Information</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {customer.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Address:</strong> {customer.address}
            </p>
          </div>
          
          <div className="border-t mt-4 pt-4">
            <h3 className="font-medium mb-2">Customer Details</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer ID:</strong> {customer._id}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Member Since:</strong>{" "}
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              <span className={`${
                customer.status === "Active" ? "text-green-600" : "text-red-600"
              }`}>
                {customer.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerSidebar;
