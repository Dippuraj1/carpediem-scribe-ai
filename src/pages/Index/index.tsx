
import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { BookFormData } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import ContentView from "./ContentView";
import ApiKeyDialog from "./ApiKeyDialog";
import GenerationHandler from "./GenerationHandler";

const Index = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [bookContent, setBookContent] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<BookFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
  };

  const handleFormSubmit = (formData: BookFormData) => {
    if (!apiKey) {
      setPendingFormData(formData);
      setShowApiKeyDialog(true);
      return;
    }
    
    // If we have an API key, proceed with generation
    setPendingFormData(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-carpediem-background">
      <AppHeader apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />

      <main className="flex-1 container py-6">
        <ContentView 
          showIntro={showIntro}
          bookContent={bookContent}
          isGenerating={isGenerating}
          onShowIntroChange={setShowIntro}
          onBookContentChange={setBookContent}
          onFormSubmit={handleFormSubmit}
        />
      </main>

      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-carpediem-secondary">
          <p>
            Carpediem - AI-Powered Book Writing Assistant - &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <ApiKeyDialog 
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        showDialog={showApiKeyDialog}
        onShowDialogChange={setShowApiKeyDialog}
        onSubmit={handleApiKeySubmit}
      />

      <GenerationHandler 
        apiKey={apiKey}
        onBookContent={setBookContent}
        onShowApiKeyDialog={() => setShowApiKeyDialog(true)}
        setPendingFormData={setPendingFormData}
        pendingFormData={pendingFormData}
      />
    </div>
  );
};

export default Index;
