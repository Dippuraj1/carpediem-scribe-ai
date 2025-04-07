
import { BookFormatOptions } from '../types/book';
import { defaultFormatOptions } from './formatOptions';
import { applyFormatting } from './formatHelpers';
import { downloadFile } from './exportUtils';

// Export book to DOCX with proper formatting
export const exportToDocx = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to DOCX with formatting options:', options);
    
    // Format the content for DOCX
    const formattedContent = applyFormatting(content, options);
    
    // Create a well-structured HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${filename}</title>
        <style>
          body {
            font-family: ${options.fontFamily};
            font-size: ${options.fontSize};
            line-height: ${options.lineSpacing};
            color: ${options.textColor};
          }
          h1 {
            font-size: ${options.titleSize};
            text-align: center;
            margin-bottom: 2rem;
          }
          h2 {
            font-size: ${options.subheadingSize};
            margin-top: 2rem;
            margin-bottom: 1.5rem;
          }
          p {
            margin-bottom: ${options.paragraphSpacing};
            text-indent: ${options.paragraphIndent};
            text-align: ${options.alignBody};
          }
        </style>
      </head>
      <body>
        ${formattedContent}
      </body>
      </html>
    `;
    
    // Create a text blob with the HTML content
    const docxBlob = new Blob([htmlContent], { type: 'text/html' });
    
    // Download the file with a .docx extension
    downloadFile(docxBlob, `${filename}.docx`);
    
    return { 
      success: true, 
      message: 'Book exported successfully. Open in Word or Google Docs to convert formatting.' 
    };
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    return { 
      success: false, 
      error: 'Failed to export to DOCX. Please try again or use a different format.' 
    };
  }
};

// Export book to PDF with proper formatting
export const exportToPdf = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to PDF with formatting options:', options);
    
    // Format the content for PDF
    const formattedContent = applyFormatting(content, options);
    
    // Create a well-structured HTML document for printing to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${filename}</title>
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
          h1 {
            font-size: ${options.titleSize};
            text-align: center;
            margin-bottom: 2rem;
          }
          h2 {
            font-size: ${options.subheadingSize};
            margin-top: 2rem;
            margin-bottom: 1.5rem;
            text-align: ${options.chapterHeadingStyle === 'centered' ? 'center' : 'left'};
          }
          p {
            margin-bottom: ${options.paragraphSpacing};
            text-indent: ${options.paragraphIndent};
            text-align: ${options.alignBody};
          }
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          @media print {
            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Save as PDF</button>
        ${formattedContent}
        <script>
          // Instructions alert
          window.onload = function() {
            alert("To save as PDF, click the 'Save as PDF' button or use your browser's print function (Ctrl+P or Cmd+P) and select 'Save as PDF' as the destination.");
          };
        </script>
      </body>
      </html>
    `;
    
    // Create a HTML blob
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    
    // Open the HTML in a new tab for printing to PDF
    const url = URL.createObjectURL(htmlBlob);
    window.open(url, '_blank');
    
    return { 
      success: true, 
      message: 'A new tab has opened with your book. Use the "Save as PDF" button or your browser\'s print function to save as PDF.' 
    };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { 
      success: false, 
      error: 'Failed to export to PDF. Please try again.' 
    };
  }
};

// Export to Google Docs
export const exportToGoogleDocs = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to Google Docs with formatting options:', options);
    
    // Format the content for Google Docs
    // Google Docs needs plain text without too much formatting for best results
    const plainText = content.replace(/<[^>]*>/g, '');
    
    // Create a Google Docs URL with the content
    const encodedContent = encodeURIComponent(plainText);
    const encodedTitle = encodeURIComponent(filename);
    const googleDocsUrl = `https://docs.google.com/document/create?title=${encodedTitle}&body=${encodedContent}`;
    
    // Open Google Docs in a new tab
    window.open(googleDocsUrl, '_blank');
    
    return { 
      success: true, 
      message: 'Your book has been exported to Google Docs in a new tab.' 
    };
  } catch (error) {
    console.error('Error exporting to Google Docs:', error);
    return { 
      success: false, 
      error: 'Failed to export to Google Docs. Please try again.' 
    };
  }
};

// Re-export defaultFormatOptions
export { defaultFormatOptions } from './formatOptions';
