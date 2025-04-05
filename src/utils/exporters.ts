
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

// Export book to DOCX with proper formatting
export const exportToDocx = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to DOCX with formatting options:', options);
    
    // Apply formatting to content
    const formattedHTML = applyFormatting(content, options);
    
    // This is a placeholder for the actual DOCX generation
    // In a real implementation, you would use a library like docx.js
    alert('DOCX export with professional formatting will be available soon. Currently simulating the export.');
    
    // For demonstration, create a HTML file for download
    const blob = new Blob([formattedHTML], { type: 'text/html' });
    downloadFile(blob, `${filename}.html`);
    
    return { success: true, message: 'Book formatted for DOCX successfully' };
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    return { success: false, error: 'Failed to export to DOCX' };
  }
};

// Export book to PDF with proper formatting
export const exportToPdf = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to PDF with formatting options:', options);
    
    // Apply formatting to content
    const formattedHTML = applyFormatting(content, options);
    
    // This is a placeholder for the actual PDF generation
    // In a real implementation, you would use a library like jsPDF or pdfkit
    alert('PDF export with professional formatting will be available soon. Currently simulating the export.');
    
    // For demonstration, create a HTML file for download
    const blob = new Blob([formattedHTML], { type: 'text/html' });
    downloadFile(blob, `${filename}.html`);
    
    return { success: true, message: 'Book formatted for PDF successfully' };
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

// Export to Google Docs with proper formatting
export const exportToGoogleDocs = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Preparing for Google Docs export with formatting options:', options);
    
    // Apply formatting to content
    const formattedHTML = applyFormatting(content, options);
    
    // This is a placeholder for Google Docs export
    // In a real implementation, you would use the Google Drive API
    alert('Google Docs export with professional formatting will be available soon. For now, you can copy the formatted content and paste it into a new Google Doc.');
    
    // Copy formatted content to clipboard
    await navigator.clipboard.writeText(content);
    
    return { 
      success: false, 
      error: 'Google Docs export with formatting is under development. The raw content has been copied to your clipboard.' 
    };
  } catch (error) {
    console.error('Error preparing for Google Docs export:', error);
    return { success: false, error: 'Failed to prepare for Google Docs export' };
  }
};
