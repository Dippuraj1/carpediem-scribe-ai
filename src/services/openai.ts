
interface BookParams {
  title: string;
  description: string;
  genre: string[];
  style: string[];
  tone: string[];
  audience: string;
  chapterCount: number;
  maxWordsPerChapter: number;
  authorNotes?: string;
}

interface OpenAIResponse {
  content: string;
  error?: string;
}

export const generateBook = async (
  params: BookParams,
  apiKey: string
): Promise<OpenAIResponse> => {
  try {
    // Check if we have an API key
    if (!apiKey) {
      return {
        content: "",
        error: "Missing OpenAI API key. Please enter your API key in the settings.",
      };
    }

    // Create the prompt for the AI
    const prompt = buildPrompt(params);
    
    console.log("Sending request to OpenAI API...");
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Using a more affordable model with good capabilities
          messages: [
            {
              role: 'system',
              content: 'You are an elite creative ghostwriter, literary psychologist, and cinematic storyteller fused into one.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error:", errorData);
        return {
          content: "",
          error: errorData.error?.message || `API error: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      if (!data.choices || !data.choices[0]?.message?.content) {
        return {
          content: "",
          error: "Received invalid response from OpenAI API"
        };
      }
      
      const generatedContent = data.choices[0].message.content;
      console.log("Content generated successfully!");
      return { content: generatedContent };
    } catch (apiError) {
      console.error("Error calling OpenAI API:", apiError);
      return {
        content: "",
        error: "Failed to connect to OpenAI API. Please check your internet connection and API key."
      };
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      content: "",
      error: errorMessage,
    };
  }
};

// For fallback when API fails or for testing
const generateSampleBook = (params: BookParams): string => {
  // Create book title
  let bookContent = `Book Title: ${params.title}\n\n`;
  
  // Create table of contents
  bookContent += `Table of Contents\n`;
  for (let i = 1; i <= params.chapterCount; i++) {
    let chapterTitle = "";
    if (i === 1) chapterTitle = "Introduction to the Journey";
    else if (i === 2) chapterTitle = "The First Challenge";
    else if (i === 3) chapterTitle = "Rising Tension";
    else if (i === 4) chapterTitle = "The Climax";
    else if (i === 5) chapterTitle = "Resolution and New Beginnings";
    else chapterTitle = `Chapter ${i} Title`;
    
    bookContent += `Chapter ${i}: ${chapterTitle}\n`;
  }
  bookContent += `\n`;
  
  // Create chapters
  for (let i = 1; i <= params.chapterCount; i++) {
    let chapterTitle = "";
    let chapterContent = "";
    
    if (i === 1) {
      chapterTitle = "Introduction to the Journey";
      chapterContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    } else if (i === 2) {
      chapterTitle = "The First Challenge";
      chapterContent = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
    } else if (i === 3) {
      chapterTitle = "Rising Tension";
      chapterContent = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`;
    } else if (i === 4) {
      chapterTitle = "The Climax";
      chapterContent = `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`;
    } else if (i === 5) {
      chapterTitle = "Resolution and New Beginnings";
      chapterContent = `Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.`;
    } else {
      chapterTitle = `Chapter ${i} Title`;
      chapterContent = `This is the content for chapter ${i}. It includes some filler text to demonstrate how the book would look with real content.

This is a second paragraph for this chapter to demonstrate paragraph spacing.`;
    }
    
    bookContent += `Chapter ${i}: ${chapterTitle}\n\n${chapterContent}\n\n`;
  }
  
  return bookContent;
};

// Build the prompt for the AI based on the book parameters
const buildPrompt = (params: BookParams): string => {
  return `
You are an elite creative ghostwriter, literary psychologist, and cinematic storyteller fused into one. Your task is to write a fully original, emotionally resonant, and psychologically gripping book based on the following user-defined framework:

---
📘 Title: ${params.title}  
🧠 Description: ${params.description}  
🎭 Genre(s): ${params.genre.join(', ')}  
✍️ Writing Style(s): ${params.style.join(', ')}  
🎨 Tone(s): ${params.tone.join(', ')}  
🎯 Target Audience: ${params.audience}  
📚 Chapters: ${params.chapterCount}  
📝 Max Words Per Chapter: ${params.maxWordsPerChapter}  
🧾 Author Notes: ${params.authorNotes || 'N/A'}
---

### ✨ Creative Writing Instructions:

1. **Hook from Line One:** Start the book with a cinematic, dopamine-inducing hook that instantly grabs attention and builds tension, curiosity, or emotional pull.
2. **Deeply Human Emotions:** Infuse every chapter with human emotion — joy, fear, shame, love, lust, ambition, heartbreak — relevant to the genre and character arcs. Use visceral reactions and emotionally intelligent narration.
3. **Chapter Structuring:**
   - Each chapter must be complete: with a setup, escalation, conflict/resolution or epiphany.
   - Use a momentum curve that keeps readers turning pages, craving more.
4. **Voice Consistency:** Stay consistent with chosen tone and style (e.g., poetic, sarcastic, dark, whimsical, minimalist, edgy).
5. **Neuro-Engagement Tactics:**
   - Use epiphanies, open loops, and cliffhangers.
   - Embed subtle psychological cues that trigger dopamine, oxytocin, and anticipation.
   - Evoke nostalgia, mystery, empowerment, or forbidden desire when appropriate.
6. **Keep It Legendary Yet Simple:**
   - Break down complex themes or ideas in ways even a 12-year-old could understand, without dumbing it down.
   - Use analogies, metaphors, and real-world comparisons that resonate.
7. **Dialogue Mastery:** Make every line of dialogue reveal character, intention, or emotional depth. Use subtext where possible.
8. **Originality & Integrity:**
   - 100% unique content, no plagiarism, clichés, or AI-sounding filler.
   - If using known tropes, subvert them creatively.
9. **Pacing & Flow:**
   - Keep chapters within the word limit.
   - Balance narrative with introspection, action with reflection.
10. **Formatting & Polish:**
    - Use clean title case for headings.
    - Maintain paragraph spacing, smart punctuation, and consistent visual flow.
    - Include a table of contents at the beginning.
11. **Final Impression:** Close the book with a powerful ending — emotional, unresolved, poetic, philosophical, or plot-twisting — based on genre and audience needs. Leave the reader changed, moved, and craving your next work.

** Do not use "—", instead use the relevant punctuation marks.
---

### 🧾 Output Format:

Book Title: ${params.title}
Table of Contents
Chapter Title 1

Chapter Title 2 ... {{auto-generate TOC}}

Chapter 1: [Title]
[Chapter Content]

Chapter 2: [Title]
[Chapter Content] ...


---

### 🔐 Guardrails:
- No plagiarism
- No hallucinated facts
- No AI-styled phrasing (e.g., "As an AI...")
- No repetition or filler fluff

Make it addictive. Make it unforgettable. Make it **Lovable**.
`;
};
