import React, { useState } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import './App.css';

function SimpleApp() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [error, setError] = useState('');

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    const apiKey = process.env.REACT_APP_GEMINI_API;
    if (!apiKey) {
      setError('API key not found. Please set REACT_APP_GEMINI_API in your environment variables.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simple fetch to Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please review this code and provide feedback:\n\n${code}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
      setResult(text);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`Failed to analyze code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">AI Code Reviewer</h1>
            </div>
            
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-lg transition-colors ${
                dark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Enter your code for review:
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className={`w-full h-64 p-4 border rounded-lg font-mono text-sm ${
              dark 
                ? "bg-gray-800 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={analyzeCode}
            disabled={loading || !code.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              loading || !code.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Analyzing..." : "Review Code"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className={`p-6 rounded-lg border ${
            dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h3 className="text-lg font-semibold mb-4">Review Results:</h3>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {result}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default SimpleApp;