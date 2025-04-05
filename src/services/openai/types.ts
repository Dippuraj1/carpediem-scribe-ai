
export interface BookParams {
  title: string;
  description: string;
  genre: string[];
  style: string[];
  tone: string[];
  audience: string;
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes?: string;
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
