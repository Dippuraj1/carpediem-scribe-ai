
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Save } from "lucide-react";

interface EditorHeaderProps {
  isEditing: boolean;
  onCopy: () => void;
  onRevert: () => void;
  onSave: () => void;
}

const EditorHeader = ({ isEditing, onCopy, onRevert, onSave }: EditorHeaderProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onCopy}
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
            onClick={onRevert}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Revert
          </Button>
          <Button 
            size="sm"
            onClick={onSave}
            className="flex items-center gap-1 bg-carpediem-primary hover:bg-carpediem-primary/90"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </>
      )}
    </div>
  );
};

export default EditorHeader;
