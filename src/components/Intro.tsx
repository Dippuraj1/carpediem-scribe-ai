
import { ArrowRight, BookOpen, PencilLine, Save, Award, Sparkles } from "lucide-react";
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
          <span className="text-carpediem-primary">Bestseller</span> Book Architect
        </h1>
        <p className="text-xl md:text-2xl text-carpediem-secondary">
          Create a high-value, market-ready book manuscript in minutes with AI-powered writing technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <PencilLine className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">Define Your Bestseller</h3>
            <p className="text-muted-foreground">
              Specify your book's genre, style, structure, and bestseller elements with our intuitive form.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Drafting</h3>
            <p className="text-muted-foreground">
              Our AI analyzes bestselling book patterns to create a complete, market-ready manuscript with proper structure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="bg-carpediem-primary/10 p-3 rounded-full">
              <Award className="h-8 w-8 text-carpediem-primary" />
            </div>
            <h3 className="text-xl font-semibold">Market-Ready Output</h3>
            <p className="text-muted-foreground">
              Get a completely formatted book with proven narrative structure, ready for publishing or further editing.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-carpediem-primary/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">What You'll Get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-carpediem-primary flex-shrink-0 mt-1" />
            <p>Complete manuscript with proper chapter structure</p>
          </div>
          <div className="flex items-start space-x-3">
            <PencilLine className="h-5 w-5 text-carpediem-primary flex-shrink-0 mt-1" />
            <p>Engaging characters and plot development</p>
          </div>
          <div className="flex items-start space-x-3">
            <Save className="h-5 w-5 text-carpediem-primary flex-shrink-0 mt-1" />
            <p>Export options for further editing or publishing</p>
          </div>
          <div className="flex items-start space-x-3">
            <Award className="h-5 w-5 text-carpediem-primary flex-shrink-0 mt-1" />
            <p>Built-in bestseller narrative techniques</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Button 
          onClick={onGetStarted} 
          className="bg-carpediem-primary hover:bg-carpediem-primary/90 text-white px-8 py-6 rounded-lg text-lg flex items-center gap-2"
        >
          Start Creating Your Bestseller
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
