import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MembershipPlanCard = ({ plan, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-black font-semibold">{plan.name}</h3>
          <p className="text-sm text-gray-600">
            Any 1 from{" "}
            <span className="text-blue-500">membership birthday treatment</span>
          </p>
          <p className="text-sm text-gray-600">{plan.duration}</p>
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
        <span className="text-black">${plan.price.toFixed(2)} / Annually</span>
        <span className="text-black">{plan.status}</span>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm rounded-md px-8 text-black bg-gray-300 p-2">
        <span>Active</span>
        <div className="h-4 border-r border-black"></div>
        <span>Initiation ${plan.initiation.toFixed(2)}</span>
        <div className="h-4 border-r border-black"></div>
        <span>Sold Online: {plan.soldDate}</span>
      </div>
    </div>
  );
};

export default MembershipPlanCard;
