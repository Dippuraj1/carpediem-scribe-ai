
import { Book, Clock, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookStatsProps {
  wordCount: number;
  chapterCount: number;
  estimatedReadingTime: number;
  isFormatted: boolean;
}

const BookStats = ({ wordCount, chapterCount, estimatedReadingTime, isFormatted }: BookStatsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Book Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Badge variant="outline" className="flex gap-1 items-center py-1">
            <Book className="h-4 w-4" />
            <span>{wordCount} words</span>
          </Badge>
          <Badge variant="outline" className="flex gap-1 items-center py-1">
            <FileText className="h-4 w-4" />
            <span>{chapterCount} chapters</span>
          </Badge>
          <Badge variant="outline" className="flex gap-1 items-center py-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedReadingTime} min read</span>
          </Badge>
          {isFormatted && (
            <Badge variant="outline" className="flex gap-1 items-center py-1 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-700">Formatted</span>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookStats;
