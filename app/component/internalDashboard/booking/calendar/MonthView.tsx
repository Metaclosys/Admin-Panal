"use client";

import React from 'react';
import { Card, Tooltip } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Appointment {
  id: string;
  startTime?: string;
  date?: string;
  title: string;
  status: string;
  customerName: string;
}

interface DayCellProps {
  date: dayjs.Dayjs;
  appointments: Appointment[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ date, appointments, isToday, isCurrentMonth }) => {
  const dayAppointments = appointments.filter(app => 
    dayjs(app.startTime || app.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
  );

  return (
    <div 
      className={`h-full min-h-[120px] p-2 border-r border-b border-gray-200 
        ${isToday ? 'bg-blue-50' : isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className={`text-sm font-medium mb-2 
        ${isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
      >
        {date.format('D')}
      </div>
      <div className="space-y-1">
        {dayAppointments.map(appointment => (
          <Tooltip 
            key={appointment.id}
            title={`${appointment.customerName} - ${appointment.status}`}
          >
            <Card 
              size="small" 
              className={`cursor-pointer hover:shadow-md transition-shadow
                ${appointment.status === 'confirmed' ? 'bg-green-50' : 
                  appointment.status === 'pending' ? 'bg-yellow-50' : 
                  'bg-red-50'}`}
            >
              <div className="text-xs truncate">
                {appointment.title}
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

interface MonthViewProps {
  selectedDate: dayjs.Dayjs;
  appointments: Appointment[];
}

const MonthView: React.FC<MonthViewProps> = ({ selectedDate, appointments }) => {
  const startOfMonth = selectedDate.startOf('month');
  const endOfMonth = selectedDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const weeks: dayjs.Dayjs[][] = [];
  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate)) {
    const week: dayjs.Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }
    weeks.push(week);
  }

  return (
    <div className="grid grid-cols-7">
      {/* Weekday headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-medium py-2 border-b border-gray-200">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {weeks.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((date) => (
            <DayCell
              key={date.format('YYYY-MM-DD')}
              date={date}
              appointments={appointments}
              isToday={date.isSame(dayjs(), 'day')}
              isCurrentMonth={date.isSame(selectedDate, 'month')}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MonthView; 