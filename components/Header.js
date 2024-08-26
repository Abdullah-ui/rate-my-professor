"use client";
import SearchBar from "./SearchBar";
function Header() {
  return (
    <div className="flex justify-between px-10 py-4 font-header items-center">
      <div>
        <h1 className="text-3xl">
          <a href="/">profAI</a>
        </h1>
      </div>
      <div className="flex justify-between w-1/3 items-center text-lg">
        <a className="underline" href="/reviews">
          reviews
        </a>
        <a className="underline" href="/chatbot">
          chat
        </a>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default Header;
