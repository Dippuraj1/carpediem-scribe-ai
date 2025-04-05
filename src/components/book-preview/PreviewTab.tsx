
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { BookFormatOptions } from "@/types/book";

interface PreviewTabProps {
  content: string;
  formatOptions: BookFormatOptions;
}

const PreviewTab = ({ content, formatOptions }: PreviewTabProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <ScrollArea className="h-[600px] w-full pr-4">
          <div 
            className="book-content whitespace-pre-line"
            style={{ 
              fontFamily: formatOptions.fontFamily,
              fontSize: formatOptions.fontSize,
              lineHeight: formatOptions.lineSpacing
            }}
          >
            {content}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PreviewTab;
