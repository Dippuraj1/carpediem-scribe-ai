
import { OpenAIResponse, APIErrorResponse, BookParams } from './types';
import { buildPrompt } from './promptBuilder';
import { generateSampleBook } from './fallbackGenerator';

// Function to make API calls to OpenAI
const callOpenAIAPI = async (prompt: string, apiKey: string): Promise<OpenAIResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using a more powerful model for better book generation
        messages: [
          {
            role: 'system',
            content: 'You are an elite creative ghostwriter, literary psychologist, and cinematic storyteller fused into one. You excel at creating compelling, best-selling books in any genre with rich characters, engaging plots, and commercial appeal.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8, // Slightly higher temperature for more creativity
        max_tokens: 8000, // Increased token limit for longer outputs
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.2
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json() as APIErrorResponse;
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
    return { content: generatedContent };
  } catch (error) {
    console.error("Error in API call:", error);
    return {
      content: "",
      error: "Failed to connect to OpenAI API. Please check your internet connection and API key."
    };
  }
};

export { callOpenAIAPI };
