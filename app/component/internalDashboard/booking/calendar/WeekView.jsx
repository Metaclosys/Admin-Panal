"use client";
import { Card, Tooltip } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const generateTimeSlots = (startHour = 6, endHour = 23) => {
  const slots = []
  for (let hour = startHour; hour <= endHour; hour += 1) {
    const hourLabel = String(hour).padStart(2, '0')
    slots.push(`${hourLabel}:00`)
    slots.push(`${hourLabel}:30`)
  }
  return slots
}

const WeekDayColumn = ({ date, appointments, isToday }) => {
  const dayAppointments = appointments.filter(app => 
    dayjs(app.startTime || app.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
  );

  const timeSlots = generateTimeSlots();

  return (
    <div className={`flex-1 min-w-[150px] border-r border-gray-200 ${isToday ? 'bg-blue-50/10' : ''}`}>
      <div className={`h-16 sticky top-0 bg-white z-10 border-b border-gray-200 flex flex-col items-center justify-center
        ${isToday ? 'bg-blue-50' : ''}`}>
        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
          {dayjs(date).format('ddd')}
        </div>
        <div className={`text-xs ${isToday ? 'text-blue-500' : 'text-gray-500'}`}>
          {dayjs(date).format('MMM D')}
        </div>
      </div>
      <div>
        {timeSlots.map(time => {
          const slotAppointments = dayAppointments.filter(app => 
            dayjs(app.startTime || app.date).format('HH:mm') === time
          );

          return (
            <div 
              key={time} 
              className="relative min-h-[40px] border-b border-gray-200 hover:bg-gray-50/50"
            >
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
                      minHeight: `${(app.duration || 30)}px`,
                      maxWidth: 'calc(100% - 10px)'
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
        })}
      </div>
    </div>
  );
};

const WeekView = ({ selectedDate, appointments }) => {
  const today = dayjs();
  
  // Get the start of the week (Sunday) and generate 7 days
  const weekDays = Array.from({ length: 7 }, (_, i) => 
    dayjs(selectedDate).startOf('week').add(i, 'day')
  );

  const timeSlots = generateTimeSlots();

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
      
      {/* Days columns */}
      <div className="flex flex-1">
        {weekDays.map(date => (
          <WeekDayColumn
            key={date.format('YYYY-MM-DD')}
            date={date}
            appointments={appointments}
            isToday={date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView; 
