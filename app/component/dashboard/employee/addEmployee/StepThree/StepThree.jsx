"use client";
import { useState } from "react";
import ServiceCard from "../../../ServiceCard/ServiceCard";
import ServiceModal from "../../../ServiceCardBtn/ServiceCardBtn";

function StepThree() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Combination",
      image: "/images/jpgFiles/service1.jpg",
    },
    {
      id: 2,
      title: "Hair Color",
      image: "/images/jpgFiles/service1.jpg",
    },
    {
      id: 3,
      title: "Haircuts",
      image: "/images/jpgFiles/service1.jpg",
    },
    {
      id: 4,
      title: "Men's Grooming",
      image: "/images/jpgFiles/service1.jpg",
    },
    {
      id: 5,
      title: "Waxing",
      image: "/images/jpgFiles/service1.jpg",
    },
    {
      id: 6,
      title: "Manicures",
      image: "/images/jpgFiles/service1.jpg",
    },
  ];

  const serviceOptions = {
    Combination: [
      "General",
      "Bald Fade with Bread Trim and Razor Line Up",
      "Haircut with Beard Trim",
      "Haircut with Beard Trim w/ Razor Line Up",
      "Haircut & Beard Shave Special",
      "Haircut & Facial Combo",
      "Royal Hangover Treatment",
      "Sami's Special",
    ],
    "Hair Color": [
      "General",
      "Virgin Process Color",
      "Color Retouch",
      "Bleach and Tone",
      "Re-bonding Treatment",
      "Grey-Blending",
    ],
    Haircuts: [
      "General",
      "Scissor Cut",
      "Buzz Haircut",
      "Beard Trim",
      "Ultra Wax",
      "Long Method",
      "Short Paper Method/Razor/Fade",
      "Against Hair Method",
      "Manual + Method blending",
    ],
    "Men's Grooming": [
      "Beard Trim",
      "Beard Trim with foam (45+ Up",
      "Beard Trim with foam",
      "Ear Lower Facial Treatment",
      "Head/Facial/Massage",
    ],
    Manicures: ["Nail Repair", "Gents Manicure"],
    Waxing: [
      "Brows",
      "General",
      "Nose Wax",
      "Deluxe Tailored Wax Packages (Brows/Nose/Ears)",
      "Ears",
    ],
  };

  const handleViewServices = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <h2 className="text-blue-600 font-medium mb-6">Select Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            image={service.image}
            onViewServices={() => handleViewServices(service.title)}
          />
        ))}
      </div>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={handleCloseModal}
        serviceType={selectedService}
        services={selectedService ? serviceOptions[selectedService] : []}
      />
    </>
  );
}

export default StepThree;
