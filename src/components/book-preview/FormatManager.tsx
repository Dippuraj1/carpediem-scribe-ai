
import { BookFormatOptions } from "@/types/book";
import { useFormatManager } from "@/hooks/useFormatManager";

interface FormatManagerProps {
  content: string;
  onFormatComplete: (formattedContent: string) => void;
}

const FormatManager = ({ content, onFormatComplete }: FormatManagerProps) => {
  const formatManager = useFormatManager({ content, onFormatComplete });
  return formatManager;
};

export default FormatManager;
