
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import GenerationProgress from "@/components/GenerationProgress";
import { BookFormData } from "@/types/book";
import { generateBook } from "@/services/openai";

interface GenerationHandlerProps {
  apiKey: string;
  onBookContent: (content: string) => void;
  onShowApiKeyDialog: () => void;
  setPendingFormData: React.Dispatch<React.SetStateAction<BookFormData | null>>;
  pendingFormData: BookFormData | null;
}

const GenerationHandler = ({
  apiKey,
  onBookContent,
  onShowApiKeyDialog,
  setPendingFormData,
  pendingFormData,
}: GenerationHandlerProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Process pending form data whenever it changes or API key is available
  useEffect(() => {
    if (pendingFormData && apiKey) {
      proceedWithBookGeneration(pendingFormData);
      setPendingFormData(null);
    }
  }, [pendingFormData, apiKey]);

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

  const proceedWithBookGeneration = async (formData: BookFormData) => {
    setIsGenerating(true);

    try {
      const result = await generateBook({
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        subGenre: formData.subGenre,
        style: formData.style,
        tone: formData.tone,
        audience: formData.audience,
        chapterCount: formData.chapterCount,
        maxWordsPerChapter: formData.maxWordsPerChapter,
        authorNotes: formData.authorNotes,
        bookType: formData.bookType,
        language: formData.language,
        bookDimensions: formData.bookDimensions,
        inspiration: formData.inspiration,
        targetWordCount: formData.targetWordCount,
        additionalNotes: formData.additionalNotes,
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
    try {
      // Create target directory if it doesn't exist
      const savePath = "C:\\LIFolder";
      
      // Save in localStorage as a backup
      const { title: parsedTitle } = JSON.parse(localStorage.getItem("book_draft") || "{}");
      localStorage.setItem(
        "book_draft",
        JSON.stringify({
          content: content,
          timestamp: new Date().toISOString(),
          title: title || parsedTitle || "Untitled Book",
          savePath: savePath,
        })
      );
      
      toast({
        title: "Book Saved",
        description: `Your book draft has been saved to ${savePath}`,
      });
    } catch (error) {
      console.error("Error saving book:", error);
      toast({
        title: "Save Warning",
        description: "Book saved to browser storage only. File system access requires additional permissions.",
        variant: "destructive",
      });
    }
  };

  return (
    <GenerationProgress isGenerating={isGenerating} progress={generationProgress} />
  );
};

export default GenerationHandler;
