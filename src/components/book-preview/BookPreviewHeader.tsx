
import { Button } from "@/components/ui/button";

interface BookPreviewHeaderProps {
  onReset: () => void;
}

const BookPreviewHeader = ({ onReset }: BookPreviewHeaderProps) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-carpediem-text">Book Preview</h2>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default BookPreviewHeader;
