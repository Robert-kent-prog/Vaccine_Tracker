// src/components/ui/SearchBar.jsx
import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  onFilterClick,
  showFilters = false,
  filters = [],
  onClear,
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showFilters && (
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={onFilterClick}
            className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
          
          {filters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {filter}
              <button
                onClick={() => console.log('Remove filter:', filter)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;