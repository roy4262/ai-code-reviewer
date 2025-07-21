import React, { useState, useCallback, useEffect } from 'react';
import { Sun, Moon, Sparkles, RotateCcw, AlertCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { CodeAnalyzer } from '../utils/codeAnalyzer';
import { useLocalStorage, useReviewHistory } from '../hooks/useLocalStorage';
import CodeEditor from './CodeEditor';
import ReviewResult from './ReviewResult';
import ReviewHistory from './ReviewHistory';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {
  const [code, setCode] = useState("");
  const [reviewResult, setReviewResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState('auto');
  const [dark, setDark] = useLocalStorage('darkMode', true);
  
  const { addToHistory } = useReviewHistory();
  const [analyzer, setAnalyzer] = useState(null);

  // Initialize analyzer
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GEMINI_API;
    if (apiKey) {
      try {
        setAnalyzer(new CodeAnalyzer(apiKey));
      } catch (err) {
        setError("Failed to initialize AI analyzer. Please check your API key.");
      }
    } else {
      setError("API key not found. Please set REACT_APP_GEMINI_API in your environment variables.");
    }
  }, []);

  const handleClear = useCallback(() => {
    setCode("");
    setReviewResult("");
    setError("");
    setLanguage('auto');
  }, []);

  const handleReviewCode = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to review");
      return;
    }

    if (!analyzer) {
      toast.error("AI analyzer not initialized");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Auto-detect language if set to auto
      const detectedLanguage = language === 'auto' ? analyzer.detectLanguage(code) : language;
      
      const result = await analyzer.analyzeCode(code, detectedLanguage);
      
      setReviewResult(result);
      
      // Add to history
      addToHistory({
        code,
        result,
        language: detectedLanguage
      });

      toast.success("Code review completed!");
    } catch (err) {
      console.error('Review error:', err);
      setError(err.message || "Failed to analyze code. Please try again.");
      toast.error("Failed to analyze code");
    } finally {
      setLoading(false);
    }
  }, [code, language, analyzer, addToHistory]);

  const handleLoadFromHistory = useCallback((review) => {
    setCode(review.code);
    setReviewResult(review.result);
    setLanguage(review.language || 'auto');
    toast.success("Review loaded from history");
  }, []);

  const toggleTheme = useCallback(() => {
    setDark(prev => !prev);
  }, [setDark]);

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: dark ? '#374151' : '#ffffff',
            color: dark ? '#ffffff' : '#000000',
            border: dark ? '1px solid #4B5563' : '1px solid #E5E7EB'
          }
        }}
      />
      
      <div className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
             : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}>
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-sm bg-opacity-80 border-b border-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${dark ? "bg-blue-600" : "bg-blue-500"}`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Code Reviewer
                </h1>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  dark 
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" 
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                title={`Switch to ${dark ? 'light' : 'dark'} mode`}
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Display */}
          {error && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 border-red-500 ${
              dark ? "bg-red-900 bg-opacity-20 text-red-300" : "bg-red-50 text-red-700"
            }`}>
              <div className="flex items-center">
                <AlertCircle size={20} className="mr-2" />
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Code Input Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Code Input</h2>
              <div className="text-sm text-gray-500">
                Paste your code below for AI-powered analysis
              </div>
            </div>
            
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              dark={dark}
              placeholder="Paste your code here for comprehensive AI analysis..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={handleReviewCode}
              disabled={loading || !code.trim() || !analyzer}
              className={`
                px-8 py-3 rounded-lg font-medium transition-all duration-200 
                flex items-center space-x-2 min-w-[140px] justify-center
                ${loading || !code.trim() || !analyzer
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : dark
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:scale-105"
                  : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:scale-105"
                }
              `}
            >
              <Sparkles size={18} />
              <span>{loading ? "Analyzing..." : "Review Code"}</span>
            </button>

            <button
              onClick={handleClear}
              disabled={loading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200 
                flex items-center space-x-2
                ${loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : dark
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }
              `}
            >
              <RotateCcw size={18} />
              <span>Clear</span>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <LoadingSpinner dark={dark} />
          )}

          {/* Review Results */}
          {reviewResult && !loading && (
            <ReviewResult 
              result={reviewResult} 
              dark={dark} 
              code={code}
              language={language}
            />
          )}
        </main>

        {/* Review History */}
        <ReviewHistory 
          dark={dark} 
          onLoadReview={handleLoadFromHistory}
        />
      </div>
    </>
  );
};

export default Home;