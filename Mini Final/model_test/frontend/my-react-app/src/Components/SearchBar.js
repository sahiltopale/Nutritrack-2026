import React from "react";

const SearchBar = ({ query, onChange }) => {
  return (
    <input
      type="text"
      className="recipes-search-bar" // Add the class here
      placeholder="Search for a dish..."
      value={query}
      onChange={onChange}
    />
  );
};

export default SearchBar;