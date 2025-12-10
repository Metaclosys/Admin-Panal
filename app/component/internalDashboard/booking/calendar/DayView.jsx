"use client";
import { Card, Tooltip } from "antd";
import dayjs from "dayjs";

const generateTimeSlots = (startHour = 6, endHour = 23) => {
  const slots = []
  for (let hour = startHour; hour <= endHour; hour += 1) {
    const hourLabel = String(hour).padStart(2, '0')
    slots.push(`${hourLabel}:00`)
    slots.push(`${hourLabel}:30`)
  }
  return slots
}

const TimeSlot = ({ time, appointments, date }) => {
  const slotAppointments = appointments.filter(app => {
    const appTime = dayjs(app.startTime || app.date);
    return appTime.format('HH:mm') === time;
  });

  return (
    <div className="relative min-h-[40px] border-b border-gray-200 hover:bg-gray-50">
      <div className="absolute left-0 -top-2 text-xs text-gray-500 select-none">
        {time}
      </div>
      {slotAppointments.map((app, index) => (
        <Tooltip 
          key={app.id || index}
          title={
            <div>
              <div><strong>Client:</strong> {app.clientName}</div>
              <div><strong>Service:</strong> {app.service}</div>
              <div><strong>Duration:</strong> {app.duration}min</div>
              <div><strong>Time:</strong> {dayjs(app.startTime || app.date).format('HH:mm')}</div>
            </div>
          }
        >
          <Card 
            className={`m-1 ${
              app.status === 'cancelled' ? 'bg-red-50 border-red-200' :
              app.status === 'completed' ? 'bg-green-50 border-green-200' :
              'bg-blue-50 border-blue-200'
            } hover:shadow-md transition-shadow cursor-pointer`}
            style={{
              marginLeft: '40px',
              minHeight: `${(app.duration || 30)}px`,
              maxWidth: 'calc(100% - 45px)'
            }}
            size="small"
          >
            <div className="text-xs">
              <div className="font-bold truncate">{app.service}</div>
              <div className="truncate">{app.clientName}</div>
              <div className="text-gray-600 truncate">
                {app.duration}min
                {app.status && (
                  <span className={`ml-2 px-1 rounded text-xs ${
                    app.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    app.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {app.status}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </Tooltip>
      ))}
    </div>
  );
};

const DayView = ({ selectedDate, appointments, onDateChange }) => {
  // Generate time slots from 6 AM to 11:30 PM in 30-minute increments
  const timeSlots = generateTimeSlots();

  const dayAppointments = appointments.filter(app => 
    dayjs(app.startTime || app.date).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
  );

  return (
    <div className="flex flex-1 h-full overflow-auto">
      {/* Time column */}
      <div className="w-20 border-r border-gray-200 flex-shrink-0 bg-white">
        <div className="h-16 sticky top-0 bg-white z-10 border-b border-gray-200" />
        {timeSlots.map(time => (
          <div key={time} className="h-[40px] relative">
            <span className="absolute -top-2 left-2 text-xs text-gray-500 select-none">
              {time}
            </span>
          </div>
        ))}
      </div>
      
      {/* Appointments column */}
      <div className="flex-1 min-w-[300px]">
        {/* Sticky header */}
        <div className="h-16 sticky top-0 bg-white z-10 border-b border-gray-200 flex flex-col items-center justify-center">
          <div className="text-lg font-medium">
            {dayjs(selectedDate).format('dddd')}
          </div>
          <div className="text-sm text-gray-500">
            {dayjs(selectedDate).format('MMMM D, YYYY')}
          </div>
        </div>

        {/* Time slots with appointments */}
        <div className="relative">
          {timeSlots.map(time => (
            <TimeSlot
              key={`${dayjs(selectedDate).format('YYYY-MM-DD')}-${time}`}
              time={time}
              date={selectedDate}
              appointments={dayAppointments}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView; 
