export interface CalendarData {
  date?: string,
  season?: string,
  season_week?: number,
  celebrations?: Celebration[],
  weekday?: string,
  error?: string
};

export interface Celebration {
  title: string,
  colour: string,
  rank: string,
  rank_num: number
};
