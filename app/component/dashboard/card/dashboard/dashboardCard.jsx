
  
  "use client";
import React from "react";
import { Card } from "antd";

const Cards = ({ cardKey, icon, title, number, loading, onClick }) => {
  return (
    <Card
      key={cardKey}
      loading={loading}
      onClick={onClick}
      hoverable
      actions={[
        <div key="viewDetail" className="text-sm text-gray-800 hover:text-white hover:bg-[#06283D]">
          View Detailed Report →
        </div>,
      ]}
      className="bg-white border border-gray-200 rounded-lg w-full shadow-sm
        [&_.ant-card-body]:p-5 [&_.ant-card-body]:pt-4 [&_.ant-card-body]:pb-2
        [&_.ant-card-actions]:text-center [&_.ant-card-actions]:transition-colors 
        [&_.ant-card-actions]:rounded-b-lg
        [&_.ant-card-actions]:border-t [&_.ant-card-actions]:border-gray-500
        [&_.ant-card-actions]:bg-[#06283D] [&_.ant-card-actions]:bg-opacity-30
        [&_.ant-card-actions]:hover:bg-[#06283D]
        [&_.ant-card-meta]:block [&_.ant-card-meta]:text-center
        [&_.ant-card-meta-avatar]:float-none [&_.ant-card-meta-avatar]:mb-4
        [&_.ant-card-meta-detail]:text-center [&_.ant-card-meta-detail]:block
        min-h-[180px] max-h-[250px]"
    >
      <Card.Meta
        avatar={
          <div className="text-4xl text-[#06283D] flex justify-center items-center h-12">
            {icon}
          </div>
        }
        title={
          <div className="font-medium text-sm flex justify-center items-center text-gray-500 mb-1">
            {title}
          </div>
        }
        description={
          <div className="text-2xl font-semibold text-gray-900 flex justify-center items-center">
            {number}
          </div>
        }
      />
    </Card>
  );
};

export default Cards;
