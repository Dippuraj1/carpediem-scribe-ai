
// Format the raw book content into HTML
export const formatBookToHTML = (content: string): string => {
  if (!content) return '';
  
  // Replace newlines with <br> tags
  let formattedContent = content.replace(/\n/g, '<br>');
  
  // Format chapter headings
  formattedContent = formattedContent.replace(
    /Chapter (\d+): ([^\n<]+)/g,
    '<h1>Chapter $1: $2</h1>'
  );
  
  // Format book title
  formattedContent = formattedContent.replace(
    /Book Title: ([^\n<]+)/g,
    '<h1 class="text-3xl font-bold mb-6">$1</h1>'
  );
  
  // Format Table of Contents heading
  formattedContent = formattedContent.replace(
    /Table of Contents/g,
    '<h2 class="text-2xl font-semibold mt-4 mb-3">Table of Contents</h2>'
  );
  
  return formattedContent;
};

// Parse the book content into a structured format
export const parseBookContent = (content: string) => {
  if (!content) {
    return {
      title: '',
      tableOfContents: [],
      chapters: []
    };
  }
  
  // Extract the book title
  const titleMatch = content.match(/Book Title: ([^\n]+)/);
  const title = titleMatch ? titleMatch[1] : 'Untitled Book';
  
  // Extract the table of contents
  const tocStartIndex = content.indexOf('Table of Contents');
  const tocEndIndex = content.indexOf('Chapter 1:');
  
  let tableOfContents: string[] = [];
  
  if (tocStartIndex !== -1 && tocEndIndex !== -1) {
    const tocContent = content.substring(tocStartIndex + 'Table of Contents'.length, tocEndIndex);
    tableOfContents = tocContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim());
  }
  
  // Extract the chapters
  const chapterRegex = /Chapter (\d+): ([^\n]+)([^]*?)(?=Chapter \d+:|$)/g;
  const chapters: { number: number; title: string; content: string }[] = [];
  
  let match;
  while ((match = chapterRegex.exec(content)) !== null) {
    const chapterNumber = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const chapterContent = match[3].trim();
    
    chapters.push({
      number: chapterNumber,
      title: chapterTitle,
      content: chapterContent
    });
  }
  
  return {
    title,
    tableOfContents,
    chapters
  };
};

// Calculate statistics about the book
export const calculateBookStats = (content: string) => {
  if (!content) {
    return {
      wordCount: 0,
      chapterCount: 0,
      averageWordsPerChapter: 0,
      estimatedReadingTime: 0
    };
  }
  
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  
  const chapterMatches = content.match(/Chapter \d+:/g);
  const chapterCount = chapterMatches ? chapterMatches.length : 0;
  
  const averageWordsPerChapter = chapterCount > 0 ? Math.round(wordCount / chapterCount) : 0;
  
  // Average adult reading speed is ~250 words per minute
  const estimatedReadingTime = Math.ceil(wordCount / 250);
  
  return {
    wordCount,
    chapterCount,
    averageWordsPerChapter,
    estimatedReadingTime
  };
};

// Get word count for specific text
export const countWords = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};
