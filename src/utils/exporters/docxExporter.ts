
import { BookFormatOptions } from '../../types/book';
import { defaultFormatOptions } from '../formatOptions';
import { downloadFile, ensureDirectoryExists, getSavePath } from '../exportUtils';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { parseBookContent } from '../formatters';

// Export book to DOCX with proper formatting
export const exportToDocx = async (content: string, filename: string, options: BookFormatOptions = defaultFormatOptions) => {
  try {
    console.log('Exporting to DOCX with formatting options:', options);
    
    // Parse the book content
    const { title, chapters } = parseBookContent(content);
    
    // Parse the margins to valid docx format
    const parseMarginValue = (margin: string): number => {
      // Extract number from string like "1in" or "1.5in"
      const numValue = parseFloat(margin);
      // Convert to twip (1/20 of a point, 1 inch = 1440 twips)
      if (margin.includes('in')) {
        return numValue * 1440;
      } else if (margin.includes('cm')) {
        return numValue * 567; // 1 cm ≈ 567 twips
      } else if (margin.includes('mm')) {
        return numValue * 56.7; // 1 mm ≈ 56.7 twips
      } else if (margin.includes('pt')) {
        return numValue * 20; // 1 pt = 20 twips
      } else {
        // Default to inches if no unit specified
        return numValue * 1440;
      }
    };
    
    // Convert string margins to proper numeric format
    const marginValue = parseMarginValue(options.margins);
    
    // Create document content
    let documentElements: Paragraph[] = [];
    
    // Add title page if needed
    if (options.includeTitlePage) {
      documentElements.push(
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
        }),
        // Add page break after title page
        new Paragraph({
          text: "",
          pageBreakBefore: true
        })
      );
    }

    // Add table of contents if needed
    if (options.includeTableOfContents) {
      documentElements.push(
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
      chapters.forEach((chapter) => {
        documentElements.push(
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
      documentElements.push(
        new Paragraph({
          text: "",
          pageBreakBefore: true
        })
      );
    }

    // Add chapters to the document
    chapters.forEach((chapter, index) => {
      // Add chapter heading
      documentElements.push(
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
            
            documentElements.push(paragraph);
          } else {
            // Regular paragraph
            documentElements.push(
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
        documentElements.push(
          new Paragraph({
            text: "",
            pageBreakBefore: true
          })
        );
      }
    });

    // Create a new document with appropriate sections
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
              top: marginValue,
              right: marginValue,
              bottom: marginValue,
              left: marginValue
            },
            size: getPageSizeDimensions(options.pageSize)
          }
        },
        children: documentElements
      }]
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
