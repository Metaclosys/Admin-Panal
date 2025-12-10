import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PackagesCard = ({ name, duration, type, price, services, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-black font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{duration}</p>
          <p className="text-sm text-gray-600">{type}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-1">
            <FaEdit className="text-gray-600" />
          </button>
          <button className="p-1" onClick={onDelete}>
            <FaTrash className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-black">${price.toFixed(2)}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PackagesCard;
