"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import ServiceDetails, {
  normalizeServiceFormValues,
} from "../../component/dashboard/services/addService/ServiceDetails/ServiceDetails";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import { useShop } from "../../context/ShopContext";

function normalizeLocationId(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : null;
  }

  if (typeof value === "object") {
    const candidates = [
      value.locationId,
      value.shopId,
      value._id,
      value.id,
      value.value,
    ];

    for (const candidate of candidates) {
      if (candidate === value) {
        continue;
      }
      const normalized = normalizeLocationId(candidate);
      if (normalized) {
        return normalized;
      }
    }
  }

  return null;
}

function AddServiceClient({
  accessToken,
  serviceId = null,
  initialService = null,
  assignedLocations = [],
  hasInvalidServiceParam = false,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(Boolean(serviceId) && !initialService);
  const [serviceDetails, setServiceDetails] = useState(initialService);
  const hasNotifiedInvalidIdRef = useRef(false);
  const { currentShopId } = useShop();
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  const isEditMode = Boolean(serviceId);

  useEffect(() => {
    if (!isEditMode) {
      form.setFieldsValue({
        serviceType: "standard",
        depositPrePayment: { type: "none" },
        staffFee: { type: "none" },
        isActive: true,
        showInOnlineMenu: true,
        isAddOn: false,
        requiresTwoStaffMembers: false,
        requiresProcessingTime: false,
        requiresEquipment: false,
        doNotRequireStaffOnAvailabilitySearch: false,
        duration: 30,
      });
    }
  }, [form, isEditMode]);

  useEffect(() => {
    if (initialService) {
      setServiceDetails(initialService);
      form.setFieldsValue(normalizeServiceFormValues(initialService));
      setPageLoading(false);
    }
  }, [initialService, form]);

  useEffect(() => {
    if (hasInvalidServiceParam && !hasNotifiedInvalidIdRef.current) {
      hasNotifiedInvalidIdRef.current = true;
      message.error("Invalid service identifier provided");
      router.push("/dashboard/services");
    }
  }, [hasInvalidServiceParam, router]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let isMounted = true;

    const fetchLocations = async () => {
      try {
        setLocationsLoading(true);
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          accessToken,
        });

        if (!isMounted) {
          return;
        }

        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching locations:", error);
        }
      } finally {
        if (isMounted) {
          setLocationsLoading(false);
        }
      }
    };

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  useEffect(() => {
    if (!serviceId || !accessToken || serviceDetails || hasInvalidServiceParam) {
      return;
    }

    let isMounted = true;
    setPageLoading(true);

    const fetchService = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
          accessToken,
        });

        if (!isMounted) {
          return;
        }

        setServiceDetails(data);
        form.setFieldsValue(normalizeServiceFormValues(data));
      } catch (error) {
        if (isMounted) {
          console.error("Error loading service:", error);
          message.error(error.message || "Failed to load service details");
        }
      } finally {
        if (isMounted) {
          setPageLoading(false);
        }
      }
    };

    fetchService();

    return () => {
      isMounted = false;
    };
  }, [serviceId, accessToken, serviceDetails, hasInvalidServiceParam, form]);

  const normalizedAssignedLocations = useMemo(() => {
    if (!assignedLocations) {
      return [];
    }
    if (Array.isArray(assignedLocations)) {
      return assignedLocations
        .map((location) => normalizeLocationId(location))
        .filter(Boolean);
    }
    const normalized = normalizeLocationId(assignedLocations);
    return normalized ? [normalized] : [];
  }, [assignedLocations]);

  const resolvedLocationId = useMemo(() => {
    const fromInitial = normalizeLocationId(serviceDetails?.locationId);
    if (fromInitial) {
      return fromInitial;
    }

    const fromCurrentShop = normalizeLocationId(currentShopId);
    if (fromCurrentShop) {
      return fromCurrentShop;
    }

    if (normalizedAssignedLocations.length > 0) {
      return normalizedAssignedLocations[0];
    }

    for (const location of locations) {
      const normalized = normalizeLocationId(location);
      if (normalized) {
        return normalized;
      }
    }

    return null;
  }, [serviceDetails?.locationId, currentShopId, normalizedAssignedLocations, locations]);

  useEffect(() => {
    if (resolvedLocationId) {
      form.setFieldsValue({ locationId: String(resolvedLocationId) });
    }
  }, [resolvedLocationId, form]);

  const handleSubmit = async () => {
    const values = form.getFieldsValue(true);

    try {
      setLoading(true);

      if (!accessToken) {
        throw new Error("No access token available");
      }

      if (isEditMode && !serviceId) {
        throw new Error("Missing service identifier");
      }

      if (!values.serviceName || !values.category) {
        message.error("Service name and category are required");
        setLoading(false);
        return;
      }

      const durationNumber = Number(values.duration);
      if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
        message.error("Duration must be greater than 0");
        setLoading(false);
        return;
      }

      const locationId = values.locationId || resolvedLocationId;
      if (!locationId) {
        message.error(
          "Unable to determine a location for this service. Please select a shop or configure a default location before continuing."
        );
        setLoading(false);
        return;
      }

      const servicePayload = {
        name: values.serviceName,
        serviceType: values.serviceType || "standard",
        category: values.category,
        subcategory: values.subcategory || "",
        productBrand: values.productBrand || "",
        sku:
          values.sku ||
          (values.serviceName
            ? values.serviceName.toLowerCase().replace(/\s+/g, "-")
            : ""),
        barcode: values.barcode || "",
        duration: String(durationNumber),
        description: values.description || "",
        isAddOn: Boolean(values.isAddOn),
        requiresTwoStaffMembers: Boolean(values.requiresTwoStaffMembers),
        requiresProcessingTime: Boolean(values.requiresProcessingTime),
        showInOnlineMenu: Boolean(values.showInOnlineMenu),
        thumbnailUrl: values.thumbnailUrl || "",
        imageUrl: values.imageUrl || "",
        depositPrePayment: {
          type: values.depositPrePayment?.type || "none",
          value:
            values.depositPrePayment?.value !== undefined
              ? Number(values.depositPrePayment.value)
              : 0,
        },
        staffFee: {
          type: values.staffFee?.type || "none",
          value:
            values.staffFee?.value !== undefined
              ? Number(values.staffFee.value)
              : 0,
        },
        requiresEquipment: Boolean(values.requiresEquipment),
        doNotRequireStaffOnAvailabilitySearch: Boolean(
          values.doNotRequireStaffOnAvailabilitySearch
        ),
        price: Number(values.price ?? 0),
        productCostPerService: Number(values.productCostPerService || 0),
        productsUsed: values.products || [],
        assignedEmployees: values.employees || [],
        assignedRooms: values.rooms || [],
        locationId: String(locationId),
        isActive: Boolean(values.isActive),
      };

      const endpoint = isEditMode
        ? API_ENDPOINTS.SERVICES.BY_ID(serviceId)
        : API_ENDPOINTS.SERVICES.BASE;
      const method = isEditMode ? "PATCH" : "POST";

      await apiCall(endpoint, {
        method,
        accessToken,
        body: JSON.stringify(servicePayload),
      });

      message.success(
        isEditMode
          ? "Service updated successfully!"
          : "Service created successfully!"
      );
      router.push("/dashboard/services");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} service:`,
        error
      );
      let errorMessage = error.message || "Unexpected error";

      try {
        if (typeof errorMessage === "string" && errorMessage.includes("{")) {
          const errorJson = JSON.parse(
            errorMessage.substring(errorMessage.indexOf("{"))
          );
          if (errorJson.message) {
            errorMessage = Array.isArray(errorJson.message)
              ? errorJson.message.join(", ")
              : errorJson.message;
          }
        }
      } catch (parseError) {
        console.error("Error parsing API error:", parseError);
      }

      message.error(
        `Failed to ${isEditMode ? "update" : "create"} service: ${errorMessage}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#87D0FFBF] p-8 rounded-lg shadow-md w-full h-full overflow-y-auto">
      {isEditMode && pageLoading && (
        <div className="mb-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Loading service details...
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => {
          console.error("Form validation failed:", errorInfo);
          message.error("Please fill in all required fields");
        }}
        className="space-y-6"
        disabled={pageLoading}
      >
        <Form.Item name="locationId" hidden>
          <Input type="hidden" />
        </Form.Item>

        {!resolvedLocationId && !locationsLoading && accessToken && (
          <div className="rounded-md border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Unable to determine a default location. Please select a shop in the dashboard or ensure at least one
            location is configured before creating a service.
          </div>
        )}

        <ServiceDetails
          form={form}
          mode={isEditMode ? "edit" : "create"}
          initialValues={serviceDetails}
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            htmlType="submit"
            shape="round"
            size="large"
            className="bg-[#0F172A] text-white"
            loading={loading}
            disabled={pageLoading || locationsLoading || !resolvedLocationId}
          >
            {isEditMode ? "Update Service" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddServiceClient;
