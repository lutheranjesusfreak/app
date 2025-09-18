import type { CalendarData } from '../types/calendarData';
import type { ReadingPlan, Scripture } from '../types/readingPlan';
import type { Passage, Chapter, Verse } from '../types/passage';

export async function getCalendarData(dateString: string): Promise<CalendarData> {
  const apiCalendarBase = `https://api.dailyoffice2019.com/api/v1/calendar/`;
  let calenderData = {} as CalendarData;
  await fetch(apiCalendarBase + dateString)
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
    primary_color: calenderData.primary_color ?? undefined,
    primary_evening_color: calenderData.primary_evening_color ?? undefined,
    primary_feast: calenderData.primary_feast ?? undefined,
    primary_evening_feast: calenderData.primary_feast ?? undefined,
    major_feast: calenderData.major_feast ?? undefined,
    major_or_minor_feast: calenderData.major_or_minor_feast ?? undefined,
    error: calenderData.error ?? undefined
  } as CalendarData;
}

export async function getReadingPlan(seasonSlug: string): Promise<ReadingPlan> {
  const apiBase = `${import.meta.env.BASE_URL}api/`;
  let readingPlan = {} as ReadingPlan;
  await fetch(apiBase + seasonSlug + '.json')
  .then(response => {
    if (!response.ok) return {'error': `Error ${response.status}`};
    return response.json();
  })
  .then(data => {
    readingPlan = data;
  })
  .catch(error => {
    const errorMessage = `${error.name}: ${error.message}`;
    console.error(errorMessage);
    readingPlan = {'error': errorMessage};
  });
  return {
    season: readingPlan.season ?? undefined,
    data: readingPlan.data ?? undefined,
    error: readingPlan.error ?? undefined
  } as ReadingPlan;
}

export async function getPassage(scripture: Scripture): Promise<Passage> {
  const apiBollsBase = `https://bolls.life/get-chapter/ESV/`
  let passage = {
    label: scripture.label,
    chapters: [],
    optional: scripture.optional} as Passage;
  for (let i = 0; i < scripture.chapters.length; i++) {
    const book = scripture.book;
    const chapter = scripture.chapters[i];
    let ch = {chapter: chapter, verses: []} as Chapter;
    const verseRange = scripture.verses[i];
    let length = 0;
    let verses = [] as number[];
    await fetch(apiBollsBase + `${book}/${chapter}/`)
    .then(response => {
      return response.json();
    })
    .then((data: Verse[]) => {
      length = verseRange[1] == 0
        ? Math.floor(data[data.length - 1].verse - verseRange[0]) + 1
        : Math.floor(verseRange[1] - verseRange[0]) + 1;
      verses = Array.from({ length }, (_, index) => verseRange[0] + index);
      return data;
    })
    .then((data: Verse[]) => {
      verses.forEach((v: number) => {
        const foundVerse = data.find(verse => verse.verse === v);
        if (foundVerse) {
          ch.verses.push(foundVerse);
        }
      });
    })
    .catch(error => {
      const errorMessage = `${error.name}: ${error.message}`;
      console.error(errorMessage);
    });
    passage.chapters.push(ch);
  }
  return passage as Passage;
}
