
export interface BookParams {
  title: string;
  description: string;
  genre: string[];
  subGenre: string[];
  style: string[];
  tone: string[];
  audience: string;
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes?: string;
  bookType?: string;
  language?: string;
  bookDimensions?: string;
  inspiration?: string;
  targetWordCount?: number;
  additionalNotes?: string;
}

export interface OpenAIResponse {
  content: string;
  error?: string;
}

export interface APIErrorResponse {
  error?: {
    message: string;
    type?: string;
    code?: string;
  };
}
