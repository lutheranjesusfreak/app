import { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import type { CalendarData } from '../types/calendarData';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData>({});

  useEffect(() => {
    getFromLocalStorage()
    .then(() => {
      setCalendarData(JSON.parse(localStorage.getItem('calendarData') ?? '{}'));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Daily Lectionary Home Page</h1>
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
