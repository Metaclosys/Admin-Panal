"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, Switch, message, Alert, Button } from "antd";
import { useShop } from "../../context/ShopContext";
import AddServiceModal from "../../component/internalDashboard/service/AddServiceModal/AddServiceModal";
import EditServiceModal from "../../component/internalDashboard/service/EditServiceModal/EditServiceModal";
import { PlusOutlined } from "@ant-design/icons";
import MiddleSection from "../../component/internalDashboard/service/MiddleSection/MiddleSection";
import { apiCall, API_ENDPOINTS } from "../../api/apiContent/apiContent";

const USE_ASSIGNMENTS =
  process.env.NEXT_PUBLIC_USE_SERVICE_ASSIGNMENTS === "true";

const mapAssignmentToService = (assignment) => {
  if (!assignment) {
    return {};
  }

  const baseService = assignment.service || {};
  const mergedEmployees =
    Array.isArray(assignment.assignedEmployees) &&
    assignment.assignedEmployees.length
      ? assignment.assignedEmployees
      : baseService.assignedEmployees;

  const mergedProducts =
    Array.isArray(assignment.products) && assignment.products.length
      ? assignment.products
      : baseService.productsUsed || baseService.products;

  return {
    ...baseService,
    assignmentId: assignment._id || assignment.id,
    assignmentMeta: {
      isActiveOverride:
        assignment.isActive !== undefined ? assignment.isActive : undefined,
      source: "assignment",
      locationId: assignment.locationId,
    },
    price: assignment.price ?? baseService.price,
    duration: assignment.duration ?? baseService.duration,
    discount: assignment.discount ?? baseService.discount,
    isActive:
      assignment.isActive !== undefined
        ? assignment.isActive
        : baseService.isActive,
    assignedEmployees: mergedEmployees,
    products: mergedProducts,
  };
};

export default function ServicesPage() {
  const { data: session } = useSession();
  const { currentShopId } = useShop();
  const [services, setServices] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const shopId = currentShopId;

      console.log("Session data:", session);
      console.log("Shop ID from session:", shopId);

      if (!shopId) {
        throw new Error(
          "No shop ID found in session. Please select a shop first."
        );
      }

      if (!session?.accessToken) {
        throw new Error(
          "No access token found in session. Please log in again."
        );
      }

      console.log("Fetching services for shop:", shopId, {
        useAssignments: USE_ASSIGNMENTS,
      });

      const endpoint = USE_ASSIGNMENTS
        ? API_ENDPOINTS.SERVICE_ASSIGNMENTS.BY_LOCATION(shopId, showInactive)
        : API_ENDPOINTS.SERVICES.BY_SHOP(shopId, !showInactive);

      const data = await apiCall(endpoint, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const normalizedData = Array.isArray(data)
        ? USE_ASSIGNMENTS
          ? data.map(mapAssignmentToService)
          : data
        : [];

      if (USE_ASSIGNMENTS) {
        console.debug(
          "Service assignment fetch",
          `assignments=${Array.isArray(data) ? data.length : 0}`,
          `normalizedServices=${normalizedData.length}`
        );
      }

      setServices(normalizedData);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(error.message);
      message.error(`Failed to fetch services: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("session", session, currentShopId);
    if (session?.accessToken && currentShopId) {
      fetchServices();
    }
  }, [session, showInactive, currentShopId]);

  const handleServiceAdded = () => {
    fetchServices();
  };


  const handleServiceDeleted = () => {
    fetchServices();
  };

  const handleEditRequest = (service) => {
    setServiceToEdit(service);
    setEditModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <button
              onClick={fetchServices}
              className="text-blue-500 hover:text-blue-700"
            >
              Retry
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Services</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddModalOpen(true)}
              disabled={!currentShopId}
            >
              Add Service
            </Button>
            <div className="flex items-center gap-2">
              <span>Show Inactive Services</span>
              <Switch
                checked={showInactive}
                onChange={(checked) => setShowInactive(checked)}
              />
            </div>
          </div>
        </div>
      </Card>


      <MiddleSection
        shopId={currentShopId}
        services={services}
        loading={loading}
        showInactive={showInactive}
        onServiceDeleted={handleServiceDeleted}
        onEditService={handleEditRequest}
      />
      <AddServiceModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleServiceAdded}
        shopId={currentShopId}
      />
      <EditServiceModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setServiceToEdit(null);
        }}
        onSuccess={() => {
          setEditModalOpen(false);
          setServiceToEdit(null);
          fetchServices();
        }}
        service={serviceToEdit}
        shopId={currentShopId}
      />
    </div>
  );
}



