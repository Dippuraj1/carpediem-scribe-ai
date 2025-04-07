
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookFormatOptions } from "@/types/book";

interface LayoutOptionsProps {
  formatOptions: BookFormatOptions;
  onUpdateFormatOption: (key: keyof BookFormatOptions, value: any) => void;
}

const LayoutOptions = ({ formatOptions, onUpdateFormatOption }: LayoutOptionsProps) => {
  return (
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
  );
};

export default LayoutOptions;
