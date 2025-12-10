"use client";
import React, { useMemo } from "react";
import Chart from "../../chart/chart";
import SmallChart from "../../chart/SmallChart";
import { format, subDays, startOfWeek, eachDayOfInterval } from 'date-fns';

function MediumSection({ stats, loading }) {
  const bookingStats = useMemo(() => {
    if (!stats?.recentBookings) return null;

    const lastWeekBookings = stats.recentBookings.filter(booking => 
      new Date(booking.startTime) > subDays(new Date(), 7)
    );

    const previousWeekBookings = stats.recentBookings.filter(booking => 
      new Date(booking.startTime) > subDays(new Date(), 14) &&
      new Date(booking.startTime) <= subDays(new Date(), 7)
    );

    const percentageChange = previousWeekBookings.length === 0 
      ? 100 
      : ((lastWeekBookings.length - previousWeekBookings.length) / previousWeekBookings.length) * 100;

    return {
      total: lastWeekBookings.length,
      percentageChange: percentageChange.toFixed(1),
      dateRange: `Sales from ${format(subDays(new Date(), 7), 'MMM d')} - ${format(new Date(), 'MMM d, yyyy')}`
    };
  }, [stats?.recentBookings]);

  const servicesData = useMemo(() => {
    if (!stats?.recentBookings || !stats?.services) return [];
    
    // Get the last 7 days
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    // Initialize data for each day with service counts
    const dailyData = days.reduce((acc, day) => {
      acc[format(day, 'EEE')] = new Map();
      return acc;
    }, {});

    // Count services booked per day
    stats.recentBookings.forEach(booking => {
      const bookingDate = new Date(booking.startTime);
      const dayKey = format(bookingDate, 'EEE');
      if (dailyData[dayKey]) {
        const serviceCount = dailyData[dayKey].get(booking.serviceId) || 0;
        dailyData[dayKey].set(booking.serviceId, serviceCount + 1);
      }
    });

    // Convert to chart format - sum of all services per day
    return Object.entries(dailyData).map(([name, services]) => ({
      name,
      value: Array.from(services.values()).reduce((sum, count) => sum + count, 0)
    }));
  }, [stats?.recentBookings, stats?.services]);

  const employeePerformance = useMemo(() => {
    if (!stats?.recentBookings || !stats?.recentEmployees) return [];
    
    // Get the last 7 days
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    // Create performance data for each employee
    const employeeBookings = stats.recentEmployees.slice(0, 5).map(employee => {
      const dailyBookings = days.map(day => {
        const dayBookings = stats.recentBookings.filter(booking => 
          booking.employeeId === employee._id && 
          format(new Date(booking.startTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );

        return {
          date: format(day, 'MM/dd'),
          [employee.name]: dayBookings.length
        };
      });

      return dailyBookings;
    });

    // Merge all employee data by date
    const mergedData = days.map((day, index) => {
      const dayData = { date: format(day, 'MM/dd') };
      stats.recentEmployees.slice(0, 5).forEach((employee, empIndex) => {
        dayData[employee.name] = employeeBookings[empIndex][index][employee.name];
      });
      return dayData;
    });

    return mergedData;
  }, [stats?.recentBookings, stats?.recentEmployees]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <Chart 
            title="Bookings" 
            subtitle={bookingStats?.total || "0"}
            percentageChange={bookingStats?.percentageChange || "0"}
            period="vs last week"
            dateRange={bookingStats?.dateRange || "No data available"}
            loading={loading}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-4">
          <SmallChart 
            title="Services Booked" 
            type="bar"
            data={servicesData}
            loading={loading}
          />
          <SmallChart 
            title="Employee Performance" 
            type="area"
            data={employeePerformance}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default MediumSection;
