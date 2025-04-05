
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookFormatOptions } from "@/types/book";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormatOptionsTabProps {
  formatOptions: BookFormatOptions;
  onUpdateFormatOption: (key: keyof BookFormatOptions, value: any) => void;
}

const FormatOptionsTab = ({ formatOptions, onUpdateFormatOption }: FormatOptionsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Typography</h3>
        
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select 
            value={formatOptions.fontFamily}
            onValueChange={(value) => onUpdateFormatOption('fontFamily', value)}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                <SelectItem value='Georgia, "Times New Roman", serif'>Georgia</SelectItem>
                <SelectItem value='Garamond, "Times New Roman", serif'>Garamond</SelectItem>
                <SelectItem value='"Times New Roman", serif'>Times New Roman</SelectItem>
                <SelectItem value='"Palatino Linotype", "Book Antiqua", Palatino, serif'>Palatino</SelectItem>
                <SelectItem value='"Bookman Old Style", serif'>Bookman</SelectItem>
                <SelectItem value='"Baskerville", serif'>Baskerville</SelectItem>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontSize">Body Font Size</Label>
          <Select 
            value={formatOptions.fontSize}
            onValueChange={(value) => onUpdateFormatOption('fontSize', value)}
          >
            <SelectTrigger id="fontSize">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                <SelectItem value="10pt">10pt</SelectItem>
                <SelectItem value="11pt">11pt</SelectItem>
                <SelectItem value="12pt">12pt</SelectItem>
                <SelectItem value="13pt">13pt</SelectItem>
                <SelectItem value="14pt">14pt</SelectItem>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lineSpacing">Line Spacing</Label>
          <Select 
            value={formatOptions.lineSpacing.toString()}
            onValueChange={(value) => onUpdateFormatOption('lineSpacing', parseFloat(value))}
          >
            <SelectTrigger id="lineSpacing">
              <SelectValue placeholder="Select line spacing" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                <SelectItem value="1">Single</SelectItem>
                <SelectItem value="1.15">1.15</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">Double</SelectItem>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Layout</h3>
        
        <div className="space-y-2">
          <Label htmlFor="pageSize">Page Size</Label>
          <Select 
            value={formatOptions.pageSize}
            onValueChange={(value: any) => onUpdateFormatOption('pageSize', value)}
          >
            <SelectTrigger id="pageSize">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                <SelectItem value="Letter">US Letter (8.5 × 11 in)</SelectItem>
                <SelectItem value="A5">A5 (148 × 210 mm)</SelectItem>
                <SelectItem value="B5">B5 (176 × 250 mm)</SelectItem>
                <SelectItem value="Pocket">Pocket (4.25 × 6.87 in)</SelectItem>
                <SelectItem value="Digest">Digest (5.5 × 8.5 in)</SelectItem>
                <SelectItem value="Trade">Trade (6 × 9 in)</SelectItem>
                <SelectItem value="Royal">Royal (6.14 × 9.21 in)</SelectItem>
                <SelectItem value="Crown">Crown (7.5 × 10.25 in)</SelectItem>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="margins">Margins</Label>
          <Select 
            value={formatOptions.margins}
            onValueChange={(value) => onUpdateFormatOption('margins', value)}
          >
            <SelectTrigger id="margins">
              <SelectValue placeholder="Select margins" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                <SelectItem value="0.75in">Narrow (0.75 inch)</SelectItem>
                <SelectItem value="1in">Normal (1 inch)</SelectItem>
                <SelectItem value="1.25in">Wide (1.25 inch)</SelectItem>
                <SelectItem value="1.5in">Very Wide (1.5 inch)</SelectItem>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="startChaptersNewPage"
            checked={formatOptions.startChaptersNewPage}
            onCheckedChange={(checked) => onUpdateFormatOption('startChaptersNewPage', checked)}
          />
          <Label htmlFor="startChaptersNewPage">Start chapters on new page</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="includeTableOfContents"
            checked={formatOptions.includeTableOfContents}
            onCheckedChange={(checked) => onUpdateFormatOption('includeTableOfContents', checked)}
          />
          <Label htmlFor="includeTableOfContents">Include table of contents</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="includeTitlePage"
            checked={formatOptions.includeTitlePage}
            onCheckedChange={(checked) => onUpdateFormatOption('includeTitlePage', checked)}
          />
          <Label htmlFor="includeTitlePage">Include title page</Label>
        </div>
      </div>

      <StylePreview formatOptions={formatOptions} />
    </div>
  );
};

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

export default FormatOptionsTab;
