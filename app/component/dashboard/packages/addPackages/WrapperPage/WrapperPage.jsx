"use client";
import { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import {
  apiCall,
  API_ENDPOINTS,
  getAccessToken,
} from "../../../../../api/apiContent/apiContent";

function WrapperPage() {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState(null);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        if (!session?.accessToken) {
          throw new Error("No access token available");
        }
        const response = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
          method: "GET",
        });
        console.log("Services API response:", response);
        setServices(Array.isArray(response) ? response : response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesError(error.message);
      } finally {
        setServicesLoading(false);
      }
    };
    if (session?.accessToken) {
      fetchServices();
    }
  }, [session]);

  const nextPage = async () => {
    try {
      // Validate current page fields before moving to next
      await form.validateFields();
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    else router.push("/dashboard/packages");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = form.getFieldsValue(true);

      // Format booking dates if they exist
      const bookingDates = values.bookingDates
        ? values.bookingDates.map((date) => date.toDate())
        : undefined;

      // Ensure required fields are strings
      const packageData = {
        name: String(values.name),
        type: String(values.type),
        sku: String(values.sku),
        barcode: values.barcode,
        locationId: String(values.locationId),
        description: values.description,
        bookingDates,
        thumbnailUrl: values.thumbnailUrl,
        imageUrl: values.imageUrl,
        allowOnlineBooking: values.allowOnlineBooking ?? false,
        includedServiceIds: selectedServices.map((service) => service.id),
        validity:
          values.validityStartDate ||
          values.validityEndDate ||
          values.validityDuration
            ? {
                startDate: values.validityStartDate
                  ? values.validityStartDate.toDate()
                  : undefined,
                endDate: values.validityEndDate
                  ? values.validityEndDate.toDate()
                  : undefined,
                durationInDays: values.validityDuration
                  ? Number(values.validityDuration)
                  : undefined,
              }
            : undefined,
        price: Number(values.price) || 0,
        discountAmount: Number(values.discountAmount) || 0,
        discountType: values.discountType || "none",
        isActive: values.isActive ?? true,
      };

      console.log("Submitting package data:", packageData); // Debug log

      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      await apiCall(API_ENDPOINTS.PACKAGES.BASE, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(packageData),
      });

      message.success("Package created successfully");
      router.push("/dashboard/packages");
    } catch (error) {
      console.error("Error creating package:", error);
      message.error(error.message || "Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-gray-600 mb-6">
        Packages can be created, updated, or deleted
      </p>

      <div className="bg-[#87D0FFBF] p-8 rounded-3xl shadow-lg shadow-gray-300">
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="flex flex-col">
            {currentPage === 1 && <StepOne />}
            {currentPage === 2 && (
              <StepTwo
                services={services}
                loading={servicesLoading}
                selectedServices={selectedServices}
                onServicesChange={setSelectedServices}
              />
            )}

            <div className="flex justify-end space-x-2">
              <Button
                onClick={prevPage}
                className="bg-transparent border-black text-black rounded-full px-6 py-2.5 h-auto"
              >
                {currentPage === 1 ? "Cancel" : "Back"}
              </Button>

              {currentPage === 1 ? (
                <Button
                  type="primary"
                  onClick={nextPage}
                  className="bg-[#0F172A] rounded-full px-6 py-2.5 h-auto"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={loading}
                  className="bg-[#0F172A] rounded-full px-6 py-2.5 h-auto"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>

      <div className="text-right text-gray-600 mt-4">
        Page {currentPage} / 2
      </div>
    </>
  );
}

export default WrapperPage;
