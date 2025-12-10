"use client";
import React from 'react';
import { Card } from 'antd';

export default function BookingInfoDetail({ params }) {
  const { bookingId } = params;

  // In a real app, you'd fetch this data based on the bookingId
  const bookingInfo = {
    info: {
      created: "Dec 3, 2023 1:14 pm", 
      type: "Standalone",
      bookingNumber: bookingId,
      amountPaid: "$0.00",
      origin: "Responsive Customer Flow",
      orderId: "100864042645", 
      orderTotal: "$35.00",
      status: "Cancelled",
      balanceDue: "$35.00"
    },
    itinerary: {
      date: "Dec 3, 2023",
      time: "3:30 pm",
      service: "Bald Fade",
      duration: "45 minutes", 
      staff: "Alexander Castellanos (Luca)",
      room: "Main",
      price: "$59.00"
    },
    customer: {
      name: "Ivan Aguilera",
      mobile: "(408) 431-2606",
      email: "aguilera.ivan@live.com",
      location: "United States"
    },
    payment: {
      method: "Credit card",
      cardHolder: "Ivan Aguilera", 
      cardNumber: "xxxxxxxxxxxx1044",
      cardType: "Visa",
      amount: "$0.00"
    }
  };

  return (
    <div className="p-4">
      <Card className="mb-4">
        <h3 className="text-lg font-medium mb-2">Info</h3>
        {Object.entries(bookingInfo.info).map(([key, value]) => (
          <div key={key} className="flex py-1 text-sm">
            <span className="w-32 text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <span>{value}</span>
          </div>
        ))}
      </Card>

      <Card className="mb-4">
        <div className="bg-blue-600 text-white py-2 px-4 -mx-4 -mt-4 mb-4">
          ITINERARY for {bookingInfo.itinerary.date} {bookingInfo.itinerary.time}
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
              <td className="pt-2">{bookingInfo.itinerary.date}</td>
              <td className="pt-2">{bookingInfo.itinerary.time}</td>
              <td className="pt-2">{bookingInfo.itinerary.service}</td>
              <td className="pt-2">{bookingInfo.itinerary.duration}</td>
              <td className="pt-2">{bookingInfo.itinerary.staff}</td>
              <td className="pt-2">{bookingInfo.itinerary.room}</td>
              <td className="pt-2">{bookingInfo.itinerary.price}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-medium mb-2">Customer</h3>
          {Object.entries(bookingInfo.customer).map(([key, value]) => (
            <div key={key} className="flex py-1 text-sm">
              <span className="w-24 text-gray-600 capitalize">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Payments</h3>
          {Object.entries(bookingInfo.payment).map(([key, value]) => (
            <div key={key} className="flex py-1 text-sm">
              <span className="w-24 text-gray-600 capitalize">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}