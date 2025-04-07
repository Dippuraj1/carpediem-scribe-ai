import { BookFormatOptions } from '../types/book';
import { defaultFormatOptions } from './formatOptions';
import { applyFormatting } from './formatHelpers';
import { downloadFile, ensureDirectoryExists, getSavePath } from './exportUtils';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageOrientation } from 'docx';
import { parseBookContent } from './formatters';

// Export book to DOCX with proper formatting
export const exportToDocx = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to DOCX with formatting options:', options);
    
    // Parse the book content
    const { title, chapters } = parseBookContent(content);
    
    // Create a new document
    const doc = new Document({
      title: filename,
      styles: {
        paragraphStyles: [
          {
            id: 'Normal',
            name: 'Normal',
            run: {
              font: options.fontFamily.split(',')[0].replace(/"/g, ''),
              size: parseInt(options.fontSize) * 2, // Convert pt to twip (rough estimate)
              color: options.textColor
            },
            paragraph: {
              spacing: {
                line: parseInt(String(options.lineSpacing * 240)) // Convert to line spacing in twip
              }
            }
          },
          {
            id: 'Heading1',
            name: 'Heading 1',
            basedOn: 'Normal',
            run: {
              size: parseInt(options.titleSize) * 2,
              bold: true
            },
            paragraph: {
              alignment: options.chapterHeadingStyle === 'centered' ? AlignmentType.CENTER : AlignmentType.LEFT
            }
          }
        ]
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: options.margins,
              right: options.margins,
              bottom: options.margins,
              left: options.margins
            },
            size: getPageSizeDimensions(options.pageSize)
          }
        },
        children: []
      }]
    });

    // Add title page if needed
    if (options.includeTitlePage) {
      const titleSection = doc.sections[0];
      
      titleSection.children.push(
        new Paragraph({
          text: title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: {
            before: 3500, // Add space before title (roughly 30% down the page)
            after: 800
          }
        }),
        new Paragraph({
          text: "Author Name", // Placeholder for author
          alignment: AlignmentType.CENTER,
          spacing: {
            before: 400
          }
        })
      );
      
      // Add page break after title page
      titleSection.children.push(
        new Paragraph({
          text: "",
          pageBreakBefore: true
        })
      );
    }

    // Add table of contents if needed
    if (options.includeTableOfContents) {
      const tocSection = doc.sections[0];
      
      tocSection.children.push(
        new Paragraph({
          text: "Table of Contents",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400
          }
        })
      );
      
      // Add chapters to TOC
      chapters.forEach((chapter, index) => {
        tocSection.children.push(
          new Paragraph({
            text: `Chapter ${chapter.number}: ${chapter.title}`,
            alignment: AlignmentType.LEFT,
            spacing: {
              after: 200
            }
          })
        );
      });
      
      // Add page break after TOC
      tocSection.children.push(
        new Paragraph({
          text: "",
          pageBreakBefore: true
        })
      );
    }

    // Add chapters
    chapters.forEach((chapter, index) => {
      const chapterSection = doc.sections[0];
      
      // Add chapter heading
      chapterSection.children.push(
        new Paragraph({
          text: `Chapter ${chapter.number}: ${chapter.title}`,
          heading: HeadingLevel.HEADING_1,
          alignment: options.chapterHeadingStyle === 'centered' ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: {
            after: 400
          }
        })
      );
      
      // Process chapter content
      const paragraphs = chapter.content.split('\n\n');
      paragraphs.forEach(para => {
        if (para.trim()) {
          const alignment = options.alignBody === 'justify' ? AlignmentType.JUSTIFIED : AlignmentType.LEFT;
          
          // Handle dialogue (text in quotes)
          if (para.includes('"')) {
            const paragraph = new Paragraph({
              alignment,
              spacing: { after: parseInt(options.paragraphSpacing) * 20 },
              indent: { firstLine: parseInt(options.paragraphIndent) * 20 }
            });
            
            // Split by quotes to identify dialogue
            let inQuotes = false;
            let currentText = '';
            
            for (let i = 0; i < para.length; i++) {
              if (para[i] === '"') {
                // Add accumulated text with appropriate styling
                if (currentText) {
                  paragraph.addChildElement(new TextRun({
                    text: currentText,
                    italics: inQuotes
                  }));
                  currentText = '';
                }
                
                // Add the quote mark
                paragraph.addChildElement(new TextRun({ text: '"' }));
                inQuotes = !inQuotes;
              } else {
                currentText += para[i];
              }
            }
            
            // Add any remaining text
            if (currentText) {
              paragraph.addChildElement(new TextRun({
                text: currentText,
                italics: inQuotes
              }));
            }
            
            chapterSection.children.push(paragraph);
          } else {
            // Regular paragraph
            chapterSection.children.push(
              new Paragraph({
                text: para,
                alignment,
                spacing: { after: parseInt(options.paragraphSpacing) * 20 },
                indent: { firstLine: parseInt(options.paragraphIndent) * 20 }
              })
            );
          }
        }
      });
      
      // Add page break after chapter if specified
      if (options.startChaptersNewPage && index < chapters.length - 1) {
        chapterSection.children.push(
          new Paragraph({
            text: "",
            pageBreakBefore: true
          })
        );
      }
    });

    // Create a blob from the docx
    const buffer = await Packer.toBuffer(doc);
    const docxBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Try to save to the specified directory
    const saveDir = getSavePath();
    const directoryExists = ensureDirectoryExists(saveDir);
    
    if (directoryExists) {
      console.log(`Saving file to: ${saveDir}\\${filename}.docx`);
    }
    
    // Download the file with a .docx extension
    downloadFile(docxBlob, `${filename}.docx`);
    
    // Save information about the download
    try {
      localStorage.setItem("last_export", JSON.stringify({
        type: "docx",
        title: filename,
        date: new Date().toISOString(),
        path: `${saveDir}\\${filename}.docx`
      }));
    } catch (error) {
      console.error("Error saving export information:", error);
    }
    
    return { 
      success: true, 
      message: `Book exported successfully to "${saveDir}\\${filename}.docx".` 
    };
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    return { 
      success: false, 
      error: 'Failed to export to DOCX. Please try again or use a different format.' 
    };
  }
};

// Helper function to get page dimensions from page size string
function getPageSizeDimensions(pageSize: string) {
  switch (pageSize) {
    case 'A4':
      return { width: 11906, height: 16838 }; // Width: 210mm, Height: 297mm
    case 'Letter':
      return { width: 12240, height: 15840 }; // Width: 8.5in, Height: 11in
    case 'A5':
      return { width: 8419, height: 11906 }; // Width: 148mm, Height: 210mm
    case 'B5':
      return { width: 9978, height: 14170 }; // Width: 176mm, Height: 250mm
    case 'Pocket':
      return { width: 6120, height: 9900 }; // Width: 4.25in, Height: 6.87in
    case 'Digest':
      return { width: 7920, height: 12240 }; // Width: 5.5in, Height: 8.5in
    case 'Trade':
      return { width: 8640, height: 12960 }; // Width: 6in, Height: 9in
    case 'Royal':
      return { width: 8842, height: 13262 }; // Width: 6.14in, Height: 9.21in
    case 'Crown':
      return { width: 10800, height: 14760 }; // Width: 7.5in, Height: 10.25in
    default:
      return { width: 12240, height: 15840 }; // Default to Letter
  }
}

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
    
    // Save information about the export
    try {
      localStorage.setItem("last_export", JSON.stringify({
        type: "google_docs",
        title: filename,
        date: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error saving export information:", error);
    }
    
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
