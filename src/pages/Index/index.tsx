
import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { BookFormData } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import ContentView from "./ContentView";
import ApiKeyDialog from "./ApiKeyDialog";
import { GenerationHandler } from "./GenerationHandler";

const Index = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [bookContent, setBookContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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
      generationHandler.proceedWithBookGeneration(pendingFormData);
      setPendingFormData(null);
    }
  };

  const generationHandler = {
    proceedWithBookGeneration: async (formData: BookFormData) => {
      setIsGenerating(true);
      try {
        // This is a placeholder. The actual implementation is in GenerationHandler component
        // The GenerationHandler component will call this function
      } finally {
        setIsGenerating(false);
      }
    }
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
          onFormSubmit={(formData) => {
            if (!apiKey) {
              setPendingFormData(formData);
              setShowApiKeyDialog(true);
              return;
            }
            generationHandler.proceedWithBookGeneration(formData);
          }}
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

      {/* This component is rendered but its UI is conditionally shown based on isGenerating */}
      <GenerationHandler 
        apiKey={apiKey}
        onBookContent={setBookContent}
        onShowApiKeyDialog={() => setShowApiKeyDialog(true)}
        setPendingFormData={setPendingFormData}
      />
    </div>
  );
};

export default Index;
