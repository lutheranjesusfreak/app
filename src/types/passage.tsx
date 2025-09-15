export interface Passage {
  label: string,
  chapters: Chapter[],
  optional: boolean
};

export interface Chapter {
  chapter: number,
  verses: Verse[]
};

export interface Verse {
  pk: number,
  verse: number,
  text: string,
  comment?: string
};
