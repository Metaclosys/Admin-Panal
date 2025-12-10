"use client";
import React from "react";
import QuickAction from "./quickAction/quickAction";
import { Image } from "antd";
import Link from "next/link";
import { PlusCircleOutlined, ShopOutlined } from '@ant-design/icons';

function LowerSection({ stats, loading }) {
  return (
    <div>
      <div className="flex flex-row justify-center gap-8 m-5">
        <QuickAction
          image={<ShopOutlined style={{ fontSize: '40px' }} />}
          description={"Create, Customize, and Manage Your Shop!"}
          buttonText={"Add a New Shop"}
          onClick={() => window.location.href = '/dashboard/shops/add'}
          loading={loading}
        />
        <QuickAction
          image={<PlusCircleOutlined style={{ fontSize: '40px' }} />}
          description={"Quick and Easy Booking Management"}
          buttonText={"Create New Booking"}
          onClick={() => window.location.href = '/dashboard/bookings/add'}
          loading={loading}
        />
      </div>

    </div>
  );
}

export default LowerSection;
