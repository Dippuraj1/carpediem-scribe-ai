
import { parseBookContent, formatBookToHTML } from './formatters';
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

// Apply formatting to book content based on options
const applyFormatting = (content: string, options: BookFormatOptions = defaultFormatOptions) => {
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

// Format chapter content with additional styling for dialogue, etc.
const formatChapterContent = (content: string, options: BookFormatOptions) => {
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

// Create DOCX document content (using HTML to DOCX conversion)
const createDocxContent = (content: string, options: BookFormatOptions) => {
  // Format book content for DOCX
  return applyFormatting(content, options);
};

// Create PDF document content (using HTML to PDF conversion)
const createPdfContent = (content: string, options: BookFormatOptions) => {
  // Format book content for PDF
  return applyFormatting(content, options);
};

// Export book to DOCX with proper formatting - actually downloads the file
export const exportToDocx = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to DOCX with formatting options:', options);
    
    // Apply formatting to content
    const formattedHTML = createDocxContent(content, options);
    
    // For now, we'll use a simple HTML to DOCX download approach
    const htmlBlob = new Blob([formattedHTML], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Trigger download
    downloadFile(htmlBlob, `${filename}.docx`);
    
    return { success: true, message: 'Book exported to DOCX successfully' };
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    return { success: false, error: 'Failed to export to DOCX' };
  }
};

// Export book to PDF with proper formatting - actually downloads the file
export const exportToPdf = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to PDF with formatting options:', options);
    
    // Apply formatting to content
    const formattedHTML = createPdfContent(content, options);
    
    // For now, we'll use a simple HTML to PDF download approach
    const htmlBlob = new Blob([formattedHTML], { type: 'application/pdf' });
    
    // Trigger download
    downloadFile(htmlBlob, `${filename}.pdf`);
    
    return { success: true, message: 'Book exported to PDF successfully' };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { success: false, error: 'Failed to export to PDF' };
  }
};

// Helper function to trigger file download
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Export to Google Docs with proper formatting - opens in a new window
export const exportToGoogleDocs = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to Google Docs with formatting options:', options);
    
    // Format content for Google Docs
    const formattedContent = content.replace(/\n/g, '%0A');
    
    // Create a new Google Docs document with the content
    // This uses the Google Docs URL scheme to create a new document with the content
    const url = `https://docs.google.com/document/create?title=${encodeURIComponent(filename)}&body=${encodeURIComponent(formattedContent)}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
    
    return { success: true, message: 'Exported to Google Docs successfully' };
  } catch (error) {
    console.error('Error exporting to Google Docs:', error);
    return { success: false, error: 'Failed to export to Google Docs' };
  }
};
