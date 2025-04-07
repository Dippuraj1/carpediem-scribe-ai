
import { BookFormatOptions } from '../../types/book';
import { defaultFormatOptions } from '../formatOptions';

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
