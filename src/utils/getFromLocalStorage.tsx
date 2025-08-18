import { getCalendarData } from '../utils/apiCalls';

export async function getFromLocalStorage() {
  const savedCalendar = localStorage.getItem('calendarData');
  const date = new Date();
  const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  if (!savedCalendar || JSON.parse(savedCalendar).date !== dateString) {
    await getCalendarData()
    .then(data => {
      localStorage.setItem('calendarData', JSON.stringify(data));
    });
  }
};