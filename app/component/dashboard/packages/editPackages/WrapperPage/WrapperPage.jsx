"use client";
import { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import { apiCall, API_ENDPOINTS, getAccessToken } from "../../../../../api/apiContent/apiContent";
import dayjs from "dayjs";

function EditWrapperPage({ packageId }) {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const accessToken = session?.accessToken || getAccessToken();
        const response = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
          method: 'GET'
        });
        setServices(response.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesError(error.message);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [session]);

  // Fetch package data
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const accessToken = session?.accessToken || getAccessToken();
        const response = await apiCall(API_ENDPOINTS.PACKAGES.BY_ID(packageId), {
          method: 'GET'
        });
        const packageData = response.data;

        // Transform dates to dayjs objects for form
        const formData = {
          ...packageData,
          bookingDates: packageData.bookingDates
            ? [
                dayjs(packageData.bookingDates[0]),
                dayjs(packageData.bookingDates[1]),
              ]
            : undefined,
          validityStartDate: packageData.validity?.startDate
            ? dayjs(packageData.validity.startDate)
            : undefined,
          validityEndDate: packageData.validity?.endDate
            ? dayjs(packageData.validity.endDate)
            : undefined,
          validityDuration: packageData.validity?.durationInDays,
        };

        // Set selected services
        if (packageData.includedServiceIds) {
          const selectedServiceData = services.filter((service) =>
            packageData.includedServiceIds.includes(service._id || service.id)
          );
          setSelectedServices(selectedServiceData);
        }

        // Set form values
        form.setFieldsValue(formData);
        setInitialLoading(false);
      } catch (error) {
        console.error("Error fetching package:", error);
        message.error("Failed to fetch package data");
        router.push("/dashboard/packages");
      }
    };

    if (session?.accessToken) {
      fetchPackageData();
    }
  }, [packageId, session?.accessToken, services]);

  const nextPage = async () => {
    try {
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

      console.log("Updating package data:", packageData);

      await apiCall(API_ENDPOINTS.PACKAGES.BY_ID(packageId), {
        method: 'PUT',
        body: JSON.stringify(packageData)
      });

      message.success("Package updated successfully");
      router.push("/dashboard/packages");
    } catch (error) {
      console.error("Error updating package:", error);
      message.error(error.message || "Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  if (servicesError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading services: {servicesError}
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading package data...
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-600 mb-6">Edit Package Details</p>

      <div className="bg-[#87D0FFBF] p-8 rounded-3xl shadow-lg shadow-gray-300">
        <Form form={form} layout="vertical" className="space-y-4">
          <div className="flex flex-col">
            {currentPage === 1 && <StepOne />}
            {currentPage === 2 && (
              <StepTwo
                services={services}
                selectedServices={selectedServices}
                onServicesChange={setSelectedServices}
                loading={servicesLoading}
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
                  onClick={handleSubmit}
                  loading={loading}
                  className="bg-[#0F172A] rounded-full px-6 py-2.5 h-auto"
                >
                  Update Package
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

export default EditWrapperPage;
