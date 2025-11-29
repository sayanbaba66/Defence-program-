
import React, { useState, useEffect, useRef } from 'react';
import { fetchSearchSuggestions } from '../services/geminiService';
import { Language } from '../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
  placeholder?: string;
  language: Language;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions, placeholder, language }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length === 0) {
        // Fallback to static suggestions when empty
        setShowSuggestions(false);
        setIsAiLoading(false);
        return;
    }

    // Debounce AI Call
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    setIsAiLoading(true);
    setShowSuggestions(true);
    
    // Show local filtered results immediately while waiting for AI
    const localFiltered = suggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(localFiltered);

    debounceTimer.current = setTimeout(async () => {
        try {
            const aiSuggestions = await fetchSearchSuggestions(value, language);
            if (aiSuggestions && aiSuggestions.length > 0) {
                setFilteredSuggestions(aiSuggestions);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAiLoading(false);
        }
    }, 400); // 400ms delay
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl mx-auto my-6 z-30 font-sans">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl transition-colors duration-300">
            <div className="pl-6 text-orange-500">
                <i className="fa-solid fa-robot text-xl animate-bounce-slow"></i>
            </div>
            
            <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
                if (query.length === 0 && suggestions.length > 0) {
                     setFilteredSuggestions(suggestions.slice(0, 5)); // Show top 5 popular
                     setShowSuggestions(true);
                } else if (query.length > 0) {
                    setShowSuggestions(true);
                }
            }}
            placeholder={placeholder || "Ask AI anything..."}
            className="w-full py-4 px-4 bg-transparent border-none rounded-full text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-0 text-lg font-medium truncate"
            />

            {/* Right Actions */}
            <div className="pr-2 flex items-center gap-2">
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
                <button
                    type="submit"
                    className={`
                        flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white shadow-md transition-all transform hover:scale-105 active:scale-95
                        ${query.trim() ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}
                    `}
                    disabled={!query.trim()}
                >
                    <span>Ask AI</span>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                </button>
            </div>
        </div>
      </form>

      {/* Type-ahead Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute w-full mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-down z-50">
           <div className="bg-gray-50/50 dark:bg-gray-900/50 px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center">
              <span>{isAiLoading ? "AI Generating..." : "Suggestions"}</span>
              {isAiLoading && <i className="fa-solid fa-circle-notch fa-spin text-orange-500"></i>}
           </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700 max-h-72 overflow-y-auto custom-scrollbar">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3.5 hover:bg-orange-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-4 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400 flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium" dangerouslySetInnerHTML={{
                  __html: suggestion.replace(new RegExp(`(${query})`, 'gi'), '<span class="text-orange-600 font-bold">$1</span>')
                }} />
                <i className="fa-solid fa-arrow-right text-gray-300 dark:text-gray-600 ml-auto group-hover:text-orange-400 transform group-hover:translate-x-1 transition-all"></i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
