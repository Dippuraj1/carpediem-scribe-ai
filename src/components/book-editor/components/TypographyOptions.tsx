
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookFormatOptions } from "@/types/book";

interface TypographyOptionsProps {
  formatOptions: BookFormatOptions;
  onUpdateFormatOption: (key: keyof BookFormatOptions, value: any) => void;
}

const TypographyOptions = ({ formatOptions, onUpdateFormatOption }: TypographyOptionsProps) => {
  return (
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
  );
};

export default TypographyOptions;
