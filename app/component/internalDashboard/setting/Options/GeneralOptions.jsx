"use client";
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

export default function GeneralOptions({ selectedOption, setSelectedOption }) {
  const options = [
    { id: 1, name: 'Location Info' },
    { id: 2, name: 'Cancellation Policy' },
    { id: 3, name: 'Client Forms' },
    { id: 4, name: 'Appointment Settings' },
    { id: 5, name: 'Hardware' },
    { id: 6, name: 'Marketing Settings' },
    { id: 7, name: 'Waitlist Settings' },
  ];

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