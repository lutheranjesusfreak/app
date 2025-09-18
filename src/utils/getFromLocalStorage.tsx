import { getCalendarData, getReadingPlan, getPassage } from '../utils/apiCalls';
import type { CalendarData } from "../types/calendarData";
import type { Reading, ReadingPlan } from "../types/readingPlan";
import type { Passage } from '../types/passage';

export async function getFromLocalStorage() {
  try {
    const lastUpdated = localStorage.getItem('lastUpdated');
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    if (lastUpdated != dateString) {
      let season = '';
      await getCalendarData(dateString)
      .then(data => {
        localStorage.setItem('calendarData', JSON.stringify(data));
        season = data.season?.name ?? '';
      });
      const savedReadingPlan = localStorage.getItem('readingPlan');
      if (!savedReadingPlan || JSON.parse(savedReadingPlan).season !== season) {
        await getReadingPlan(getSeasonSlug(season, date.getMonth() + 1, date.getDate()))
        .then(data => {
          localStorage.setItem('readingPlan', JSON.stringify(data));
        });
      }
      await getReading()
      .then(data => {
        if (data != undefined) localStorage.setItem('reading', JSON.stringify(data));
        else localStorage.setItem('reading', '{"error": "This reading has not be configured yet!"}');
      });
      await getPassages()
      .then(data => {
        localStorage.setItem('passages', JSON.stringify(data));
        localStorage.setItem('lastUpdated', dateString);
      });
    }
  }
  catch (error: any) {
    console.error(error.message);
  }
}

function getSeasonSlug(season: string, month: number, day: number): string {
  let seasonSlug = '';
  switch (season) {
    // TODO add more seasons
    case 'Season After Pentecost':
      seasonSlug = 'ordinary-time';
      break;
    case 'Advent':
      seasonSlug = 'advent';
      break;
    default:
      throw new Error(`Invalid Season: ${season}`);
  }
  if (season == 'Season After Pentecost' && month == 11 && day > 26) {
    seasonSlug = 'advent';
  }
  return seasonSlug;
}

async function getReading() {
  const savedCalendar = localStorage.getItem('calendarData');
  const savedReadingPlan = localStorage.getItem('readingPlan');
  if (!savedCalendar || savedCalendar === '{}' || !savedReadingPlan || savedReadingPlan === '{}') {
    throw new Error('Cannot generate reading from incomplete data.');
  }
  const calendarData: CalendarData = await JSON.parse(savedCalendar);
  const readingPlan: ReadingPlan = await JSON.parse(savedReadingPlan);
  const currentDate = calendarData.date?.substring(5);
  return readingPlan.data?.find(day => day.date === currentDate);
}

async function getPassages(): Promise<Passage[]> {
  const savedReading = localStorage.getItem('reading');
  if (!savedReading || savedReading === '{}') {
    throw new Error('There are no passages to find.');
  }

  const readingData: Reading = JSON.parse(savedReading);
  if (readingData.error) {
    throw new Error(`Error: ${readingData.error}`);
  }

  // Collect all passage promises
  const passagePromises = readingData.scripture?.map(scripture =>
    getPassage(scripture)
  ) ?? [];

  // Wait for all to complete
  const passages = await Promise.all(passagePromises);

  return passages;
}
