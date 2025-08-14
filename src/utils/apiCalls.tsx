import type { CalendarData } from '../types/calendarData';

export async function getCalendarData(): Promise<CalendarData> {
  const apiCalendarBase = `https://calapi.inadiutorium.cz/api/v0/en/calendars/default/`;
  const currentDate = new Date();
  const dateStrings = [ currentDate.getFullYear(), currentDate.getMonth() + 1 , currentDate.getDate() ];
  let calenderData = {};
  await fetch(apiCalendarBase + dateStrings.join('/'))
  .then(response => {
    return response.json();
  })
  .then(data => {
    calenderData = data;
  })
  .catch(error => {
    calenderData = error;
  });
  return calenderData;
};
