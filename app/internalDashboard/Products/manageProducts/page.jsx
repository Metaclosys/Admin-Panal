"use client";
import { useState } from "react";
import UpperSection from "../../../component/internalDashboard/manageProduct/UpperSection";
import MiddleSection from "../../../component/internalDashboard/manageProduct/MiddleSection";

export default function ManageProductsPage() {
  const [searchParams, setSearchParams] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleProductUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-6">
      <UpperSection onSearch={handleSearch} />
      <MiddleSection 
        searchParams={searchParams}
        refreshTrigger={refreshTrigger}
        onProductUpdated={handleProductUpdated}
      />
    </div>
  );
}
