
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface GenerationProgressProps {
  isGenerating: boolean;
  progress: number;
}

const GenerationProgress = ({ isGenerating, progress }: GenerationProgressProps) => {
  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-carpediem-primary" />
          <h3 className="text-xl font-semibold">Generating Your Book</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              {progress}% complete
            </p>
          </div>
          
          <p className="text-center text-sm">
            {progress < 30 && "Crafting your narrative structure..."}
            {progress >= 30 && progress < 60 && "Developing characters and storylines..."}
            {progress >= 60 && progress < 90 && "Polishing prose and dialogue..."}
            {progress >= 90 && "Finalizing your book..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;
