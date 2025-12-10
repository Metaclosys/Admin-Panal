"use client";
import { useState } from "react";
import UpperSection from "../../../component/internalDashboard/manageCustomer/UpperSection";
import MiddleSection from "../../../component/internalDashboard/manageCustomer/customerDetail/MiddleSection";

export default function ManageCustomerPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  return (
    <div className="p-6">
      <UpperSection onCustomerSelect={setSelectedCustomerId} />
      {selectedCustomerId && (
        <MiddleSection customerId={selectedCustomerId} />
      )}
    </div>
  );
}
