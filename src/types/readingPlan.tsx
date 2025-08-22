export interface ReadingPlan {
  season?: string,
  data?: Reading[],
  error?: string
};

export interface Reading {
  date: string,
  scripture: Scripture[]
};

export interface Scripture {
  label: string,
  book: number,
  chapters: number[],
  verses: number[][],
  optional: boolean
}
