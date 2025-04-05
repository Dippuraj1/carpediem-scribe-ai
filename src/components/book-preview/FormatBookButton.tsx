
import { Button } from "@/components/ui/button";
import { CheckCircle, FileCheck } from "lucide-react";

interface FormatBookButtonProps {
  isFormatted: boolean;
  onFormatBook: () => void;
}

const FormatBookButton = ({ isFormatted, onFormatBook }: FormatBookButtonProps) => {
  return (
    <Button 
      onClick={onFormatBook}
      className="bg-carpediem-primary hover:bg-carpediem-primary/90"
      disabled={isFormatted}
    >
      {isFormatted ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Formatted
        </>
      ) : (
        <>
          <FileCheck className="mr-2 h-4 w-4" />
          Format Book for Export
        </>
      )}
    </Button>
  );
};

export default FormatBookButton;
