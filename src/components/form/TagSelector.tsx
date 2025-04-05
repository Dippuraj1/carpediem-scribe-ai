
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenreCategory {
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
}

const TagSelector = ({ 
  label, 
  tags, 
  options, 
  onAddTag, 
  onRemoveTag,
  placeholder = "Select option" 
}: TagSelectorProps) => {
  // Check if options is a flat array or grouped
  const isGrouped = Array.isArray(options) && options.length > 0 && 
                  typeof options[0] !== 'string';

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
          {isGrouped ? (
            // Render grouped options
            (options as GenreCategory[]).map((category) => (
              <SelectGroup key={category.label}>
                <SelectLabel>{category.label}</SelectLabel>
                {category.options
                  .filter((option) => !tags.includes(option))
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectGroup>
            ))
          ) : (
            // Render flat options list
            (options as string[])
              .filter((option) => !tags.includes(option))
              .map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagSelector;
