"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ isMenuOpen, reviews }) {
  const [value, setValue] = useState("");

  const filteredProfessors = reviews
    ?.filter((review) =>
      review?.professorName.toLowerCase().includes(value.toLowerCase())
    )
    .map((review, index) => (
      <li key={index} className="py-1 px-2 hover:bg-gray-100">
        {review.professorName}
      </li>
    ));

  return (
    <div className={`relative ${isMenuOpen ? "w-full" : "w-56 max-w-xs"}`}>
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        className="w-full pl-10 pr-4 py-1 text-black rounded-xl border-2"
        placeholder="Search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <ul className="absolute bg-white border rounded-md w-full max-h-40 overflow-y-auto">
          {filteredProfessors}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
