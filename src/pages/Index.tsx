
import { useState, useEffect } from "react";
import BookForm from "@/components/BookForm";
import { BookFormData } from "@/types/book";
import BookPreview from "@/components/BookPreview";
import AppHeader from "@/components/AppHeader";
import Intro from "@/components/Intro";
import { generateBook } from "@/services/openai";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApiKeyInput from "@/components/ApiKeyInput";
import GenerationProgress from "@/components/GenerationProgress";

const Index = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [bookContent, setBookContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<BookFormData | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
    }
  }, [apiKey]);

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

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_api_key", apiKey);
    
    setShowApiKeyDialog(false);
    
    if (pendingFormData) {
      proceedWithBookGeneration(pendingFormData);
      setPendingFormData(null);
    }
  };

  const handleFormSubmit = async (formData: BookFormData) => {
    if (!apiKey) {
      setPendingFormData(formData);
      setShowApiKeyDialog(true);
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
        setBookContent(result.content);
        
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

  const handleContentUpdate = (updatedContent: string) => {
    setBookContent(updatedContent);
    saveBookToDraft(updatedContent);
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

  const handleReset = () => {
    setBookContent("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-carpediem-background">
      <AppHeader apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />

      <main className="flex-1 container py-6">
        {showIntro && !bookContent ? (
          <Intro onGetStarted={() => setShowIntro(false)} />
        ) : bookContent ? (
          <BookPreview 
            bookContent={bookContent} 
            onReset={handleReset} 
            onContentUpdate={handleContentUpdate}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Your Book
            </h2>
            <BookForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
          </div>
        )}
      </main>

      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-carpediem-secondary">
          <p>
            Carpediem - AI-Powered Book Writing Assistant - &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OpenAI API Key Required</DialogTitle>
            <DialogDescription>
              To generate your book, please provide your OpenAI API key. Your key is stored
              locally and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApiKeySubmit} className="bg-carpediem-primary hover:bg-carpediem-primary/90">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <GenerationProgress isGenerating={isGenerating} progress={generationProgress} />
    </div>
  );
};

export default Index;
