
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookFormatOptions } from "@/types/book";
import { defaultFormatOptions } from "@/utils/exporters";

// Import the smaller components
import ContentTab from "./ContentTab";
import FormatOptionsTab from "./FormatOptionsTab";
import EditorHeader from "./EditorHeader";
import EditorFooter from "./EditorFooter";

interface BookEditorProps {
  bookContent: string;
  onUpdateContent: (content: string) => void;
}

const BookEditor = ({ bookContent, onUpdateContent }: BookEditorProps) => {
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState(bookContent);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [formatOptions, setFormatOptions] = useState<BookFormatOptions>(defaultFormatOptions);

  // Update local state when parent content changes
  useEffect(() => {
    if (!isEditing) {
      setEditedContent(bookContent);
    }
  }, [bookContent, isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateContent(editedContent);
    toast({
      title: "Content Saved",
      description: "Your edits have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleRevert = () => {
    setEditedContent(bookContent);
    setIsEditing(false);
    toast({
      title: "Changes Reverted",
      description: "Your edits have been reverted to the original content.",
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Book content has been copied to your clipboard.",
    });
  };

  const updateFormatOption = (key: keyof BookFormatOptions, value: any) => {
    setFormatOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTabToggle = () => {
    setActiveTab(activeTab === "content" ? "formatting" : "content");
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Book Editor</span>
          <EditorHeader 
            isEditing={isEditing}
            onCopy={handleCopyToClipboard}
            onRevert={handleRevert}
            onSave={handleSave}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="content">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="formatting">
              <Settings className="h-4 w-4 mr-2" />
              Formatting Options
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-0">
            <ContentTab 
              content={editedContent}
              onChange={handleTextChange}
            />
          </TabsContent>
          
          <TabsContent value="formatting" className="mt-0">
            <FormatOptionsTab 
              formatOptions={formatOptions}
              onUpdateFormatOption={updateFormatOption}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <EditorFooter 
          activeTab={activeTab}
          isEditing={isEditing}
          onTabToggle={handleTabToggle}
          onSave={handleSave}
        />
      </CardFooter>
    </Card>
  );
};

export default BookEditor;
