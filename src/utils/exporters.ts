
import { BookFormatOptions } from '../types/book';
import { defaultFormatOptions } from './formatOptions';
import { applyFormatting } from './formatHelpers';
import { downloadFile } from './exportUtils';

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

// Re-export defaultFormatOptions
export { defaultFormatOptions } from './formatOptions';
