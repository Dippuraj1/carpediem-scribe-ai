
import { useState } from "react";
import { calculateBookStats, parseBookContent } from "@/utils/formatters";
import BookStats from "@/components/book-preview/BookStats";
import BookPreviewHeader from "@/components/book-preview/BookPreviewHeader";
import TabsManager from "@/components/book-preview/TabsManager";
import FormatManager from "@/components/book-preview/FormatManager";
import ExportManager from "@/components/book-preview/ExportManager";

interface BookPreviewProps {
  bookContent: string;
  onReset: () => void;
  onContentUpdate?: (content: string) => void;
}

const BookPreview = ({ bookContent, onReset, onContentUpdate }: BookPreviewProps) => {
  const [currentContent, setCurrentContent] = useState(bookContent);
  const [formattedContent, setFormattedContent] = useState("");
  
  const { title } = parseBookContent(currentContent);
  const { wordCount, chapterCount, estimatedReadingTime } = calculateBookStats(currentContent);

  const handleContentUpdate = (updatedContent: string) => {
    setCurrentContent(updatedContent);
    if (onContentUpdate) {
      onContentUpdate(updatedContent);
    }
  };

  // Use our format manager
  const formatManager = FormatManager({
    content: currentContent,
    onFormatComplete: setFormattedContent
  });

  // Use our export manager
  const exportManager = ExportManager({
    content: currentContent,
    formattedContent,
    isFormatted: formatManager.isFormatted,
    formatOptions: formatManager.formatOptions
  });

  return (
    <div className="w-full">
      <BookPreviewHeader onReset={onReset} />

      <div className="grid grid-cols-1 gap-4 mb-4">
        <BookStats 
          wordCount={wordCount} 
          chapterCount={chapterCount} 
          estimatedReadingTime={estimatedReadingTime}
          isFormatted={formatManager.isFormatted}
        />
      </div>
      
      <TabsManager 
        content={currentContent}
        formatOptions={formatManager.formatOptions}
        isFormatted={formatManager.isFormatted}
        onContentUpdate={handleContentUpdate}
        onFormatBook={formatManager.handleFormatBook}
        onDownloadDocx={() => exportManager.handleDownloadDocx(title)}
        onDownloadPdf={() => exportManager.handleDownloadPdf(title)}
        onExportToGoogleDocs={() => exportManager.handleExportToGoogleDocs(title)}
      />
    </div>
  );
};

export default BookPreview;
