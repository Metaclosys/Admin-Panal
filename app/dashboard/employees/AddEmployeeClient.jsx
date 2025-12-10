"use client";

import { useState } from "react";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import StepOne from "../../component/dashboard/employee/addEmployee/StepOne/StepOne";
import StepTwo from "../../component/dashboard/employee/addEmployee/StepTwo/StepTwo";
import { serializeWorkingHours } from "../../component/dashboard/employee/shared/WorkingHoursEditor";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";

function AddEmployeeClient({
  accessToken,
  locations = [],
  locationsError = null,
  services = [],
  servicesError = null,
}) {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const stepOneFields = [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "type",
    "locationId",
  ];

  const nextStep = async () => {
    try {
      await form.validateFields(stepOneFields);
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    else router.push("/dashboard/employees");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!accessToken) {
        throw new Error("You are not authorized to create employees.");
      }

      await form.validateFields(stepOneFields);
      const values = form.getFieldsValue(true);

      const employeeData = {
        firstName: String(values.firstName || "").trim(),
        lastName: String(values.lastName || "").trim(),
        displayName: values.displayName ? String(values.displayName).trim() : undefined,
        gender: values.gender,
        email: String(values.email || "").trim(),
        status: values.status || "Active",
        type: values.type,
        phone: String(values.phone || "").trim(),
        locationId: String(values.locationId || "").trim(),
        maxAppointmentsPerDay:
          values.maxAppointmentsPerDay != null ? Number(values.maxAppointmentsPerDay) : undefined,
        createLogin: Boolean(values.createLogin),
        specifyEmploymentEndDate: Boolean(values.specifyEmploymentEndDate),
        employmentEndDate: values.employmentEndDate?.toDate(),
        imageUrl: values.imageUrl?.fileList?.[0]?.response?.url || values.imageUrl,
        description: values.description ? String(values.description).trim() : undefined,
        notes: values.notes ? String(values.notes).trim() : undefined,
        specialties: values.specialties || [],
        services: values.services || [],
        workingHours: serializeWorkingHours(values.workingHours ?? {}),
        contactInfo: {
          phone: values.phone ? String(values.phone).trim() : undefined,
          address: values.address ? String(values.address).trim() : undefined,
          city: values.city ? String(values.city).trim() : undefined,
          state: values.state ? String(values.state).trim() : undefined,
          zipCode: values.zipCode ? String(values.zipCode).trim() : undefined,
          country: values.country ? String(values.country).trim() : undefined,
        },
      };

      await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
        method: "POST",
        accessToken,
        body: JSON.stringify(employeeData),
      });

      message.success("Employee created successfully");
      router.push("/dashboard/employees");
    } catch (error) {
      console.error("Error creating employee:", error);
      if (error?.errorFields) {
        message.error("Please fill in all required fields correctly");
      } else {
        message.error(error?.message || "Failed to create employee");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <p className="text-gray-600 mb-6">Create a new employee</p>

      <div className="bg-[#87D0FFBF] p-8 rounded-3xl shadow-lg shadow-gray-300">
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
          initialValues={{
            status: "Active",
            createLogin: false,
            specifyEmploymentEndDate: false,
            country: "United States",
            workingHours: {},
          }}
        >
          <div className="flex flex-col">
            {currentStep === 1 && (
              <StepOne
                locations={locations}
                locationsLoading={!locations.length && !locationsError}
                locationsError={locationsError}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                form={form}
                services={services}
                servicesLoading={!services.length && !servicesError}
                servicesError={servicesError}
              />
            )}

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={prevStep}
                className="bg-transparent border-black text-black rounded-full px-6 py-2.5 h-auto"
              >
                {currentStep === 1 ? "Cancel" : "Back"}
              </Button>

              {currentStep === 1 ? (
                <Button
                  type="primary"
                  onClick={nextStep}
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
                  Create Employee
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>

      <div className="text-right text-gray-600 mt-4">Page {currentStep} / 2</div>
    </div>
  );
}

export default AddEmployeeClient;
