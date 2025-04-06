
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BookFormatOptions } from "@/types/book";
import { defaultFormatOptions } from "@/utils/exporters";

interface FormatManagerProps {
  content: string;
  onFormatComplete: (formattedContent: string) => void;
}

const FormatManager = ({ content, onFormatComplete }: FormatManagerProps) => {
  const { toast } = useToast();
  const [formatOptions] = useState<BookFormatOptions>(defaultFormatOptions);
  const [isFormatted, setIsFormatted] = useState(false);
  
  const handleFormatBook = () => {
    try {
      // In a real implementation, this would apply all formatting rules
      setIsFormatted(true);
      onFormatComplete(content);
      
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

  return { formatOptions, isFormatted, handleFormatBook };
};

export default FormatManager;
