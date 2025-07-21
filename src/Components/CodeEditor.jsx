import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Copy, Eye, EyeOff, BarChart3 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

const SUPPORTED_LANGUAGES = [
  { value: 'auto', label: 'Auto Detect' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' }
];

const CodeEditor = ({ 
  code, 
  onChange, 
  language, 
  onLanguageChange, 
  dark, 
  placeholder = "Paste your code here..." 
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Calculate code statistics
  const stats = {
    characters: code.length,
    words: code.trim() ? code.trim().split(/\s+/).length : 0,
    lines: code.split('\n').length
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = useCallback((file) => {
    if (file.size > 1024 * 1024) { // 1MB limit
      toast.error("File size too large. Please select a file under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onChange(content);
      
      // Auto-detect language from file extension
      const extension = file.name.split('.').pop().toLowerCase();
      const languageMap = {
        'js': 'javascript',
        'jsx': 'javascript',
        'ts': 'typescript',
        'tsx': 'typescript',
        'py': 'python',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'cpp',
        'cs': 'csharp',
        'php': 'php',
        'rb': 'ruby',
        'go': 'go',
        'rs': 'rust',
        'html': 'html',
        'css': 'css',
        'sql': 'sql',
        'json': 'json'
      };
      
      if (languageMap[extension]) {
        onLanguageChange(languageMap[extension]);
      }
      
      toast.success(`File "${file.name}" uploaded successfully!`);
    };
    reader.readAsText(file);
  }, [onChange, onLanguageChange]);

  const handleFileSelect = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  }, [code]);

  const togglePreview = useCallback(() => {
    setIsPreview(prev => !prev);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              dark 
                ? "bg-gray-800 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* Preview Toggle */}
          <button
            onClick={togglePreview}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            title={isPreview ? "Switch to editor" : "Preview code"}
          >
            {isPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{isPreview ? "Edit" : "Preview"}</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.html,.css,.sql,.json,.txt"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              dark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            title="Upload file"
          >
            <Upload size={16} />
            <span>Upload</span>
          </button>

          {/* Copy Button */}
          {code && (
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                dark
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              title="Copy code"
            >
              <Copy size={16} />
              <span>Copy</span>
            </button>
          )}
        </div>
      </div>

      {/* Code Statistics */}
      {code && (
        <div className={`flex items-center space-x-6 text-sm ${
          dark ? "text-gray-400" : "text-gray-600"
        }`}>
          <div className="flex items-center space-x-1">
            <BarChart3 size={14} />
            <span>{stats.characters} characters</span>
          </div>
          <div>{stats.words} words</div>
          <div>{stats.lines} lines</div>
        </div>
      )}

      {/* Editor/Preview */}
      <div
        className={`relative rounded-lg border-2 border-dashed transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : dark
            ? "border-gray-600 bg-gray-800"
            : "border-gray-300 bg-white"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isPreview && code ? (
          <div className="p-4">
            <SyntaxHighlighter
              language={language === 'auto' ? 'javascript' : language}
              style={dark ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                background: 'transparent',
                fontSize: '14px'
              }}
              wrapLongLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            placeholder={dragActive ? "Drop your file here..." : placeholder}
            className={`w-full h-96 p-4 font-mono text-sm resize-none focus:outline-none bg-transparent ${
              dark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
            }`}
            spellCheck={false}
          />
        )}

        {/* Drag Overlay */}
        {dragActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-10 rounded-lg">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-2 text-blue-500" />
              <p className="text-blue-600 font-medium">Drop your file here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;