import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ fetchData, setResult, suggestionKey }) => {
  const [value, setValue] = useState(""); //this is the value of the search bar
  const [suggestions, setSuggestions] = useState([]); // this is where the search suggestions get stored
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const findResult = (value) => {
    setResult(
      suggestions.find((suggestion) => suggestion[suggestionKey] === value)
    );
  };

  useDebounce(
    async () => {
      try {
        const suggestions = await fetchData(value);

        setSuggestions(suggestions || []);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [value]
  );

  const handleFocus = () => {
    setHideSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };

  const handleSearchInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="w-[500px] relative">
        <AiOutlineSearch className="absolute bottom-2 left-0" size={20} />
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className="border-b-2 pl-6 border-black h-8 outline-none box-border px-2.5 transition duration-200 w-full focus:border-blue-500 focus:transition focus:duration-200"
          placeholder="Search products..."
          value={value}
          onChange={handleSearchInputChange}
        />

        <div
          className={`overflow-y-scroll border border-gray-300 bg-white max-h-80 w-full h-fit-content absolute z-10  ${
            hideSuggestions ? "hidden" : ""
          }`}
        >
          {suggestions.map((suggestion) => (
            <div
              className="cursor-pointer box-border px-2.5 h-8 flex items-center hover:bg-gray-300"
              onClick={() => findResult(suggestion[suggestionKey])}
            >
              {suggestion[suggestionKey]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
