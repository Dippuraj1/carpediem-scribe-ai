
import TypographyOptions from "./components/TypographyOptions";
import LayoutOptions from "./components/LayoutOptions";
import StylePreview from "./components/StylePreview";
import { BookFormatOptions } from "@/types/book";

interface FormatOptionsTabProps {
  formatOptions: BookFormatOptions;
  onUpdateFormatOption: (key: keyof BookFormatOptions, value: any) => void;
}

const FormatOptionsTab = ({ formatOptions, onUpdateFormatOption }: FormatOptionsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TypographyOptions 
        formatOptions={formatOptions} 
        onUpdateFormatOption={onUpdateFormatOption} 
      />
      
      <LayoutOptions 
        formatOptions={formatOptions} 
        onUpdateFormatOption={onUpdateFormatOption} 
      />

      <StylePreview formatOptions={formatOptions} />
    </div>
  );
};

export default FormatOptionsTab;
