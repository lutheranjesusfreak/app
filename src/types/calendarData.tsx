export interface CalendarData {
  date?: string,
  season?: Season,
  primary_color?: string,
  primary_evening_color?: string,
  primary_feast?: string,
  primary_evening_feast?: string,
  major_feast?: string,
  major_or_minor_feast?: string,
  error?: string
};

export interface Season {
  name: string,
  colors: string[]
};
