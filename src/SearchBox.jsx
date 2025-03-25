import React, { useState } from "react";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchSuggestions = (query) => {
    // Simulate an API call
    const allSuggestions = ["apple", "banana", "grape", "orange"];
    setSuggestions(
      allSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) fetchSuggestions(query);
    else setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSuggestionSelect(suggestions[activeIndex]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const clearInput = () => {
    setSearchQuery("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: index === activeIndex ? "#ddd" : "#fff",
              }}
              onClick={() => handleSuggestionSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {searchQuery && <button onClick={clearInput}>X</button>}
    </div>
  );
};

export default SearchBox;
