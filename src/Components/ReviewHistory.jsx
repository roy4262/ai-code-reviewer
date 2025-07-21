import React, { useState, useCallback } from 'react';
import { 
  History, 
  X, 
  Clock, 
  Code, 
  Trash2, 
  Search,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useReviewHistory } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const ReviewHistory = ({ dark, onLoadReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { history, clearHistory, removeFromHistory } = useReviewHistory();
  
  const itemsPerPage = 5;

  const togglePanel = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all review history?')) {
      clearHistory();
      toast.success('Review history cleared');
    }
  }, [clearHistory]);

  const handleRemoveItem = useCallback((index) => {
    removeFromHistory(index);
    toast.success('Review removed from history');
  }, [removeFromHistory]);

  const handleLoadReview = useCallback((review) => {
    onLoadReview(review);
    setIsOpen(false);
  }, [onLoadReview]);

  // Filter history based on search term
  const filteredHistory = history.filter(review => 
    review.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-40 ${
          dark
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        title="Review History"
      >
        <History size={24} />
        {history.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {history.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={togglePanel}
        />
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${dark ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <History className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Review History</h2>
            </div>
            <button
              onClick={togglePanel}
              className={`p-2 rounded-lg transition-colors ${
                dark
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              dark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                dark 
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Actions */}
          {history.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredHistory.length} review{filteredHistory.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={handleClearHistory}
                className={`text-sm px-3 py-1 rounded transition-colors ${
                  dark
                    ? "text-red-400 hover:bg-red-900 hover:bg-opacity-20"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <FileText className={`w-12 h-12 mx-auto mb-4 ${
                dark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg font-medium mb-2 ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No reviews yet
              </p>
              <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                Your code review history will appear here
              </p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                dark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg font-medium mb-2 ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No matching reviews
              </p>
              <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedHistory.map((review, index) => (
                <div
                  key={startIndex + index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    dark
                      ? "border-gray-700 bg-gray-800 hover:bg-gray-750"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => handleLoadReview(review)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Code size={16} className="text-blue-500 flex-shrink-0" />
                      <span className={`text-sm font-medium ${
                        dark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {review.language || 'Unknown'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(startIndex + index);
                      }}
                      className={`p-1 rounded transition-colors ${
                        dark
                          ? "text-gray-500 hover:text-red-400 hover:bg-red-900 hover:bg-opacity-20"
                          : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title="Remove from history"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <p className={`text-sm font-mono leading-relaxed ${
                      dark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {truncateText(review.code)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={dark ? 'text-gray-500' : 'text-gray-500'}>
                        {formatDate(review.timestamp)}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      dark
                        ? 'bg-blue-900 bg-opacity-30 text-blue-400'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      Click to load
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`p-4 border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : dark
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : dark
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewHistory;