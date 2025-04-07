
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import BookEditor from "@/components/book-editor/BookEditor";
import PreviewTab from "@/components/book-preview/PreviewTab";
import ExportTab from "@/components/book-preview/ExportTab";
import FormatBookButton from "@/components/book-preview/FormatBookButton";
import { BookFormatOptions } from "@/types/book";

interface TabsManagerProps {
  content: string;
  formatOptions: BookFormatOptions;
  isFormatted: boolean;
  onContentUpdate: (updatedContent: string) => void;
  onFormatBook: () => void;
  onUpdateFormatOption: (key: keyof BookFormatOptions, value: any) => void;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  onExportToGoogleDocs: () => void;
}

const TabsManager = ({
  content,
  formatOptions,
  isFormatted,
  onContentUpdate,
  onFormatBook,
  onUpdateFormatOption,
  onDownloadDocx,
  onDownloadPdf,
  onExportToGoogleDocs,
}: TabsManagerProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  return (
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
        <PreviewTab content={content} formatOptions={formatOptions} />
      </TabsContent>
      
      <TabsContent value="editor" className="mt-0">
        <BookEditor 
          bookContent={content} 
          onUpdateContent={onContentUpdate}
          formatOptions={formatOptions}
          onUpdateFormatOption={onUpdateFormatOption} 
        />
        
        <div className="flex justify-center mt-4">
          <FormatBookButton isFormatted={isFormatted} onFormatBook={onFormatBook} />
        </div>
      </TabsContent>
      
      <TabsContent value="export" className="mt-0">
        <ExportTab 
          isFormatted={isFormatted}
          onDownloadDocx={onDownloadDocx}
          onDownloadPdf={onDownloadPdf}
          onExportToGoogleDocs={onExportToGoogleDocs}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsManager;
