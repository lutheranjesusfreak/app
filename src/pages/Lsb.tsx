import { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';
//import type { CalendarData } from '../types/calendarData';
import type { ReadingPlan } from '../types/readingPlan';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  //const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [readingPlan, setReadingPlan] = useState<ReadingPlan>({});

  useEffect(() => {
    getFromLocalStorage()
    .then(() => {
      //setCalendarData(JSON.parse(localStorage.getItem('calendarData') ?? '{}'));
      setReadingPlan(JSON.parse(localStorage.getItem('readingPlan') ?? '{}'));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Daily Lectionary LSB</h1>
      {isLoading && (
        <h2>Loading...</h2>
      )}
      {!isLoading && (
        <>
          <h2>{readingPlan.season}</h2>
        </>
      )}
      {readingPlan.error && (
        <h2>{readingPlan.error}</h2>
      )}
    </>
  );
}
