
import { BookParams, OpenAIResponse } from './types';
import { buildPrompt } from './promptBuilder';
import { generateSampleBook } from './fallbackGenerator';
import { callOpenAIAPI } from './apiClient';

export { BookParams, OpenAIResponse } from './types';

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
      const response = await callOpenAIAPI(prompt, apiKey);
      if (response.error) {
        return response;
      }
      
      console.log("Content generated successfully!");
      return { content: response.content };
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
