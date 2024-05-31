import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, setMonth, getMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import './calendar.scss';

interface CalendarProps {
  rehabDays: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ rehabDays }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  const isRehabDay = (date: Date) => {
    return rehabDays.some(rehabDay => 
      date.getDate() === rehabDay.getDate() && 
      date.getMonth() === rehabDay.getMonth() && 
      date.getFullYear() === rehabDay.getFullYear()
    );
  };

  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value, 10);
    setCurrentMonth(setMonth(currentMonth, selectedMonth));
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <select value={getMonth(currentMonth)} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index}>
              {capitalizeFirstLetter(format(setMonth(new Date(), index), 'MMMM', { locale: es }))}
            </option>
          ))}
        </select>
        <span>{format(currentMonth, 'yyyy')}</span>
      </div>
      <div className="calendar-body">
        <div className="weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days">
          {days.map(date => {
            const dayClass = isToday(date) ? 'today' : isRehabDay(date) ? 'rehab-day' : '';
            return (
              <div key={date.toString()} className={`day ${dayClass}`}>
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
