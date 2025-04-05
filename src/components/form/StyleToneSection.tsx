
import React from "react";
import FormSection from "./FormSection";
import TagSelector from "./TagSelector";

interface StyleToneSectionProps {
  genre: string[];
  subGenre: string[];
  style: string[];
  tone: string[];
  genreCategories: { label: string; options: string[] }[];
  styleOptions: string[];
  toneOptions: string[];
  onAddTag: (tag: string, field: "genre" | "subGenre" | "style" | "tone") => void;
  onRemoveTag: (tag: string, field: "genre" | "subGenre" | "style" | "tone") => void;
}

const StyleToneSection = ({
  genre,
  subGenre,
  style,
  tone,
  genreCategories,
  styleOptions,
  toneOptions,
  onAddTag,
  onRemoveTag,
}: StyleToneSectionProps) => {
  return (
    <FormSection
      title="Style & Tone"
      description="Define the creative direction of your book"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genre and Sub-Genre Row */}
        <TagSelector
          label="Genre(s)"
          tags={genre}
          options={genreCategories}
          onAddTag={(value) => onAddTag(value, "genre")}
          onRemoveTag={(value) => onRemoveTag(value, "genre")}
          placeholder="Select genre"
        />

        <TagSelector
          label="Sub-Genre(s)"
          tags={subGenre}
          options={genreCategories}
          onAddTag={(value) => onAddTag(value, "subGenre")}
          onRemoveTag={(value) => onRemoveTag(value, "subGenre")}
          placeholder="Select sub-genre"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Writing Style and Tone Row */}
        <TagSelector
          label="Writing Style(s)"
          tags={style}
          options={styleOptions}
          onAddTag={(value) => onAddTag(value, "style")}
          onRemoveTag={(value) => onRemoveTag(value, "style")}
          placeholder="Select style"
        />

        <TagSelector
          label="Tone(s)"
          tags={tone}
          options={toneOptions}
          onAddTag={(value) => onAddTag(value, "tone")}
          onRemoveTag={(value) => onRemoveTag(value, "tone")}
          placeholder="Select tone"
        />
      </div>
    </FormSection>
  );
};

export default StyleToneSection;
