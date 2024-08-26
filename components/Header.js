"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
<<<<<<< HEAD
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
=======
    <header className="bg-white shadow-md">
      <div className="flex justify-between px-10 py-4 font-header items-center">
        <div>
          <h1 className="text-3xl">
            <a href="/">profAI</a>
          </h1>
        </div>
        <nav className="hidden md:flex justify-between w-1/3 items-center text-lg">
          <a
            className="px-3 py-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out"
            href="/reviews"
          >
            reviews
          </a>
          <a
            className="px-3 py-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out"
            href="/chatbot"
          >
            chat
          </a>
          <SearchBar isMenuOpen={false} />
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            &#9776;
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full text-center p-4">
          <a
            onClick={toggleMenu}
            className="block py-2 hover:bg-black hover:text-white rounded-md transition duration-300 ease-in-out"
            href="/reviews"
          >
            reviews
          </a>
          <a
            onClick={toggleMenu}
            className="block py-2 hover:bg-black hover:text-white rounded-md transition duration-300 ease-in-out"
            href="/chatbot"
          >
            chat
          </a>
          <SearchBar isMenuOpen={true} />
        </div>
      )}
    </header>
>>>>>>> 7f2340b9086c83ed99f124f09067517f7f274f56
  );
}

export default Header;
