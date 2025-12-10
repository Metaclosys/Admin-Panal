"use client";
import { React, useState } from "react";
import { Button, Card } from "antd";

const QuickAction = ({ image, description, buttonText }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Card
        loading={loading}
        className="bg-white border border-black p-5 rounded-lg w-full 
        flex flex-row justify-between shadow-sm items-center"
      >
        {/* Left side content */}
        <div className="flex flex-row justify-between gap-4 w-full">
          <div className="flex flex-col gap-4 w-2/3">
            <div className="font-medium text-base text-gray-600">
              {description}
            </div>
            <Button
              type="primary"
              shape="round"
              className="bg-[#0F172A] border-[#0F172A] hover:bg-[#1E293B]"
            >
              {buttonText}
            </Button>
          </div>

          {/* Right side image */}
          <div className="w-1/3 text-right text-3xl">{image}</div>
        </div>
      </Card>
    </div>
  );
};

export default QuickAction;
