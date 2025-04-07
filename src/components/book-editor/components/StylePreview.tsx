
import { Card } from "@/components/ui/card";
import { BookFormatOptions } from "@/types/book";

interface StylePreviewProps {
  formatOptions: BookFormatOptions;
}

const StylePreview = ({ formatOptions }: StylePreviewProps) => {
  return (
    <div className="mt-6 col-span-1 md:col-span-2">
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
  );
};

export default StylePreview;
