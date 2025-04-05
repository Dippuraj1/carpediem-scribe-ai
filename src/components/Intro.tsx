
import { ArrowRight, BookOpen, PencilLine, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntroProps {
  onGetStarted: () => void;
}

const Intro = ({ onGetStarted }: IntroProps) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-carpediem-primary">Carpediem</span>
        </h1>
        <p className="text-xl md:text-2xl text-carpediem-secondary">
          Fall in love with writing. Let AI help you author the book you were born to write.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <PencilLine className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">Define Your Book</h3>
            <p className="text-muted-foreground">
              Specify your book's genre, style, tone, and structure with our intuitive form.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">Generate Content</h3>
            <p className="text-muted-foreground">
              Our AI creates a complete book based on your specifications with proper structure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <Save className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">Export & Edit</h3>
            <p className="text-muted-foreground">
              Download your book in various formats like DOCX or PDF for further editing.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <Button 
          onClick={onGetStarted} 
          className="bg-carpediem-primary hover:bg-carpediem-primary/90 text-white px-8 py-6 rounded-lg text-lg flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          Your data stays on your device. API calls go directly from your browser to OpenAI.
        </p>
      </div>
    </div>
  );
};

export default Intro;
