
interface GenreCategory {
  label: string;
  options: string[];
}

export const genreCategories: GenreCategory[] = [
  {
    "label": "Fiction",
    "options": [
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Thriller",
      "Horror",
      "Romance",
      "Historical Fiction",
      "Literary Fiction",
      "Adventure",
      "Action",
      "Drama",
      "Dystopian",
      "Supernatural",
      "Magical Realism"
    ]
  },
  {
    "label": "Age-Based Fiction",
    "options": [
      "Young Adult (YA)",
      "New Adult",
      "Middle Grade",
      "Children's Fiction",
      "Coming-of-Age"
    ]
  },
  {
    "label": "Non-Fiction",
    "options": [
      "Self-Help",
      "Personal Development",
      "Psychology",
      "Science",
      "Philosophy",
      "History",
      "Biography / Autobiography",
      "Memoir",
      "Travel",
      "Politics",
      "True Crime",
      "Economics",
      "Business",
      "Finance",
      "Health & Wellness",
      "Spirituality / Religion"
    ]
  },
  {
    "label": "Creative Non-Fiction",
    "options": [
      "Essays & Reflections",
      "Journalism / Reportage",
      "Creative Memoir",
      "Narrative Non-Fiction",
      "Cultural Commentary",
      "Food Writing",
      "Nature Writing"
    ]
  },
  {
    "label": "Scripts & Screenwriting",
    "options": [
      "Screenplay",
      "Stage Play",
      "Sitcom Script",
      "Movie Script",
      "Short Film Script",
      "TV Series Pilot"
    ]
  },
  {
    "label": "Lyrics & Poetry",
    "options": [
      "Song Lyrics",
      "Poetry",
      "Spoken Word",
      "Slam Poetry",
      "Rap / Verse Narrative"
    ]
  },
  {
    "label": "Adult (18+)",
    "options": [
      "Erotic Romance",
      "Dark Erotica",
      "Taboo Fiction",
      "Sensual Drama",
      "LGBTQ+ Erotica",
      "BDSM-themed Fiction"
    ]
  },
  {
    "label": "Hybrid / Cross-Genre",
    "options": [
      "Romantic Thriller",
      "Sci-Fi Romance",
      "Historical Fantasy",
      "Paranormal Romance",
      "Speculative Fiction",
      "Satire / Parody",
      "Cyberpunk",
      "Steampunk",
      "Urban Fantasy",
      "Apocalyptic",
      "Post-Apocalyptic",
      "Mythological Fiction"
    ]
  }
];

export const styleOptions = [
  "Descriptive", "Narrative", "Conversational", "Lyrical", "Minimalist", 
  "Poetic", "Technical", "Academic", "Journalistic", "Stream of Consciousness", 
  "Satirical", "Expository", "Persuasive", "Formal", "Casual"
];

export const toneOptions = [
  "Serious", "Humorous", "Inspirational", "Skeptical", "Nostalgic", 
  "Optimistic", "Pessimistic", "Suspenseful", "Romantic", "Educational", 
  "Dramatic", "Whimsical", "Ironic", "Melancholic", "Uplifting"
];
