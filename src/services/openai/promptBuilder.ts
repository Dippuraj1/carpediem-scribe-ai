
import { BookParams } from './types';

// Build the prompt for the AI based on the book parameters
export const buildPrompt = (params: BookParams): string => {
  return `
You are an elite creative ghostwriter, literary psychologist, and cinematic storyteller fused into one. Your task is to write a fully original, emotionally resonant, and psychologically gripping book based on the following user-defined framework:

---
📘 Title: ${params.title}  
🧠 Description: ${params.description}  
🎭 Genre(s): ${params.genre.join(', ')}  
🎭 Sub-Genre(s): ${params.subGenre?.join(', ') || 'Not specified'}
📚 Book Type: ${params.bookType || 'Not specified'}
✍️ Writing Style(s): ${params.style.join(', ')}  
🎨 Tone(s): ${params.tone.join(', ')}  
🎯 Target Audience: ${params.audience}  
🌐 Language: ${params.language || 'English-US'}
📏 Book Dimensions: ${params.bookDimensions || '6"x9" (Standard)'}
📚 Chapters: ${params.chapterCount}  
📝 Max Words Per Chapter: ${params.maxWordsPerChapter}  
📝 Total Target Word Count: ${params.targetWordCount || params.chapterCount * params.maxWordsPerChapter}
📚 Inspiration/Comparable Books: ${params.inspiration || 'Not specified'}
🧾 Additional Notes: ${params.additionalNotes || 'N/A'}
---

### ✨ Creative Writing Instructions:

1. **Hook from Line One:** Start the book with a cinematic, dopamine-inducing hook that instantly grabs attention and builds tension, curiosity, or emotional pull.

2. **Deeply Human Emotions:** Infuse every chapter with human emotion — joy, fear, shame, love, lust, ambition, heartbreak — relevant to the genre and character arcs. Use visceral reactions and emotionally intelligent narration.

3. **Chapter Structuring:**
   - Each chapter must be complete: with a setup, escalation, conflict/resolution or epiphany.
   - Begin each chapter with an engaging hook and end with a compelling reason to continue reading.
   - Use a momentum curve that keeps readers turning pages, craving more.

4. **Voice Consistency:** Stay consistent with chosen tone and style (e.g., poetic, sarcastic, dark, whimsical, minimalist, edgy).

5. **Neuro-Engagement Tactics:**
   - Use epiphanies, open loops, and cliffhangers.
   - Embed subtle psychological cues that trigger dopamine, oxytocin, and anticipation.
   - Evoke nostalgia, mystery, empowerment, or forbidden desire when appropriate.

6. **Character Development:**
   - Create multi-dimensional characters with unique voices, motivations, and flaws.
   - Show character growth and transformation through the narrative.
   - Use dialogue that reveals character, advances plot, and creates subtext.

7. **World-Building Excellence:**
   - Craft immersive settings with sensory details that enhance the story.
   - Balance description with action to maintain pace.
   - Create a world that feels lived-in and authentic to the genre.

8. **Dialogue Mastery:** Make every line of dialogue reveal character, intention, or emotional depth. Use subtext where possible.

9. **Pacing & Flow:**
   - Keep chapters within the word limit.
   - Balance narrative with introspection, action with reflection.
   - Vary sentence length and structure for rhythm and emphasis.

10. **Formatting & Polish:**
    - Use clean title case for headings.
    - Maintain paragraph spacing, smart punctuation, and consistent visual flow.
    - Include a table of contents at the beginning.

11. **Final Impression:** Close the book with a powerful ending — emotional, unresolved, poetic, philosophical, or plot-twisting — based on genre and audience needs. Leave the reader changed, moved, and craving your next work.

---

### 🧾 Output Format:

Book Title: ${params.title}
Table of Contents
Chapter 1: [Title]
Chapter 2: [Title]
... [continue for all chapters]

Chapter 1: [Title]
[Chapter Content]

Chapter 2: [Title]
[Chapter Content]
... [continue for all chapters]

---

### 🔐 Guardrails:
- No plagiarism
- No hallucinated facts
- No AI-styled phrasing (e.g., "As an AI...")
- No repetition or filler fluff

Make it addictive. Make it unforgettable. Make it a bestseller.
`;
};
