
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
          {isGenerating ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Book...
            </div>
          ) : (
            "Generate Book"
          )}
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
