
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Book, FileText, Download, FileCheck, Edit } from "lucide-react";
import { exportToDocx, exportToPdf, exportToGoogleDocs, defaultFormatOptions } from "@/utils/exporters";
import { calculateBookStats, parseBookContent } from "@/utils/formatters";
import BookEditor from "@/components/BookEditor";
import { BookFormatOptions } from "@/types/book";

interface BookPreviewProps {
  bookContent: string;
  onReset: () => void;
  onContentUpdate?: (content: string) => void;
}

const BookPreview = ({ bookContent, onReset, onContentUpdate }: BookPreviewProps) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [currentContent, setCurrentContent] = useState(bookContent);
  const [formatOptions, setFormatOptions] = useState<BookFormatOptions>(defaultFormatOptions);
  
  const { title } = parseBookContent(currentContent);
  const { wordCount, chapterCount, estimatedReadingTime } = calculateBookStats(currentContent);

  const handleContentUpdate = (updatedContent: string) => {
    setCurrentContent(updatedContent);
    if (onContentUpdate) {
      onContentUpdate(updatedContent);
    }
  };

  const handleFormatOptionsUpdate = (options: BookFormatOptions) => {
    setFormatOptions(options);
  };

  const handleDownloadDocx = async () => {
    await exportToDocx(currentContent, title || "book", formatOptions);
  };

  const handleDownloadPdf = async () => {
    await exportToPdf(currentContent, title || "book", formatOptions);
  };

  const handleExportToGoogleDocs = async () => {
    await exportToGoogleDocs(currentContent, title || "book", formatOptions);
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Book Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline" className="flex gap-1 items-center py-1">
                <Book className="h-4 w-4" />
                <span>{wordCount} words</span>
              </Badge>
              <Badge variant="outline" className="flex gap-1 items-center py-1">
                <FileText className="h-4 w-4" />
                <span>{chapterCount} chapters</span>
              </Badge>
              <Badge variant="outline" className="flex gap-1 items-center py-1">
                <Clock className="h-4 w-4" />
                <span>{estimatedReadingTime} min read</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
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
          <Card className="w-full">
            <CardContent className="p-6">
              <div 
                className="book-content whitespace-pre-line"
                style={{ 
                  maxHeight: "600px", 
                  overflowY: "auto",
                  fontFamily: formatOptions.fontFamily,
                  fontSize: formatOptions.fontSize,
                  lineHeight: formatOptions.lineSpacing
                }}
              >
                {currentContent}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="mt-0">
          <BookEditor 
            bookContent={currentContent} 
            onUpdateContent={handleContentUpdate} 
          />
        </TabsContent>
        
        <TabsContent value="export" className="mt-0">
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Download Options</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your book will be formatted according to professional publishing standards. 
                  You can customize the formatting options in the Edit tab.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <FileCheck className="h-8 w-8 text-carpediem-primary" />
                      <h4 className="font-medium">Microsoft Word (.docx)</h4>
                      <p className="text-sm text-muted-foreground">
                        Download as a fully formatted Word document
                      </p>
                      <Button 
                        onClick={handleDownloadDocx}
                        className="mt-2 bg-carpediem-primary hover:bg-carpediem-primary/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download DOCX
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <FileCheck className="h-8 w-8 text-carpediem-primary" />
                      <h4 className="font-medium">PDF Document (.pdf)</h4>
                      <p className="text-sm text-muted-foreground">
                        Download as a formatted PDF document
                      </p>
                      <Button 
                        onClick={handleDownloadPdf}
                        className="mt-2 bg-carpediem-primary hover:bg-carpediem-primary/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Cloud Options</h3>
                  <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <FileCheck className="h-8 w-8 text-carpediem-primary" />
                      <h4 className="font-medium">Google Docs</h4>
                      <p className="text-sm text-muted-foreground">
                        Export directly to Google Docs for collaborative editing
                      </p>
                      <Button 
                        onClick={handleExportToGoogleDocs}
                        variant="outline"
                        className="mt-2"
                      >
                        Export to Google Docs
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookPreview;
