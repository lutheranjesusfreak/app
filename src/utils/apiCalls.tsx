import type { CalendarData } from '../types/calendarData';

export async function getCalendarData(): Promise<CalendarData> {
  const apiCalendarBase = `https://api.dailyoffice2019.com/api/v1/calendar/`;
  const date = new Date();
  let calenderData = {} as CalendarData;
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
  return {
    date: calenderData.date ?? undefined,
    season: calenderData.season ?? undefined,
    primary_color: calenderData.date ?? undefined,
    primary_evening_color: calenderData.primary_evening_color ?? undefined,
    primary_feast: calenderData.primary_feast ?? undefined,
    primary_evening_feast: calenderData.primary_feast ?? undefined,
    major_feast: calenderData.major_feast ?? undefined,
    major_or_minor_feast: calenderData.major_or_minor_feast ?? undefined,
    error: calenderData.error ?? undefined
  };
};
