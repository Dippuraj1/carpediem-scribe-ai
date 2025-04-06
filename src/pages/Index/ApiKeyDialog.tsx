
import React from "react";
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

interface ApiKeyDialogProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  showDialog: boolean;
  onShowDialogChange: (show: boolean) => void;
  onSubmit: () => void;
}

const ApiKeyDialog = ({
  apiKey,
  onApiKeyChange,
  showDialog,
  onShowDialogChange,
  onSubmit,
}: ApiKeyDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Key Required</DialogTitle>
          <DialogDescription>
            To generate your book, please provide your OpenAI API key. Your key is stored
            locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onShowDialogChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-carpediem-primary hover:bg-carpediem-primary/90">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
