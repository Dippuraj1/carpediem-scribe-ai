
import React from "react";
import BookForm from "@/components/BookForm";
import BookPreview from "@/components/BookPreview";
import Intro from "@/components/Intro";
import { BookFormData } from "@/types/book";

interface ContentViewProps {
  showIntro: boolean;
  bookContent: string;
  isGenerating: boolean;
  onShowIntroChange: (show: boolean) => void;
  onBookContentChange: (content: string) => void;
  onFormSubmit: (formData: BookFormData) => void;
}

const ContentView = ({
  showIntro,
  bookContent,
  isGenerating,
  onShowIntroChange,
  onBookContentChange,
  onFormSubmit,
}: ContentViewProps) => {
  const handleReset = () => {
    onBookContentChange("");
  };

  const handleContentUpdate = (updatedContent: string) => {
    onBookContentChange(updatedContent);
  };

  if (showIntro && !bookContent) {
    return <Intro onGetStarted={() => onShowIntroChange(false)} />;
  }
  
  if (bookContent) {
    return (
      <BookPreview 
        bookContent={bookContent} 
        onReset={handleReset} 
        onContentUpdate={handleContentUpdate}
      />
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Your Book
      </h2>
      <BookForm onSubmit={onFormSubmit} isGenerating={isGenerating} />
    </div>
  );
};

export default ContentView;
