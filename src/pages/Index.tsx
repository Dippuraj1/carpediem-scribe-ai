
import { useState, useEffect } from "react";
import BookForm, { BookFormData } from "@/components/BookForm";
import BookPreview from "@/components/BookPreview";
import AppHeader from "@/components/AppHeader";
import Intro from "@/components/Intro";
import { generateBook } from "@/services/openai";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [bookContent, setBookContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
    }
  }, [apiKey]);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  const handleFormSubmit = async (formData: BookFormData) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key in Settings.",
        variant: "destructive",
      });
      return;
    }

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
        
        // Save to localStorage as a draft
        localStorage.setItem(
          "book_draft",
          JSON.stringify({
            content: result.content,
            timestamp: new Date().toISOString(),
            title: formData.title,
          })
        );

        toast({
          title: "Book Generated Successfully",
          description: "Your book has been generated and is ready to preview.",
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
          <BookPreview bookContent={bookContent} onReset={handleReset} />
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
    </div>
  );
};

export default Index;
