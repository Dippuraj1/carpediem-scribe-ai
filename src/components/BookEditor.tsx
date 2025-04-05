
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, RefreshCw, Copy, Settings, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookFormatOptions } from "@/types/book";
import { defaultFormatOptions } from "@/utils/exporters";

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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Book Editor</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyToClipboard}
              className="flex items-center gap-1"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            {isEditing && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRevert}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Revert
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-carpediem-primary hover:bg-carpediem-primary/90"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </>
            )}
          </div>
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
            <Textarea
              value={editedContent}
              onChange={handleTextChange}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Your book content will appear here for editing..."
            />
            <p className="text-xs text-muted-foreground mt-2">
              Edit your book content above. Click 'Save' when you're done to apply your changes.
            </p>
          </TabsContent>
          
          <TabsContent value="formatting" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Typography</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select 
                    value={formatOptions.fontFamily}
                    onValueChange={(value) => updateFormatOption('fontFamily', value)}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Georgia, "Times New Roman", serif'>Georgia</SelectItem>
                      <SelectItem value='Garamond, "Times New Roman", serif'>Garamond</SelectItem>
                      <SelectItem value='"Times New Roman", serif'>Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Body Font Size</Label>
                  <Select 
                    value={formatOptions.fontSize}
                    onValueChange={(value) => updateFormatOption('fontSize', value)}
                  >
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11pt">11pt</SelectItem>
                      <SelectItem value="12pt">12pt</SelectItem>
                      <SelectItem value="13pt">13pt</SelectItem>
                      <SelectItem value="14pt">14pt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lineSpacing">Line Spacing</Label>
                  <Select 
                    value={formatOptions.lineSpacing.toString()}
                    onValueChange={(value) => updateFormatOption('lineSpacing', parseFloat(value))}
                  >
                    <SelectTrigger id="lineSpacing">
                      <SelectValue placeholder="Select line spacing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Single</SelectItem>
                      <SelectItem value="1.15">1.15</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="pageSize">Page Size</Label>
                  <Select 
                    value={formatOptions.pageSize}
                    onValueChange={(value) => updateFormatOption('pageSize', value)}
                  >
                    <SelectTrigger id="pageSize">
                      <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="Letter">US Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="margins">Margins</Label>
                  <Select 
                    value={formatOptions.margins}
                    onValueChange={(value) => updateFormatOption('margins', value)}
                  >
                    <SelectTrigger id="margins">
                      <SelectValue placeholder="Select margins" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.75in">Narrow (0.75 inch)</SelectItem>
                      <SelectItem value="1in">Normal (1 inch)</SelectItem>
                      <SelectItem value="1.25in">Wide (1.25 inch)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="startChaptersNewPage"
                    checked={formatOptions.startChaptersNewPage}
                    onCheckedChange={(checked) => updateFormatOption('startChaptersNewPage', checked)}
                  />
                  <Label htmlFor="startChaptersNewPage">Start chapters on new page</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="includeTableOfContents"
                    checked={formatOptions.includeTableOfContents}
                    onCheckedChange={(checked) => updateFormatOption('includeTableOfContents', checked)}
                  />
                  <Label htmlFor="includeTableOfContents">Include table of contents</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="includeTitlePage"
                    checked={formatOptions.includeTitlePage}
                    onCheckedChange={(checked) => updateFormatOption('includeTitlePage', checked)}
                  />
                  <Label htmlFor="includeTitlePage">Include title page</Label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Style Preview</h3>
              <Card className="border p-4">
                <div style={{
                  fontFamily: formatOptions.fontFamily,
                  fontSize: formatOptions.fontSize,
                  lineHeight: formatOptions.lineSpacing,
                  textAlign: formatOptions.alignBody === 'justify' ? 'justify' : 'left'
                }}>
                  <div style={{
                    fontSize: formatOptions.titleSize,
                    fontWeight: 'bold',
                    textAlign: formatOptions.chapterHeadingStyle === 'centered' ? 'center' : 'left',
                    marginBottom: '1rem'
                  }}>
                    Chapter 1: The Beginning
                  </div>
                  <p style={{
                    textIndent: formatOptions.paragraphIndent,
                    marginBottom: formatOptions.paragraphSpacing
                  }}>
                    This is an example of how your formatted text will appear with the current settings. 
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <p style={{
                    textIndent: formatOptions.paragraphIndent,
                    marginBottom: formatOptions.paragraphSpacing
                  }}>
                    "This is how dialogue will be formatted," said the character with a smile.
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setActiveTab(activeTab === "content" ? "formatting" : "content")}
        >
          {activeTab === "content" ? (
            <>
              <Settings className="h-4 w-4" />
              Show Formatting Options
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              Back to Content
            </>
          )}
        </Button>
        
        {isEditing && (
          <Button 
            onClick={handleSave}
            className="flex items-center gap-1 bg-carpediem-primary hover:bg-carpediem-primary/90"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookEditor;
