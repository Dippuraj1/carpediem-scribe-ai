
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { BookFormatOptions } from "@/types/book";
import { useState, useEffect } from "react";
import { parseBookContent, formatBookToHTML } from "@/utils/formatters";

interface PreviewTabProps {
  content: string;
  formatOptions: BookFormatOptions;
}

const PreviewTab = ({ content, formatOptions }: PreviewTabProps) => {
  const [formattedHtml, setFormattedHtml] = useState("");
  const { title, chapters } = parseBookContent(content);

  useEffect(() => {
    // Format the content as HTML for preview
    const html = formatBookToHTML(content);
    setFormattedHtml(html);
  }, [content]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4 pb-4 border-b">
          <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
          {chapters.length > 0 && (
            <p className="text-center text-muted-foreground">
              {chapters.length} chapters • Preview Mode
            </p>
          )}
        </div>

        <ScrollArea className="h-[600px] w-full pr-4">
          <div 
            className="book-content"
            style={{ 
              fontFamily: formatOptions.fontFamily,
              fontSize: formatOptions.fontSize,
              lineHeight: formatOptions.lineSpacing,
              textAlign: formatOptions.alignBody === 'justify' ? 'justify' : 'left'
            }}
            dangerouslySetInnerHTML={{ __html: formattedHtml }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PreviewTab;
