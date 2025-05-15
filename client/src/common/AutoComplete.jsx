import React, { useState, useEffect } from "react";

const AutoComplete = ({ suggestions = [], value, onChange, onBlur, name }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value || "");

  useEffect(() => {
    setUserInput(value || "");
  }, [value]);

  const handleChange = (e) => {
    const input = e.target.value;
    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(input.toLowerCase())
    );
    setUserInput(input);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestion(0);
    onChange(e);
  };

  const handleClick = (suggestion) => {
    const fakeEvent = {
      target: {
        name,
        value: suggestion,
      },
    };
    setUserInput(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onChange(fakeEvent);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && filteredSuggestions.length > 0) {
      handleClick(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      setActiveSuggestion((prev) => prev - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion + 1 >= filteredSuggestions.length) return;
      setActiveSuggestion((prev) => prev + 1);
    }
  };

  return (
    <div>
      <input
        className="border-2 border-gray-300 lg:w-[500px] sm:w-96 bg-white rounded-md p-1 mb-1"
        type="text"
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        value={userInput}
        autoComplete="off"
      />
      {showSuggestions && userInput && (
        <ul className="border-2 border-disableButton font-medium text-white bg-disableButton text-left rounded-md p-1">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((s, i) => (
              <li
                key={s}
                className="hover:cursor-pointer m-1 hover:bg-enableButton p-1"
                onClick={() => handleClick(s)}
              >
                {s}
              </li>
            ))
          ) : (
            <li className="no-suggestions">No suggestions</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
