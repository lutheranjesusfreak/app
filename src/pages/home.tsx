import { useState, useEffect } from 'react';
import { getCalendarData } from '../utils/apiCalls';
import type { CalendarData } from '../types/calendarData';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData>({});

  useEffect(() => {
    getCalendarData()
    .then(data => {
      setCalendarData(data);
    })
    .finally(() => {
      setIsLoading(false);
    });
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
