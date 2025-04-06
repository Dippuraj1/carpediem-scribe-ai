
import { Download, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ExportTabProps {
  isFormatted: boolean;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  onExportToGoogleDocs: () => void;
}

const ExportTab = ({ 
  isFormatted, 
  onDownloadDocx, 
  onDownloadPdf, 
  onExportToGoogleDocs 
}: ExportTabProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Download Options</h3>
          
          {!isFormatted && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <p className="text-sm text-yellow-800">
                Please format your book in the Edit tab before downloading. This ensures all formatting options are applied correctly.
              </p>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground mb-4">
            Your book will be formatted according to professional publishing standards. 
            You can customize the formatting options in the Edit tab.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileCheck className="h-8 w-8 text-carpediem-primary" />
                <h4 className="font-medium">Microsoft Word (.docx)</h4>
                <p className="text-sm text-muted-foreground">
                  Download as formatted text file with .docx extension
                </p>
                <Button 
                  onClick={onDownloadDocx}
                  className="mt-2 bg-carpediem-primary hover:bg-carpediem-primary/90"
                  disabled={!isFormatted}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download DOCX
                </Button>
              </div>
            </Card>
            
            <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileCheck className="h-8 w-8 text-carpediem-primary" />
                <h4 className="font-medium">HTML File (.html)</h4>
                <p className="text-sm text-muted-foreground">
                  Download as HTML file (can be printed to PDF)
                </p>
                <Button 
                  onClick={onDownloadPdf}
                  className="mt-2 bg-carpediem-primary hover:bg-carpediem-primary/90"
                  disabled={!isFormatted}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Cloud Options</h3>
            <Card className="border border-muted p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileCheck className="h-8 w-8 text-carpediem-primary" />
                <h4 className="font-medium">Google Docs</h4>
                <p className="text-sm text-muted-foreground">
                  Export directly to Google Docs for collaborative editing
                </p>
                <Button 
                  onClick={onExportToGoogleDocs}
                  variant="outline"
                  className="mt-2"
                  disabled={!isFormatted}
                >
                  Export to Google Docs
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportTab;
