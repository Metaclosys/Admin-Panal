"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { message } from "antd";
import BookingCalendar from "../../../component/internalDashboard/booking/calendar/bookingCalendar";
import BookingHeader from "../../../component/internalDashboard/booking/header/bookingHeader";
import HeaderIcons from "../../../component/internalDashboard/booking/header/headerIcons";
import DropdownCards from "../../../component/internalDashboard/booking/cards/dropdownCards";
import WalkInForm from "../../../component/internalDashboard/booking/walkIn/walkInForm";

export default function BarberCalendar() {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState("week");
  const [activeCard, setActiveCard] = useState(null);
  const [showWalkInForm, setShowWalkInForm] = useState(false);

  // Get location ID from session
  const locationId = session?.user?.locationId;

  const handleIconClick = (cardType) => {
    setActiveCard(activeCard === cardType ? null : cardType);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Gents Barber - {session?.user?.locationName || 'Loading...'}</p>
          <HeaderIcons handleIconClick={handleIconClick} />
        </div>

        <BookingHeader
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          view={view}
          setView={handleViewChange}
        />
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <BookingCalendar
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          view={view}
          selectedEmployee={selectedEmployee}
          selectedLocation={locationId}
        />
      </div>

      {activeCard && (
        <DropdownCards
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          setShowWalkInForm={setShowWalkInForm}
        />
      )}

      {showWalkInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <WalkInForm 
              onCancel={() => setShowWalkInForm(false)} 
              onSuccess={() => {
                setShowWalkInForm(false);
              }}
              selectedEmployee={selectedEmployee}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
