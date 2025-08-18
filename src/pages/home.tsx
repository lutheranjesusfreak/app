import { useState, useEffect } from 'react';
import { getCalendarData } from '../utils/apiCalls';
import type { CalendarData } from '../types/calendarData';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData>({});

  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendarData');
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    if (!savedCalendar || JSON.parse(savedCalendar).date !== dateString) {
      getCalendarData()
      .then(data => {
        setCalendarData(data);
        localStorage.setItem('calendarData', JSON.stringify(data));
      })
      .finally(() => {
        setIsLoading(false);
      });    
    } else {
      setCalendarData(JSON.parse(savedCalendar));
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <h1>Daily Lectionary</h1>
      {isLoading && (
        <h2>Loading...</h2>
      )}
      {!isLoading && (
        <>
          <h2>{calendarData.primary_feast}</h2>
          <h2>{calendarData.primary_color}</h2>
          {calendarData.primary_feast != calendarData.primary_evening_feast && (
            <>
              <h2>{calendarData.primary_evening_feast}</h2>
              <h2>{calendarData.primary_evening_color}</h2>
            </>
          )}
        </>
      )}
      {calendarData.error && (
        <h2>{calendarData.error}</h2>
      )}
    </>
  );
}
