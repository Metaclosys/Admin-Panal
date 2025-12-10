"use client";
import React, { useState } from "react";
import { Progress } from "antd";

const SalesSource = ({ title, amount, percentage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-black">
          <div className="flex justify-between mb-1">
            <span className="font-medium">{title}</span>
            <span>${amount}</span>
          </div>
          <Progress
            percent={percentage}
            showInfo={false}
            strokeColor="#1890ff"
          />
        </div>
        <button
          className="ml-4 text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "View Less ↑" : "View More →"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div ckassName="flex flex-col">
              <div className="text-sm text-gray-500 mb-1">Campaigns</div>

              <div className="text-sm text-black font-medium">
                No Campaign Assigned
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Sales</div>
              <div className="flex flex-row gap-2">
                <div className="text-sm text-black font-medium">$2,214</div>
                <div className="text-xs text-gray-500">+$5,865 Pending</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Avg/Order</div>
              <div className="flex flex-row gap-2">
                <div className="text-sm text-black font-medium">$67</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Customers</div>
              <div className="flex flex-row gap-2">
                <div className="text-sm text-black font-medium">31</div>
                <div className="text-xs text-gray-500">
                  <span>2 New</span>
                  <span className="mx-1">·</span>
                  <span>27 Returning</span>
                  <span className="mx-1">·</span>
                  <span>2 Unknown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesSource;
