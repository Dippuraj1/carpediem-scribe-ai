
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface GenreCategory {
  label: string;
  options: string[];
}

interface TagSelectorProps {
  label: string;
  tags: string[];
  options: GenreCategory[] | string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  placeholder?: string;
  disabledOptions?: string[];
  type?: "genre" | "subgenre" | "standard";
  selectedGenres?: string[];
}

const TagSelector = ({ 
  label, 
  tags, 
  options, 
  onAddTag, 
  onRemoveTag,
  placeholder = "Select option",
  disabledOptions = [],
  type = "standard",
  selectedGenres = []
}: TagSelectorProps) => {
  // Check if options is a flat array or grouped
  const isGrouped = Array.isArray(options) && options.length > 0 && 
                  typeof options[0] !== 'string';

  // Function to get all filtered options based on type and selected genres
  const getFilteredOptions = () => {
    if (type === "genre" && isGrouped) {
      // For genre dropdown, show only category labels
      return (options as GenreCategory[]).map(category => category.label);
    } else if (type === "subgenre" && isGrouped && selectedGenres.length > 0) {
      // For subgenre dropdown, show options from selected genres
      const subgenreOptions: string[] = [];
      
      (options as GenreCategory[]).forEach(category => {
        if (selectedGenres.includes(category.label)) {
          category.options.forEach(option => {
            // Add the option if it's not already in the array
            if (!subgenreOptions.includes(option)) {
              subgenreOptions.push(option);
            }
          });
        }
      });
      
      return subgenreOptions;
    } else if (isGrouped) {
      // If it's grouped but not genre or subgenre, flatten all options
      const flatOptions: string[] = [];
      (options as GenreCategory[]).forEach(category => {
        category.options.forEach(option => {
          if (!flatOptions.includes(option)) {
            flatOptions.push(option);
          }
        });
      });
      return flatOptions;
    } else {
      // Return the options as is for non-grouped options
      return options as string[];
    }
  };

  const filteredOptions = getFilteredOptions();

  // Filter out options that are already selected or disabled
  const availableOptions = Array.isArray(filteredOptions) 
    ? filteredOptions.filter(option => !tags.includes(option) && !disabledOptions.includes(option))
    : [];

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-sm py-1">
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="ml-2"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Select
        onValueChange={(value) => {
          if (value && !tags.includes(value)) {
            onAddTag(value);
          }
        }}
        value=""
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-72 w-full">
            {type === "genre" && isGrouped ? (
              // For genre type, show only category labels
              availableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
            ) : type === "subgenre" && isGrouped ? (
              // For subgenre type, show filtered options based on selected genres
              availableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
            ) : isGrouped ? (
              // Standard grouped options
              (options as GenreCategory[]).map((category) => (
                <SelectGroup key={category.label}>
                  <SelectLabel>{category.label}</SelectLabel>
                  {category.options
                    .filter((option) => !tags.includes(option) && !disabledOptions.includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))
            ) : (
              // Render flat options list
              availableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
            )}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagSelector;
