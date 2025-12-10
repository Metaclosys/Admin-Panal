"use client";
import { useState, useEffect } from "react";
import { Tabs, Button, Card, message } from "antd";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import CustomerInfo from "./CustomerDetailComponent/CustomerInfo";
import DetailContent from "./CustomerDetailComponent/DetailContent";
import CustomerSidebar from "./CustomerDetailComponent/CustomerSidebar";
import NotesContent from "./CustomerDetailComponent/NotesContent";
import AppointmentsContent from "./CustomerDetailComponent/AppointmentsContent";
import OrdersContent from "./CustomerDetailComponent/OrdersContent";
import BillingContent from "./CustomerDetailComponent/BillingContent";
import PhotoContent from "./CustomerDetailComponent/PhotoContent";
import DocumentStorageContent from "./CustomerDetailComponent/DocumentStorageContent";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

const { TabPane } = Tabs;

function MiddleSection({ customerId }) {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomerDetails = async () => {
      if (!session?.accessToken) {
        message.error("No access token available");
        return;
      }

      try {
        setLoading(true);
        const data = await apiCall(API_ENDPOINTS.CUSTOMERS.BY_ID(customerId), {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setCustomer(data);
      } catch (error) {
        console.error("Error loading customer:", error);
        message.error("Failed to load customer details");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      loadCustomerDetails();
    }
  }, [customerId, session]);

  if (loading) {
    return <div className="mt-4">Loading customer details...</div>;
  }

  if (!customer) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Link href="/internalDashboard/Customers/manageCustomers" className="text-blue-500">
          ← Back to Customers
        </Link>
        
        <Link href="/internalDashboard/Customers/manageCustomers/addCustomer">
          <Button
            size="large"
            type="primary"
            icon={<FaPlus />}
            className="bg-[#06283D]"
          >
            Add New Customer
          </Button>
        </Link>
      </div>

      <Card className="bg-white">
        <Tabs
          defaultActiveKey="summary"
          className="h-[calc(100vh-180px)] overflow-hidden overflow-y-auto"
          tabPosition="top"
        >
          <TabPane tab="Summary" key="summary">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <CustomerInfo customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Details" key="details">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <DetailContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Notes" key="notes">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <NotesContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Appointments" key="appointments">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <AppointmentsContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Orders" key="orders">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <OrdersContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Billing" key="billing">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <BillingContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Photos" key="photos">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <PhotoContent customer={customer} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="Document Storage" key="documents">
            <div className="flex gap-6 h-full overflow-hidden">
              <CustomerSidebar customer={customer} />
              <div className="flex-1 overflow-y-auto">
                <DocumentStorageContent customer={customer} />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
}

export default MiddleSection;
