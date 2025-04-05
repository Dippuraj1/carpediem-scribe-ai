
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookEditorProps {
  bookContent: string;
  onUpdateContent: (content: string) => void;
}

const BookEditor = ({ bookContent, onUpdateContent }: BookEditorProps) => {
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState(bookContent);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Book Editor</span>
          <div className="flex gap-2">
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
        <Textarea
          value={editedContent}
          onChange={handleTextChange}
          className="min-h-[400px] font-mono text-sm"
          placeholder="Your book content will appear here for editing..."
        />
        <p className="text-xs text-muted-foreground mt-2">
          Edit your book content above. Click 'Save' when you're done to apply your changes.
        </p>
      </CardContent>
    </Card>
  );
};

export default BookEditor;
