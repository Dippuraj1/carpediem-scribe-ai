
import { BookFormatOptions } from '../../types/book';
import { defaultFormatOptions } from '../formatOptions';
import { applyFormatting } from '../formatHelpers';
import { getSavePath, ensureDirectoryExists } from '../exportUtils';

// Export book to PDF with proper formatting
export const exportToPdf = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to PDF with formatting options:', options);
    
    // Format the content for PDF
    const formattedContent = applyFormatting(content, options);
    
    // Ensure the directory exists
    const saveDir = getSavePath();
    const directoryExists = ensureDirectoryExists(saveDir);
    
    if (directoryExists) {
      console.log(`Preparing to save PDF file to: ${saveDir}\\${filename}.pdf`);
    }
    
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
          .save-info {
            position: fixed;
            top: 70px;
            right: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }
          @media print {
            .print-button, .save-info {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Save as PDF</button>
        <div class="save-info">
          <p>Saving to: ${saveDir}\\${filename}.pdf</p>
        </div>
        ${formattedContent}
        <script>
          // Instructions alert
          window.onload = function() {
            alert("To save as PDF, click the 'Save as PDF' button or use your browser's print function (Ctrl+P or Cmd+P) and select 'Save as PDF' as the destination. Your file will be saved to ${saveDir}\\${filename}.pdf");
          };
        </script>
      </body>
      </html>
    `;
    
    // Save information about the download
    try {
      localStorage.setItem("last_export", JSON.stringify({
        type: "pdf",
        title: filename,
        date: new Date().toISOString(),
        path: `${saveDir}\\${filename}.pdf`
      }));
    } catch (error) {
      console.error("Error saving export information:", error);
    }
    
    // Create a HTML blob
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    
    // Open the HTML in a new tab for printing to PDF
    const url = URL.createObjectURL(htmlBlob);
    window.open(url, '_blank');
    
    return { 
      success: true, 
      message: `A new tab has opened with your book. Use the "Save as PDF" button or your browser's print function to save as PDF to ${saveDir}\\${filename}.pdf.` 
    };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { 
      success: false, 
      error: 'Failed to export to PDF. Please try again.' 
    };
  }
};
