
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Eye, EyeOff } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, onApiKeyChange }: ApiKeyInputProps) => {
  const [showApiKey, setShowApiKey] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onApiKeyChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="apiKey" className="flex items-center gap-1">
          <Key className="h-4 w-4" />
          OpenAI API Key
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowApiKey(!showApiKey)}
          className="h-8 px-2"
        >
          {showApiKey ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Input
        id="apiKey"
        name="apiKey"
        type={showApiKey ? "text" : "password"}
        placeholder="sk-..."
        value={apiKey}
        onChange={handleChange}
        className="font-mono"
      />
      <p className="text-xs text-muted-foreground">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};

export default ApiKeyInput;
