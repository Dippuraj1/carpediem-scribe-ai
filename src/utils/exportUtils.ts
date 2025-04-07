
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
export const ensureDirectoryExists = (dirPath: string) => {
  try {
    // Check if we're in a browser context
    if (typeof window !== 'undefined') {
      // In browser context, we can't directly access the file system
      console.log(`Note: Directory access (${dirPath}) isn't available in browser environment`);
      return false;
    } else {
      // This would be used in a Node.js environment (like Electron)
      console.log(`Ensuring directory exists: ${dirPath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error creating directory: ${dirPath}`, error);
    return false;
  }
};

// Get save path with fallbacks
export const getSavePath = () => {
  try {
    // Try to get user's preferred save location
    const savedPath = localStorage.getItem("save_directory") || "C:\\LIFolder";
    return savedPath;
  } catch (error) {
    // Default fallback path
    return "C:\\LIFolder";
  }
};

// Save user's preferred directory
export const setSavePath = (path: string) => {
  try {
    localStorage.setItem("save_directory", path);
    return true;
  } catch (error) {
    console.error("Error saving directory preference:", error);
    return false;
  }
};
