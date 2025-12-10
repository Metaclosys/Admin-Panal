"use client";
import { React, useState } from "react";
import { Card } from "antd";

const Cards = ({ key, icon, title, number }) => {
  const [loading, setLoading] = useState(false);

  const iconss = [
    <div className="flex text-3xl text-blue-600 mb-1 justify-center w-full m-0">
      {icon}
    </div>,
  ];

  return (
    <Card
      key={key}
      loading={loading}
      actions={[
        <div key="viewDetail" className="text-sm hover:text-white text-center">
          View Detail
        </div>,
      ]}
      className="bg-white border border-black p-5 pt-0 rounded-lg w-full 
      flex flex-col justify-between min-h-[180px] max-h-[250px] shadow-sm items-center
      [&_.ant-card-actions]:bg-[#06283D] [&_.ant-card-actions]:bg-opacity-30 
      [&_.ant-card-actions]:w-full [&_.ant-card-actions]:text-center 
      [&_.ant-card-actions]:transition-colors [&_.ant-card-actions]:hover:bg-[#06283D] 
      [&_.ant-card-actions]:rounded-md [&_.ant-card-actions]:border 
      [&_.ant-card-actions]:border-gray-800"
    >
       {/* flex flex-col justify-between min-h-[180px] max-h-[250px] shadow-sm items-center"
    >
      <div className="flex items-center justify-center">
        {icon}
      </div> */}
      <Card.Meta
        avatar={iconss}
        title={
          <div className="font-medium text-base text-gray-600 text-center w-full">
            {title}
          </div>
        }
        description={
          <div className="text-2xl font-bold text-gray-800 text-center w-full">
            {number}
          </div>
        }
        className="flex flex-col items-center justify-center"
      />
    </Card>
    // the icon are not centered .
  );
};

export default Cards;
