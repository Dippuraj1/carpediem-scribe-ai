
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSection from "./FormSection";

interface BookStructureSectionProps {
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes: string;
  isGenerating: boolean;
  onChapterCountChange: (value: number) => void;
  onMaxWordsPerChapterChange: (value: number) => void;
  onAuthorNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BookStructureSection = ({
  chapterCount,
  maxWordsPerChapter,
  authorNotes,
  isGenerating,
  onChapterCountChange,
  onMaxWordsPerChapterChange,
  onAuthorNotesChange,
}: BookStructureSectionProps) => {
  return (
    <FormSection
      title="Structure"
      description="Define the structure and length of your book"
      footer={
        <Button
          type="submit"
          className="w-full bg-carpediem-primary hover:bg-carpediem-primary/90"
          disabled={isGenerating}
        >
          Generate Book
        </Button>
      }
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="chapterCount" className="mb-2 block">
            Number of Chapters: {chapterCount}
          </Label>
          <Slider
            id="chapterCount"
            min={1}
            max={20}
            step={1}
            value={[chapterCount]}
            onValueChange={(value) => onChapterCountChange(value[0])}
            className="py-4"
          />
        </div>

        <div>
          <Label htmlFor="maxWordsPerChapter" className="mb-2 block">
            Max Words Per Chapter: {maxWordsPerChapter}
          </Label>
          <Slider
            id="maxWordsPerChapter"
            min={500}
            max={5000}
            step={100}
            value={[maxWordsPerChapter]}
            onValueChange={(value) => onMaxWordsPerChapterChange(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="authorNotes">Notes to AI (Optional)</Label>
        <Textarea
          id="authorNotes"
          name="authorNotes"
          placeholder="Add any specific instructions or notes for the AI"
          value={authorNotes}
          onChange={onAuthorNotesChange}
          className="min-h-[100px]"
        />
      </div>
    </FormSection>
  );
};

export default BookStructureSection;
