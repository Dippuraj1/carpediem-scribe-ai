
import { Textarea } from "@/components/ui/textarea";

interface ContentTabProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentTab = ({ content, onChange }: ContentTabProps) => {
  return (
    <>
      <Textarea
        value={content}
        onChange={onChange}
        className="min-h-[400px] font-mono text-sm"
        placeholder="Your book content will appear here for editing..."
      />
      <p className="text-xs text-muted-foreground mt-2">
        Edit your book content above. Click 'Save' when you're done to apply your changes.
      </p>
    </>
  );
};

export default ContentTab;
