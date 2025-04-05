
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FormSection from "./FormSection";

interface BookDetailsSectionProps {
  title: string;
  description: string;
  audience: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAudienceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookDetailsSection = ({
  title,
  description,
  audience,
  onTitleChange,
  onDescriptionChange,
  onAudienceChange,
}: BookDetailsSectionProps) => {
  return (
    <FormSection
      title="Book Details"
      description="Define the basic information about your book"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter book title"
          value={title}
          onChange={onTitleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter a brief description of your book"
          value={description}
          onChange={onDescriptionChange}
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="audience">Target Audience</Label>
        <Input
          id="audience"
          name="audience"
          placeholder="Who is this book for?"
          value={audience}
          onChange={onAudienceChange}
          required
        />
      </div>
    </FormSection>
  );
};

export default BookDetailsSection;
