import type { CalendarData } from '../types/calendarData';

export async function getCalendarData(): Promise<CalendarData> {
  const apiCalendarBase = `https://api.dailyoffice2019.com/api/v1/calendar/`;
  const date = new Date();
  let calenderData = {};
  await fetch(apiCalendarBase + `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  .then(response => {
    if (!response.ok) return {'error': `Error ${response.status}`};
    return response.json();
  })
  .then(data => {
    calenderData = data;
  })
  .catch(error => {
    const errorMessage = `${error.name}: ${error.message}`;
    console.error(errorMessage);
    calenderData = {'error': errorMessage};
  });
  return calenderData;
};
