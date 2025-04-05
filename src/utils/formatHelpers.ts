
import { BookFormatOptions } from '../types/book';
import { parseBookContent } from './formatters';

// Format chapter content with additional styling for dialogue, etc.
export const formatChapterContent = (content: string, options: BookFormatOptions) => {
  // Replace newlines with paragraph tags
  let formatted = content.replace(/\n\n/g, '</p><p>');
  
  // Format dialogue (text between quotation marks)
  formatted = formatted.replace(/"([^"]+)"/g, '<span class="dialogue">"$1"</span>');
  
  // Format thoughts (text between asterisks)
  formatted = formatted.replace(/\*([^*]+)\*/g, '<i>$1</i>');
  
  // Format section breaks
  formatted = formatted.replace(/\*\*\*/g, '<hr class="section-break" style="width: 20%; margin: 2rem auto;">');
  
  // Wrap in paragraph tags if not already done
  if (!formatted.startsWith('<p>')) {
    formatted = `<p>${formatted}</p>`;
  }
  
  return formatted;
};

// Apply formatting to book content based on options
export const applyFormatting = (content: string, options: BookFormatOptions) => {
  const { title, tableOfContents, chapters } = parseBookContent(content);
  
  // Create title page HTML
  const titlePageHTML = options.includeTitlePage ? 
    `<div class="title-page" style="text-align: center; margin-top: 30%;">
      <h1 style="font-size: ${options.titleSize}; font-weight: bold; margin-bottom: 2rem;">${title}</h1>
      <p class="author" style="margin-top: 4rem; font-style: italic;">Author Name</p>
    </div>
    <div style="page-break-after: always;"></div>` : '';
  
  // Create table of contents HTML
  let tocHTML = '';
  if (options.includeTableOfContents) {
    tocHTML = `<div class="table-of-contents">
      <h2 style="font-size: ${options.subheadingSize}; font-weight: bold; text-align: center; margin-bottom: 2rem;">Table of Contents</h2>
      <ul style="list-style-type: none; padding-left: 0;">`;
    
    chapters.forEach((chapter, index) => {
      tocHTML += `<li style="margin-bottom: 0.5rem;">
        <span class="chapter-number">Chapter ${chapter.number}: </span>
        <span class="chapter-title">${chapter.title}</span>
        <span class="page-number" style="float: right;">Page ${index + 1}</span>
      </li>`;
    });
    
    tocHTML += `</ul></div>
    <div style="page-break-after: always;"></div>`;
  }
  
  // Format chapters
  let chaptersHTML = '';
  chapters.forEach(chapter => {
    const chapterHeadingAlign = options.chapterHeadingStyle === 'centered' ? 'center' : 'left';
    
    chaptersHTML += `<div class="chapter">
      <h2 style="font-size: ${options.titleSize}; font-weight: bold; text-align: ${chapterHeadingAlign}; margin-bottom: 2rem;">
        Chapter ${chapter.number}: ${chapter.title}
      </h2>
      <div class="chapter-content" style="
        font-family: ${options.fontFamily};
        font-size: ${options.fontSize};
        line-height: ${options.lineSpacing};
        color: ${options.textColor};
        text-align: ${options.alignBody};
        text-indent: ${options.paragraphIndent};
      ">
        ${formatChapterContent(chapter.content, options)}
      </div>
    </div>`;
    
    // Add page break after chapter if specified
    if (options.startChaptersNewPage) {
      chaptersHTML += `<div style="page-break-after: always;"></div>`;
    }
  });
  
  // Combine all sections into a complete HTML document
  const completeHTML = `
    <html>
    <head>
      <style>
        @page {
          size: ${options.pageSize};
          margin: ${options.margins};
        }
        body {
          font-family: ${options.fontFamily};
          font-size: ${options.fontSize};
          line-height: ${options.lineSpacing};
          color: ${options.textColor};
        }
        p {
          margin-bottom: ${options.paragraphSpacing};
          text-indent: ${options.paragraphIndent};
        }
        .dialogue {
          margin-bottom: ${options.paragraphSpacing};
          text-indent: ${options.paragraphIndent};
        }
      </style>
    </head>
    <body>
      ${titlePageHTML}
      ${tocHTML}
      ${chaptersHTML}
    </body>
    </html>
  `;
  
  return completeHTML;
};
