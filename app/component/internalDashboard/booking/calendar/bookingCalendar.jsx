"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Spin } from "antd";
import dayjs from "dayjs";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import BookingFilters from "../filters/BookingFilters";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BookingCalendar = ({ selectedDate, setSelectedDate, view, selectedLocation }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'rooms',
    employees: [],
    roomId: null,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session?.accessToken) return;

      try {
        setLoading(true);
        const isValidObjectId = (value) =>
          typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);

        if (selectedLocation && !isValidObjectId(selectedLocation)) {
          console.warn(
            "Skipping invalid locationId while fetching bookings:",
            selectedLocation
          );
        }

        const params = new URLSearchParams();

        if (isValidObjectId(selectedLocation)) {
          params.append("locationId", selectedLocation);
        }

        const startDate = selectedDate?.startOf("day")?.toISOString();
        const endDate = selectedDate?.endOf("day")?.toISOString();
        if (startDate) {
          params.append("startDate", startDate);
        }
        if (endDate) {
          params.append("endDate", endDate);
        }

        if (filters?.type) {
          params.append("type", filters.type);
        }

        if (Array.isArray(filters?.employees) && filters.employees.length > 0) {
          filters.employees
            .filter(isValidObjectId)
            .forEach((employeeId) => params.append("employees", employeeId));
        }

        if (isValidObjectId(filters?.roomId)) {
          params.append("roomId", filters.roomId);
        }

        const endpoint =
          params.toString().length > 0
            ? `${API_ENDPOINTS.BOOKINGS.BASE}?${params.toString()}`
            : API_ENDPOINTS.BOOKINGS.BASE;

        const data = await apiCall(endpoint, {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });

        // Normalize server booking objects into a lightweight appointment shape
        // used by the calendar views: { id, title, clientName, startTime, duration, status }
        const normalize = (booking) => {
          const id = booking.id || booking._id || booking.bookingId || null;
          // service may be populated as serviceId or service
          const serviceObj = booking.serviceId || booking.service || {};
          const serviceName = serviceObj.name || booking.title || booking.serviceName || '';
          // customer may be populated as customerId or customer
          const customerObj = booking.customerId || booking.customer || {};
          const clientName = [customerObj.firstName, customerObj.lastName]
            .filter(Boolean)
            .join(' ') || customerObj.email || booking.clientName || '';
          const startTime = booking.startTime || booking.date || booking.start || null;
          // duration may be on the service or directly on the booking
          const duration = serviceObj.duration || booking.duration || booking.length || 60;
          const status = booking.status || 'pending';

          return {
            id,
            title: serviceName,
            clientName,
            startTime,
            duration,
            status,
          };
        };

        const normalized = Array.isArray(data) ? data.map(normalize) : [];
        setAppointments(normalized);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session?.accessToken, selectedDate, selectedLocation, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const dateCellRender = (value) => {
    const dayAppointments = appointments.filter(app => 
      dayjs(app.startTime).isSame(value, 'day')
    );

    return (
      <div className="calendar-cell">
        {dayAppointments.map(app => (
          <div key={app.id} className="appointment">
            {app.title}
          </div>
        ))}
      </div>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'day':
        return (
          <DayView
            selectedDate={selectedDate}
            appointments={appointments}
            onDateChange={setSelectedDate}
          />
        );
      case 'week':
        return (
          <WeekView
            selectedDate={selectedDate}
            appointments={appointments}
            onDateChange={setSelectedDate}
          />
        );
      case 'month':
        return (
          <MonthView
            selectedDate={selectedDate}
            appointments={appointments}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="booking-calendar">
      <BookingFilters
        defaultView="rooms"
        onFilterChange={handleFilterChange}
        onViewChange={(value) => {
          if (value === 'employees') {
            router.push('/internalDashboard/Booking/staff');
          } else if (value === 'rooms' || value === 'services') {
            setFilters(prev => ({ ...prev, type: value }));
          }
        }}
      />
      {renderView()}
    </div>
  );
};

export default BookingCalendar;
