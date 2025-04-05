
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlusIcon, X } from "lucide-react";

// Book form props interface
interface BookFormProps {
  onSubmit: (params: BookFormData) => void;
  isGenerating: boolean;
}

// Book form data interface
export interface BookFormData {
  title: string;
  description: string;
  genre: string[];
  style: string[];
  tone: string[];
  audience: string;
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes: string;
}

// Pre-defined options for genres, styles, and tones
const genreOptions = [
  "Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", 
  "Horror", "Historical Fiction", "Adventure", "Literary Fiction", 
  "Young Adult", "Children's Fiction", "Memoir", "Biography", 
  "Self-Help", "Business", "Comedy", "Drama", "Poetry", "Folklore"
];

const styleOptions = [
  "Descriptive", "Narrative", "Conversational", "Lyrical", "Minimalist", 
  "Poetic", "Technical", "Academic", "Journalistic", "Stream of Consciousness", 
  "Satirical", "Expository", "Persuasive", "Formal", "Casual"
];

const toneOptions = [
  "Serious", "Humorous", "Inspirational", "Skeptical", "Nostalgic", 
  "Optimistic", "Pessimistic", "Suspenseful", "Romantic", "Educational", 
  "Dramatic", "Whimsical", "Ironic", "Melancholic", "Uplifting"
];

// Default form values
const defaultFormData: BookFormData = {
  title: "",
  description: "",
  genre: ["Fantasy"],
  style: ["Descriptive"],
  tone: ["Optimistic"],
  audience: "Young Adults",
  chapterCount: 5,
  maxWordsPerChapter: 2000,
  authorNotes: "",
};

const BookForm = ({ onSubmit, isGenerating }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>(defaultFormData);
  const [genreInput, setGenreInput] = useState("");
  const [styleInput, setStyleInput] = useState("");
  const [toneInput, setToneInput] = useState("");

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select input changes
  const handleSelectChange = (value: string, field: keyof BookFormData) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding and removing tags
  const addTag = (tag: string, field: "genre" | "style" | "tone") => {
    if (tag && !formData[field].includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], tag],
      }));
    }

    // Reset the input field
    if (field === "genre") setGenreInput("");
    if (field === "style") setStyleInput("");
    if (field === "tone") setToneInput("");
  };

  const removeTag = (tag: string, field: "genre" | "style" | "tone") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((t) => t !== tag),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>
            Define the basic information about your book
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a brief description of your book"
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              name="audience"
              placeholder="Who is this book for?"
              value={formData.audience}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Style & Tone</CardTitle>
          <CardDescription>
            Define the creative direction of your book
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Genre Selection */}
          <div className="space-y-2">
            <Label>Genre(s)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.genre.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag, "genre")}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  if (value && !formData.genre.includes(value)) {
                    addTag(value, "genre");
                  }
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genreOptions
                    .filter((genre) => !formData.genre.includes(genre))
                    .map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Writing Style Selection */}
          <div className="space-y-2">
            <Label>Writing Style(s)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.style.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag, "style")}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  if (value && !formData.style.includes(value)) {
                    addTag(value, "style");
                  }
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions
                    .filter((style) => !formData.style.includes(style))
                    .map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-2">
            <Label>Tone(s)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tone.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag, "tone")}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  if (value && !formData.tone.includes(value)) {
                    addTag(value, "tone");
                  }
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions
                    .filter((tone) => !formData.tone.includes(tone))
                    .map((tone) => (
                      <SelectItem key={tone} value={tone}>
                        {tone}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Structure</CardTitle>
          <CardDescription>
            Define the structure and length of your book
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="chapterCount" className="mb-2 block">
                Number of Chapters: {formData.chapterCount}
              </Label>
              <Slider
                id="chapterCount"
                min={1}
                max={20}
                step={1}
                value={[formData.chapterCount]}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, chapterCount: value[0] }))
                }
                className="py-4"
              />
            </div>

            <div>
              <Label htmlFor="maxWordsPerChapter" className="mb-2 block">
                Max Words Per Chapter: {formData.maxWordsPerChapter}
              </Label>
              <Slider
                id="maxWordsPerChapter"
                min={500}
                max={5000}
                step={100}
                value={[formData.maxWordsPerChapter]}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxWordsPerChapter: value[0],
                  }))
                }
                className="py-4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorNotes">Notes to AI (Optional)</Label>
            <Textarea
              id="authorNotes"
              name="authorNotes"
              placeholder="Add any specific instructions or notes for the AI"
              value={formData.authorNotes}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-carpediem-primary hover:bg-carpediem-primary/90"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Book...
              </div>
            ) : (
              "Generate Book"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BookForm;
