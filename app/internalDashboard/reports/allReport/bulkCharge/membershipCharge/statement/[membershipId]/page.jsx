"use client";
import React from "react";
import { Card, Button } from "antd";
import { PrinterOutlined, MailOutlined } from "@ant-design/icons";

export default function MembershipStatement({ params }) {
  const { membershipId } = params;

  // In a real app, you'd fetch this data based on the membershipId
  const statementInfo = {
    businessAddress: {
      name: "Gents Barber - San Jose",
      address: "377 santana row suite 1060",
      city: "san jose, CA 95128",
      country: "United States",
      phone: "(408) 217-9369"
    },
    billTo: {
      name: "Karan Cheema"
    },
    currentStatus: "Scheduled",
    paymentMethod: "CreditCard",
    lastPayment: "Charged $379.00 on 1/31/2024 7:11:00 PM",
    transaction: {
      date: "Dec 3, 2023",
      time: "3:30 pm",
      service: "Bald Fade",
      duration: "45 minutes",
      staff: "Alexander Castellanos (Luca)Requested",
      room: "Main",
      price: "$85.00"
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card className="bg-white">
          <h3 className="font-medium mb-2 text-black">Business Address:</h3>
          <div className="text-sm space-y-1 text-black">
            <p>{statementInfo.businessAddress.name}</p>
            <p>{statementInfo.businessAddress.address}</p>
            <p>{statementInfo.businessAddress.city}</p>
            <p>{statementInfo.businessAddress.country}</p>
            <p>{statementInfo.businessAddress.phone}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <h3 className="font-medium mb-2 text-black">Bill To:</h3>
          <p className="text-sm">{statementInfo.billTo.name}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card className="bg-white">
          <h3 className="font-medium mb-2 text-black">Payment Method:</h3>
          <p className="text-sm">{statementInfo.paymentMethod}</p>
        </Card>

        <Card className="bg-white">
          <h3 className="font-medium mb-2 text-black">Current Status:</h3>
          <p className="text-sm">{statementInfo.currentStatus}</p>
        </Card>
      </div>

      <Card className="bg-white mb-6">
        <h3 className="font-medium mb-2 text-black">Last Payment:</h3>
        <p className="text-sm">{statementInfo.lastPayment}</p>
      </Card>

      <Card className="bg-white mb-6">
        <div className="bg-blue-600 text-white py-2 px-4 -mx-4 -mt-4 mb-4">
          <h3 className="font-medium">Date Transaction Charge Amount Balance Due</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Date</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Service</th>
              <th className="pb-2">Duration</th>
              <th className="pb-2">Staff</th>
              <th className="pb-2">Room</th>
              <th className="pb-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-2">{statementInfo.transaction.date}</td>
              <td className="pt-2">{statementInfo.transaction.time}</td>
              <td className="pt-2">{statementInfo.transaction.service}</td>
              <td className="pt-2">{statementInfo.transaction.duration}</td>
              <td className="pt-2">{statementInfo.transaction.staff}</td>
              <td className="pt-2">{statementInfo.transaction.room}</td>
              <td className="pt-2">{statementInfo.transaction.price}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="flex justify-center gap-4">
        <Button 
          type="primary"
          icon={<MailOutlined />}
          className="bg-[#0F172A]"
          size="large"
        >
          Email Statement
        </Button>
        <Button
          icon={<PrinterOutlined />}
          size="large"
        >
          Print Statement
        </Button>
      </div>
    </div>
  );
} 