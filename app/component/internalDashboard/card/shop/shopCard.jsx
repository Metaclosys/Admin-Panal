import React from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../../../../context/ShopContext";

function ShopCard({ id, name, address, phone, createdDate }) {
  const router = useRouter();
  const { updateShopId } = useShop();

  const handleViewShop = (e) => {
    e.preventDefault();
    updateShopId(id);
    router.push(`/internalDashboard/shops/${id}`);
  };

  return (
    <div className="bg-white rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <h3 className="text-xl text-[#0F172A] font-semibold mb-3">{name}</h3>
      <p className="text-gray-600 mb-3 flex items-start gap-2">
        <span className="text-gray-400 mt-1">📍</span>
        {address}
      </p>
      <p className="flex items-center gap-2 text-gray-600 mb-3">
        <span className="text-gray-400">📞</span> {phone}
      </p>
      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        <span className="text-gray-400">📅</span>
        Created: <span className="text-[#38BDF8] ml-1">{createdDate}</span>
      </p>
      <button 
        onClick={handleViewShop}
        className="flex flex-1 bg-[#38BDF8] text-white px-10 py-2.5 rounded-full hover:bg-opacity-90 transition-all duration-200 w-max font-medium shadow-sm hover:shadow-md"
      >
        View Shop Details
      </button>
    </div>
  );
}

export default ShopCard;
