import { Button } from "antd";
import React from "react";

function DeletePop({ title, message, onCancel, onDelete, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-[500px] max-h-[300px] overflow-y-auto">
        <Button
          shape="circle"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </Button>
        <h3 className="text-xl font-semibold mb-4 text-black">{title}</h3>
        <p className="text-gray-600 mb-8">{message}</p>

        <div className="flex justify-start gap-4 mt-6">
          <Button
            shape="round"
            size="large"
            className="text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            shape="round"
            size="large"
            className="text-white bg-[var(--bgDark)] hover:bg-[var(--bgDark)]/80 transition-colors"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeletePop;
