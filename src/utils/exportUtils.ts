
// Helper function to trigger file download
export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Create directory if it doesn't exist
export const ensureDirectoryExists = (dirPath: string): boolean => {
  try {
    // In browser context, we can't directly access the file system
    // We'll simulate success and log the intended path
    console.log(`Would create directory if this weren't a browser: ${dirPath}`);
    
    // In a real file system environment, this would create the directory
    // For browser environment, we return true to simulate success
    return true;
  } catch (error) {
    console.error(`Error creating directory: ${dirPath}`, error);
    return false;
  }
};

// Get save path with fallbacks
export const getSavePath = (): string => {
  try {
    // Try to get user's preferred save location or use default
    const savedPath = localStorage.getItem("save_directory") || "C:\\LIFolder";
    
    // Ensure the path exists in browser storage
    localStorage.setItem("save_directory", savedPath);
    
    return savedPath;
  } catch (error) {
    // Default fallback path
    return "C:\\LIFolder";
  }
};

// Save user's preferred directory
export const setSavePath = (path: string): boolean => {
  try {
    localStorage.setItem("save_directory", path);
    return true;
  } catch (error) {
    console.error("Error saving directory preference:", error);
    return false;
  }
};
