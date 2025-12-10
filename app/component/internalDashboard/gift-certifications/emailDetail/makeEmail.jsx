import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

function MakeEmail({ selectedCert, setShowModal }) {
  const [isEditingExpiry, setIsEditingExpiry] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [expiryDate, setExpiryDate] = useState(selectedCert.dateExpires);
  const [balance, setBalance] = useState(selectedCert.originalAmount);
  const [emailModal, setEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={() => setEmailModal(false)}
          className="absolute right-4 top-4 text-2xl"
        >
          ×
        </button>
        <h2 className="text-lg text-black font-bold mb-4">
          Email Gift Certificate
        </h2>
        <div className="mb-4">
          <label className="text-sm text-black font-medium">
            *Recipient Email:
          </label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter recipient email"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 border text-black rounded-full"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#06283D] text-white rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeEmail;
