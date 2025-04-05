
export interface BookFormatOptions {
  fontFamily: string;
  fontSize: string;
  titleSize: string;
  subheadingSize: string;
  lineSpacing: number;
  textColor: string;
  paragraphIndent: string;
  paragraphSpacing: string;
  margins: string;
  pageSize: 'A4' | 'Letter';
  alignBody: 'justify' | 'left';
  startChaptersNewPage: boolean;
  chapterHeadingStyle: 'centered' | 'left-aligned';
  includeTableOfContents: boolean;
  includeTitlePage: boolean;
}

export interface BookStats {
  wordCount: number;
  chapterCount: number;
  averageWordsPerChapter: number;
  estimatedReadingTime: number;
}

export interface ParsedBook {
  title: string;
  tableOfContents: string[];
  chapters: {
    number: number;
    title: string;
    content: string;
  }[];
}

export interface BookFormData {
  title: string;
  description: string;
  genre: string[];
  subGenre: string[];
  style: string[];
  tone: string[];
  audience: string;
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes: string;
}
