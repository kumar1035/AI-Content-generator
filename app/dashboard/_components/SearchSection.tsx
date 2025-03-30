import { Search } from "lucide-react";
import React from "react";

interface SearchSectionProps {
  onSearchInput?: (value: string) => void;
}

function SearchSection({ onSearchInput }: SearchSectionProps) {
  return (
    <div className="p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Browse All Templates</h2>
        <p className="text-lg mt-2">What would you like to create today?</p>
      </div>

      <div className="w-full flex justify-center mt-5">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 max-w-md w-full">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => onSearchInput && onSearchInput(event.target.value)}
            className="bg-transparent w-full outline-none text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
 