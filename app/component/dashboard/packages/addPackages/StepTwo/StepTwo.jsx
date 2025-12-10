"use client";
import { useState, useEffect } from "react";
import ServiceCard from "../../../employee/ServiceCard/ServiceCard";
import ServiceModal from "../../../ServiceCardBtn/ServiceCardBtn";

function StepTwo({
  services = [],
  loading = false,
  selectedServices = [],
  onServicesChange,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  // Group services by category
  const serviceCategories = services.reduce((acc, service) => {
    // Get category from service, default to "Other" if not present
    const category = service.category || "Other";

    // Initialize category array if it doesn't exist
    if (!acc[category]) {
      acc[category] = [];
    }

    // Add service to its category with only the needed fields
    const simplifiedService = {
      id: service._id || service.id,
      name: service.name || "",
      description: service.description || "",
      price: Number(service.price) || 0,
      duration: Number(service.duration) || 30,
      category: category,
    };

    acc[category].push(simplifiedService);
    return acc;
  }, {});

  // Get unique categories for displaying cards
  const uniqueCategories = Object.keys(serviceCategories);

  const handleViewServices = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleServiceSelect = (service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    if (isSelected) {
      // Remove service if already selected
      onServicesChange(selectedServices.filter((s) => s.id !== service.id));
    } else {
      // Add service if not selected
      onServicesChange([...selectedServices, service]);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading services: {error}
      </div>
    );
  }

  if (!loading && !services.length) {
    return (
      <div className="flex justify-center items-center h-64">
        No services found
      </div>
    );
  }

  return (
    <>
      <h2 className="text-blue-600 font-medium mb-6">Select Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {uniqueCategories.map((category) => (
          <ServiceCard
            key={category}
            title={category}
            image="/images/jpgFiles/service1.jpg"
            onViewServices={() => handleViewServices(category)}
            servicesCount={serviceCategories[category].length}
            loading={loading}
          />
        ))}
      </div>

      <ServiceModal
        isOpen={!!selectedCategory}
        onClose={handleCloseModal}
        serviceType={selectedCategory}
        services={selectedCategory ? serviceCategories[selectedCategory] : []}
        selectedServices={selectedServices}
        onServiceSelect={handleServiceSelect}
      />

      {selectedServices.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-600 mb-2">Selected Services:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map((service) => (
              <span
                key={service.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {service.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StepTwo;
