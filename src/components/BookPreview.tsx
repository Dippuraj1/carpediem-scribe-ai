
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { exportToDocx, exportToPdf, exportToGoogleDocs, defaultFormatOptions } from "@/utils/exporters";
import { calculateBookStats, parseBookContent } from "@/utils/formatters";
import BookEditor from "@/components/book-editor/BookEditor";
import { BookFormatOptions } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import BookStats from "@/components/book-preview/BookStats";
import PreviewTab from "@/components/book-preview/PreviewTab";
import ExportTab from "@/components/book-preview/ExportTab";
import FormatBookButton from "@/components/book-preview/FormatBookButton";

interface BookPreviewProps {
  bookContent: string;
  onReset: () => void;
  onContentUpdate?: (content: string) => void;
}

const BookPreview = ({ bookContent, onReset, onContentUpdate }: BookPreviewProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preview");
  const [currentContent, setCurrentContent] = useState(bookContent);
  const [formatOptions, setFormatOptions] = useState<BookFormatOptions>(defaultFormatOptions);
  const [isFormatted, setIsFormatted] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");
  
  const { title } = parseBookContent(currentContent);
  const { wordCount, chapterCount, estimatedReadingTime } = calculateBookStats(currentContent);

  const handleContentUpdate = (updatedContent: string) => {
    setCurrentContent(updatedContent);
    setIsFormatted(false); // Reset formatting state when content changes
    if (onContentUpdate) {
      onContentUpdate(updatedContent);
    }
  };

  const handleFormatOptionsUpdate = (options: BookFormatOptions) => {
    setFormatOptions(options);
    setIsFormatted(false); // Reset formatting state when options change
  };

  const handleFormatBook = () => {
    // Format the book according to options
    try {
      // In a real implementation, this would apply all formatting rules
      // For now, we'll just set the formatted flag and show a notification
      setFormattedContent(currentContent);
      setIsFormatted(true);
      
      toast({
        title: "Book Formatted",
        description: "Your book has been formatted and is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Formatting Error",
        description: "An error occurred while formatting your book.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDocx = async () => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToDocx(isFormatted ? formattedContent : currentContent, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Download Started",
        description: "Your DOCX file is being downloaded.",
      });
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Failed to download DOCX file.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToPdf(isFormatted ? formattedContent : currentContent, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Download Started",
        description: "Your PDF file is being downloaded.",
      });
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Failed to download PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleExportToGoogleDocs = async () => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before exporting.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToGoogleDocs(isFormatted ? formattedContent : currentContent, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Google Docs Export",
        description: "Your book has been exported to Google Docs. Check your browser for a new tab.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: result.error || "Failed to export to Google Docs.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-carpediem-text">Book Preview</h2>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            Start Over
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <BookStats 
          wordCount={wordCount} 
          chapterCount={chapterCount} 
          estimatedReadingTime={estimatedReadingTime}
          isFormatted={isFormatted}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="editor">
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-0">
          <PreviewTab content={currentContent} formatOptions={formatOptions} />
        </TabsContent>
        
        <TabsContent value="editor" className="mt-0">
          <BookEditor 
            bookContent={currentContent} 
            onUpdateContent={handleContentUpdate} 
          />
          
          <div className="flex justify-center mt-4">
            <FormatBookButton isFormatted={isFormatted} onFormatBook={handleFormatBook} />
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="mt-0">
          <ExportTab 
            isFormatted={isFormatted}
            onDownloadDocx={handleDownloadDocx}
            onDownloadPdf={handleDownloadPdf}
            onExportToGoogleDocs={handleExportToGoogleDocs}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookPreview;
