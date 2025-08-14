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
      {!isLoading && calendarData.celebrations && (
        <>
          {calendarData.celebrations.map((item, index) => (
            <h2 key={index}>{item.title}</h2>
          ))}
        </>
      )}
      {calendarData.error && (
        <h2>{calendarData.error}</h2>
      )}
    </>
  );
}
