
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import GenerationProgress from "@/components/GenerationProgress";
import { BookFormData } from "@/types/book";
import { generateBook } from "@/services/openai";

interface GenerationHandlerProps {
  apiKey: string;
  onBookContent: (content: string) => void;
  onShowApiKeyDialog: () => void;
  setPendingFormData: (data: BookFormData | null) => void;
}

const GenerationHandler = ({
  apiKey,
  onBookContent,
  onShowApiKeyDialog,
  setPendingFormData,
}: GenerationHandlerProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Add progress simulation when generating
  useEffect(() => {
    let progressInterval: number | null = null;
    
    if (isGenerating) {
      setGenerationProgress(0);
      
      progressInterval = window.setInterval(() => {
        setGenerationProgress(prev => {
          // Cap at 95% until actual completion
          const newProgress = Math.min(prev + (Math.random() * 5), 95);
          return Number(newProgress.toFixed(0));
        });
      }, 800);
    } else if (generationProgress > 0) {
      // When generation completes, move to 100%
      setGenerationProgress(100);
      
      // Reset progress after a delay
      const resetTimeout = setTimeout(() => {
        setGenerationProgress(0);
      }, 1000);
      
      return () => clearTimeout(resetTimeout);
    }
    
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isGenerating]);

  const handleFormSubmit = async (formData: BookFormData) => {
    if (!apiKey) {
      setPendingFormData(formData);
      onShowApiKeyDialog();
      return;
    }

    proceedWithBookGeneration(formData);
  };

  const proceedWithBookGeneration = async (formData: BookFormData) => {
    setIsGenerating(true);

    try {
      const result = await generateBook({
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        style: formData.style,
        tone: formData.tone,
        audience: formData.audience,
        chapterCount: formData.chapterCount,
        maxWordsPerChapter: formData.maxWordsPerChapter,
        authorNotes: formData.authorNotes,
      }, apiKey);

      if (result.error) {
        toast({
          title: "Error Generating Book",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      if (result.content) {
        onBookContent(result.content);
        
        saveBookToDraft(result.content, formData.title);

        toast({
          title: "Book Generated Successfully",
          description: "Your book has been generated and is ready to preview and edit.",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred while generating your book.",
        variant: "destructive",
      });
      console.error("Error generating book:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveBookToDraft = (content: string, title?: string) => {
    const { title: parsedTitle } = JSON.parse(localStorage.getItem("book_draft") || "{}");
    localStorage.setItem(
      "book_draft",
      JSON.stringify({
        content: content,
        timestamp: new Date().toISOString(),
        title: title || parsedTitle || "Untitled Book",
      })
    );
  };

  return (
    <>
      <GenerationProgress isGenerating={isGenerating} progress={generationProgress} />
      {handleFormSubmit}
    </>
  );
};

export { GenerationHandler, type GenerationHandlerProps };
export default GenerationHandler;
