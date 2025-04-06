
import { useToast } from "@/hooks/use-toast";
import { BookFormatOptions } from "@/types/book";
import { exportToDocx, exportToPdf, exportToGoogleDocs } from "@/utils/exporters";

interface ExportManagerProps {
  content: string;
  formattedContent: string;
  isFormatted: boolean;
  formatOptions: BookFormatOptions;
}

const ExportManager = ({ content, formattedContent, isFormatted, formatOptions }: ExportManagerProps) => {
  const { toast } = useToast();

  const handleDownloadDocx = async (title: string) => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToDocx(isFormatted ? formattedContent : content, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Download Started",
        description: "Your DOCX file is being downloaded.",
      });
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Failed to download DOCX file.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPdf = async (title: string) => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToPdf(isFormatted ? formattedContent : content, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Download Started",
        description: "Your PDF file is being downloaded.",
      });
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Failed to download PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleExportToGoogleDocs = async (title: string) => {
    if (!isFormatted) {
      toast({
        title: "Format Required",
        description: "Please format your book before exporting.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await exportToGoogleDocs(isFormatted ? formattedContent : content, title || "book", formatOptions);
    
    if (result.success) {
      toast({
        title: "Google Docs Export",
        description: "Your book has been exported to Google Docs. Check your browser for a new tab.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: result.error || "Failed to export to Google Docs.",
        variant: "destructive",
      });
    }
  };

  return { handleDownloadDocx, handleDownloadPdf, handleExportToGoogleDocs };
};

export default ExportManager;
