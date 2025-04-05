
import { useState } from "react";
import { genreCategories, styleOptions, toneOptions } from "@/data/genreOptions";
import BookDetailsSection from "./form/BookDetailsSection";
import StyleToneSection from "./form/StyleToneSection";
import BookStructureSection from "./form/BookStructureSection";
import { BookFormData } from "@/types/book";

// Book form props interface
interface BookFormProps {
  onSubmit: (params: BookFormData) => void;
  isGenerating: boolean;
}

// Default form values
const defaultFormData: BookFormData = {
  title: "",
  description: "",
  genre: ["Fantasy"],
  subGenre: [],
  style: ["Descriptive"],
  tone: ["Optimistic"],
  audience: "Young Adults",
  chapterCount: 5,
  maxWordsPerChapter: 2000,
  authorNotes: "",
};

const BookForm = ({ onSubmit, isGenerating }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>(defaultFormData);

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding and removing tags
  const addTag = (tag: string, field: "genre" | "subGenre" | "style" | "tone") => {
    if (tag && !formData[field].includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], tag],
      }));
    }
  };

  const removeTag = (tag: string, field: "genre" | "subGenre" | "style" | "tone") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((t) => t !== tag),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BookDetailsSection
        title={formData.title}
        description={formData.description}
        audience={formData.audience}
        onTitleChange={handleChange}
        onDescriptionChange={handleChange}
        onAudienceChange={handleChange}
      />

      <StyleToneSection
        genre={formData.genre}
        subGenre={formData.subGenre}
        style={formData.style}
        tone={formData.tone}
        genreCategories={genreCategories}
        styleOptions={styleOptions}
        toneOptions={toneOptions}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />

      <BookStructureSection
        chapterCount={formData.chapterCount}
        maxWordsPerChapter={formData.maxWordsPerChapter}
        authorNotes={formData.authorNotes}
        isGenerating={isGenerating}
        onChapterCountChange={(value) => 
          setFormData((prev) => ({ ...prev, chapterCount: value }))}
        onMaxWordsPerChapterChange={(value) => 
          setFormData((prev) => ({ ...prev, maxWordsPerChapter: value }))}
        onAuthorNotesChange={handleChange}
      />
    </form>
  );
};

export default BookForm;
