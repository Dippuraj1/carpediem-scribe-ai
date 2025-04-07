import { useState } from "react";
import { BookFormData } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface BookFormProps {
  onSubmit: (params: BookFormData) => void;
  isGenerating: boolean;
}

const formSchema = z.object({
  genre: z.string().min(1, "Genre is required"),
  bookType: z.string().min(1, "Book type is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  language: z.string().min(1, "Language is required"),
  toneStyle: z.string().min(1, "Tone and style is required"),
  bookDimensions: z.string().default("6\"x9\""),
  contentGoals: z.string(),
  inspiration: z.string().optional(),
  chapterCount: z.number().min(1).max(50),
  wordCount: z.number().min(1000).max(200000),
  additionalNotes: z.string().optional(),
  title: z.string().min(1, "Title is required"),
});

const genreOptions = [
  "Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Horror", 
  "Historical Fiction", "Literary Fiction", "Young Adult", "Children's", 
  "Biography", "Memoir", "Self-Help", "Business", "Academic"
];

const bookTypeOptions = [
  "Novel", "Novella", "Short Story", "Anthology", "Guidebook", 
  "Textbook", "Memoir", "Biography", "Poetry Collection", "Cookbook"
];

const languageOptions = [
  "English-US", "English-UK", "Spanish", "French", "German", 
  "Mandarin", "Japanese", "Hindi", "Portuguese", "Arabic"
];

const toneStyleOptions = [
  "Dramatic", "Witty", "Poetic", "Academic", "Conversational",
  "Inspirational", "Suspenseful", "Humorous", "Philosophical", "Minimalist"
];

const dimensionsOptions = [
  "6\"x9\" (Standard)", "5.5\"x8.5\" (Trade)", "5\"x8\" (Digest)", 
  "8.5\"x11\" (Letter)", "4.25\"x6.87\" (Mass Market)", "7\"x10\" (Textbook)",
  "8\"x10\" (Children's)", "Kindle-ready", "A5 (International)"
];

const BookForm = ({ onSubmit, isGenerating }: BookFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genre: "",
      bookType: "",
      targetAudience: "",
      language: "English-US",
      toneStyle: "",
      bookDimensions: "6\"x9\"",
      contentGoals: "",
      inspiration: "",
      chapterCount: 10,
      wordCount: 50000,
      additionalNotes: "",
      title: "",
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const bookFormData: BookFormData = {
      title: values.title,
      description: values.contentGoals,
      genre: [values.genre],
      subGenre: [],
      style: [values.toneStyle],
      tone: [values.toneStyle],
      audience: values.targetAudience,
      chapterCount: values.chapterCount,
      maxWordsPerChapter: Math.floor(values.wordCount / values.chapterCount),
      authorNotes: `Book Type: ${values.bookType}\nLanguage: ${values.language}\nDimensions: ${values.bookDimensions}\nInspiration: ${values.inspiration}\nAdditional Notes: ${values.additionalNotes}`,
    };

    toast({
      title: "Book Parameters Submitted",
      description: "Generating your book draft...",
    });

    onSubmit(bookFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>📖 Book Blueprint</CardTitle>
            <CardDescription>Define your book's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Genre</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genreOptions.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Book Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select book type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bookTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Target & Style</CardTitle>
            <CardDescription>Define your audience and writing style</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Young Adults, Entrepreneurs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4. Language</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languageOptions.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="toneStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>5. Tone & Style</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone & style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {toneStyleOptions.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookDimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>6. Book Dimensions</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dimensions" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dimensionsOptions.map((dim) => (
                          <SelectItem key={dim} value={dim}>
                            {dim}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📝 Content Details</CardTitle>
            <CardDescription>Define your content goals and structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contentGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>7. Specific Content Goals</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Must include strong female lead, a twist ending..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Describe key elements that must be included in your book
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inspiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>8. Inspiration or Comparable Books (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Similar to works by Stephen King, Agatha Christie..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="chapterCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>9. Number of Chapters: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wordCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Word Count: {field.value.toLocaleString()}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1000}
                        max={200000}
                        step={1000}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>10. Additional Notes for a Bestseller Edge</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Include anything else to enhance commercial or artistic value..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-carpediem-primary hover:bg-carpediem-primary/90"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating Your Book..." : "Generate Bestseller Draft"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
