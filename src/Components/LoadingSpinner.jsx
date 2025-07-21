import React from 'react';
import { Loader2, Brain, Code } from 'lucide-react';

const LoadingSpinner = ({ dark, message = "Analyzing your code..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
          dark ? "border-blue-400" : "border-blue-500"
        }`} />
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className={`w-6 h-6 ${dark ? "text-blue-400" : "text-blue-500"}`} />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className={`text-lg font-medium ${dark ? "text-white" : "text-gray-900"}`}>
          {message}
        </p>
        <p className={`text-sm mt-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Our AI is carefully reviewing your code...
        </p>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full animate-pulse ${
              dark ? "bg-blue-400" : "bg-blue-500"
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
      
      {/* Progress indicators */}
      <div className="mt-6 space-y-2 w-full max-w-xs">
        {[
          "Parsing code structure...",
          "Analyzing patterns...",
          "Checking best practices...",
          "Generating insights..."
        ].map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 text-xs ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-in-out ${index * 0.5}s forwards`
            }}
          >
            <Code size={12} />
            <span>{step}</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;