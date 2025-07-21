// Application constants
export const APP_CONFIG = {
  name: 'AI Code Reviewer',
  version: '2.0.0',
  description: 'Professional AI-powered code analysis and review tool',
  author: 'AI Code Reviewer Team'
};

// API Configuration
export const API_CONFIG = {
  gemini: {
    model: 'gemini-2.0-flash',
    maxTokens: 8192,
    temperature: 0.1,
    topP: 0.8,
    topK: 40
  }
};

// UI Configuration
export const UI_CONFIG = {
  themes: {
    dark: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-blue-600',
      text: 'text-white'
    },
    light: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      accent: 'bg-blue-500',
      text: 'text-gray-900'
    }
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
};

// Supported programming languages
export const SUPPORTED_LANGUAGES = [
  { value: 'auto', label: 'Auto Detect', extensions: [] },
  { value: 'javascript', label: 'JavaScript', extensions: ['js', 'jsx'] },
  { value: 'typescript', label: 'TypeScript', extensions: ['ts', 'tsx'] },
  { value: 'python', label: 'Python', extensions: ['py', 'pyw'] },
  { value: 'java', label: 'Java', extensions: ['java'] },
  { value: 'cpp', label: 'C++', extensions: ['cpp', 'cxx', 'cc', 'c'] },
  { value: 'csharp', label: 'C#', extensions: ['cs'] },
  { value: 'php', label: 'PHP', extensions: ['php'] },
  { value: 'ruby', label: 'Ruby', extensions: ['rb'] },
  { value: 'go', label: 'Go', extensions: ['go'] },
  { value: 'rust', label: 'Rust', extensions: ['rs'] },
  { value: 'html', label: 'HTML', extensions: ['html', 'htm'] },
  { value: 'css', label: 'CSS', extensions: ['css', 'scss', 'sass'] },
  { value: 'sql', label: 'SQL', extensions: ['sql'] },
  { value: 'json', label: 'JSON', extensions: ['json'] },
  { value: 'yaml', label: 'YAML', extensions: ['yml', 'yaml'] },
  { value: 'xml', label: 'XML', extensions: ['xml'] }
];

// Local storage keys
export const STORAGE_KEYS = {
  darkMode: 'codeReviewer_darkMode',
  reviewHistory: 'codeReviewer_history',
  userPreferences: 'codeReviewer_preferences',
  lastLanguage: 'codeReviewer_lastLanguage'
};

// Error messages
export const ERROR_MESSAGES = {
  noApiKey: 'API key not found. Please set REACT_APP_GEMINI_API in your environment variables.',
  emptyCode: 'Please enter some code to review',
  analyzerNotInitialized: 'AI analyzer not initialized',
  analysisFailure: 'Failed to analyze code. Please try again.',
  networkError: 'Network error. Please check your connection.',
  rateLimitExceeded: 'Rate limit exceeded. Please try again later.',
  invalidApiKey: 'Invalid API key. Please check your configuration.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  reviewCompleted: 'Code review completed!',
  historyLoaded: 'Review loaded from history',
  codeCopied: 'Code copied to clipboard!',
  fileUploaded: 'File uploaded successfully!',
  pdfExported: 'PDF exported successfully!',
  textDownloaded: 'Text file downloaded!'
};

// Feature flags
export const FEATURES = {
  syntaxHighlighting: true,
  fileUpload: true,
  exportPdf: true,
  reviewHistory: true,
  darkMode: true,
  languageDetection: true,
  codePreview: true,
  copyToClipboard: true
};