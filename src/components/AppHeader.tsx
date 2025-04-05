
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pen, Settings, Info, Github, MessageSquare } from "lucide-react";
import ApiKeyInput from "@/components/ApiKeyInput";

interface AppHeaderProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const AppHeader = ({ apiKey, onApiKeyChange }: AppHeaderProps) => {
  return (
    <header className="w-full py-4 border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Pen className="h-6 w-6 text-carpediem-primary" />
          <h1 className="text-2xl font-bold text-carpediem-text">
            Carpediem
          </h1>
          <span className="text-xs bg-carpediem-accent/20 text-carpediem-accent rounded-full px-2 py-0.5">
            Beta
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Configure your Carpediem app settings
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="api">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="api">API Settings</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
                <TabsContent value="api" className="py-4">
                  <ApiKeyInput
                    apiKey={apiKey}
                    onApiKeyChange={onApiKeyChange}
                  />
                </TabsContent>
                <TabsContent value="about" className="py-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">About Carpediem</h3>
                    <p className="text-sm text-muted-foreground">
                      Carpediem is an AI-powered book writing assistant that
                      helps you create well-structured books with ease.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-sm font-semibold">Version 1.0.0</p>
                      <span className="text-xs bg-carpediem-accent/20 text-carpediem-accent rounded-full px-2 py-0.5">
                        Beta
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="text-lg font-medium">Resources</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href="https://github.com/yourusername/carpediem"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub Repository
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Documentation
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Privacy Policy
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
