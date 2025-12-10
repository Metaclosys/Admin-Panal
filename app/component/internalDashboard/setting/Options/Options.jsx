"use client";
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useRouter } from "next/navigation";

export default function Options() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('Location Info');

  const options = [
    { id: 1, name: 'Location Info' },
    { id: 2, name: 'Cancellation Policy' },
    { id: 3, name: 'Client Forms' },
    { id: 4, name: 'Appointment Settings' },
    { id: 5, name: 'Hardware' },
    { id: 6, name: 'Marketing Settings' },
    { id: 7, name: 'Waitlist Settings' },
  ];

  
  const handleViewReport = (name, reportName) => {
    // Convert report name to URL-friendly format
    // const urlPath = reportName.toLowerCase().replace(/\s+/g, "_");
    router.push(
      `/internalDashboard/reports/allReport/${name
        .toLowerCase()
        .replace(/\s+/g, "")}/${reportName}`
    );
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => setSelectedOption(option.name)}
          className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
            selectedOption === option.name
              ? 'text-blue-500'
              : 'text-gray-700'
          }`}
        >
          <span>{option.name}</span>
          <IoIosArrowForward />
        </div>
      ))}
    </div>
  );
}
