import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

function ViewDetail({ selectedCert, setShowModal }) {
  const [isEditingExpiry, setIsEditingExpiry] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [expiryDate, setExpiryDate] = useState(selectedCert.dateExpires);
  const [balance, setBalance] = useState(selectedCert.originalAmount);

  const handleSave = (field) => {
    if (field === "expiry") {
      setIsEditingExpiry(false);
      // Add API call to save expiry date
    } else if (field === "balance") {
      setIsEditingBalance(false);
      // Add API call to save balance
    }
  };

  const handleCancel = (field) => {
    if (field === "expiry") {
      setIsEditingExpiry(false);
      setExpiryDate(selectedCert.dateExpires);
    } else if (field === "balance") {
      setIsEditingBalance(false);
      setBalance(selectedCert.originalAmount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center text-black justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Gift Certificates/ Card</h2>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Complete Info</h3>
          <hr className="border-b border-gray-200 mb-4" />

          <div className="space-y-3">
            <div>
              <span className="font-bold">Gift Certificate/Card #:</span>{" "}
              {selectedCert.certificateNumber}
            </div>
            <div>
              <span className="font-bold">Type:</span> {selectedCert.type}
            </div>
            <div>
              <span className="font-bold">Customer:</span>{" "}
              {selectedCert.customer}
            </div>
            <div>
              <span className="font-bold">Partner:</span> Responsive Customer
              Flow
            </div>
            <div>
              <span className="font-bold">Date Issued:</span>{" "}
              {selectedCert.dateIssued}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Date Expires:</span>{" "}
              {isEditingExpiry ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => handleSave("expiry")}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 text-sm"
                    onClick={() => handleCancel("expiry")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {selectedCert.dateExpires}
                  <MdEdit
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setIsEditingExpiry(true)}
                  />
                </>
              )}
            </div>
            <div>
              <span className="font-bold">Original Amount:</span> $
              {selectedCert.originalAmount}
            </div>
            <div>
              <span className="font-bold">From:</span> {selectedCert.from}
            </div>
            <div>
              <span className="font-bold">To:</span> {selectedCert.to}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Balance:</span> $
              {isEditingBalance ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="border rounded px-2 py-1 w-24"
                  />
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => handleSave("balance")}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 text-sm"
                    onClick={() => handleCancel("balance")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {selectedCert.originalAmount}
                  <MdEdit
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setIsEditingBalance(true)}
                  />
                </>
              )}
            </div>
            <div>
              <span className="font-bold">Status:</span>
              <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800 ml-1">
                {selectedCert.status}
              </span>
            </div>
            <div>
              <span className="font-bold">Location:</span> Gents Barber - San
              Jose
            </div>
            <div>
              <span className="font-bold">Delivery:</span> Sent on Dec 30, 2024
            </div>
            <div className="mt-4 ">
              <button className="text-blue-600">Send Email ✉</button>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 border rounded-full"
            >
              Back
            </button>
            <button className="px-6 py-2 bg-[#06283D] text-white rounded-full">
              Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
