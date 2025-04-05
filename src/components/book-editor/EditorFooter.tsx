
import { Button } from "@/components/ui/button";
import { FileText, Save, Settings } from "lucide-react";

interface EditorFooterProps {
  activeTab: string;
  isEditing: boolean;
  onTabToggle: () => void;
  onSave: () => void;
}

const EditorFooter = ({ activeTab, isEditing, onTabToggle, onSave }: EditorFooterProps) => {
  return (
    <div className="flex justify-between pt-0">
      <Button 
        variant="outline" 
        className="flex items-center gap-1"
        onClick={onTabToggle}
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
          onClick={onSave}
          className="flex items-center gap-1 bg-carpediem-primary hover:bg-carpediem-primary/90"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default EditorFooter;
