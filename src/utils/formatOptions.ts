
import { BookFormatOptions } from '../types/book';

// Default formatting options
export const defaultFormatOptions: BookFormatOptions = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '12pt',
  titleSize: '18pt',
  subheadingSize: '14pt',
  lineSpacing: 1.5,
  textColor: '#000000',
  paragraphIndent: '0.5in',
  paragraphSpacing: '12pt',
  margins: '1in',
  pageSize: 'A4',
  alignBody: 'justify',
  startChaptersNewPage: true,
  chapterHeadingStyle: 'centered',
  includeTableOfContents: true,
  includeTitlePage: true,
};
