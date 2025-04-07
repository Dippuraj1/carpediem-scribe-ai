
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BookFormatOptions } from "@/types/book";
import { defaultFormatOptions } from "@/utils/formatOptions";
import { applyFormatting } from "@/utils/formatHelpers";

interface UseFormatManagerProps {
  content: string;
  onFormatComplete: (formattedContent: string) => void;
}

export const useFormatManager = ({ content, onFormatComplete }: UseFormatManagerProps) => {
  const { toast } = useToast();
  const [formatOptions, setFormatOptions] = useState<BookFormatOptions>(defaultFormatOptions);
  const [isFormatted, setIsFormatted] = useState(false);
  
  const handleFormatBook = () => {
    try {
      // Apply formatting to the content
      const formattedContent = applyFormatting(content, formatOptions);
      setIsFormatted(true);
      onFormatComplete(formattedContent);
      
      toast({
        title: "Book Formatted",
        description: "Your book has been formatted and is ready for download.",
      });
    } catch (error) {
      console.error("Error formatting book:", error);
      toast({
        title: "Formatting Error",
        description: "An error occurred while formatting your book.",
        variant: "destructive",
      });
    }
  };

  const updateFormatOption = (key: keyof BookFormatOptions, value: any) => {
    setFormatOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return { formatOptions, isFormatted, handleFormatBook, updateFormatOption };
};
