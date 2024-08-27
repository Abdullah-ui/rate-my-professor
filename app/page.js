import Header from "@/components/Header";
import { FaSearch, FaPen } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 flex-grow flex flex-col justify-center items-center font-body w-full px-4 sm:w-3/4 md:w-1/2 mx-auto mt-16 sm:mt-28 relative">
        {/* Circles behind the title */}
        <div className="relative flex justify-center items-center">
          {/* Circles */}
          <div className="absolute top-10 left-1/2 w-[32rem] h-[32rem] rounded-full border-4 border-gray-300 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-10 left-1/2 w-[42rem] h-[42rem] rounded-full border-4 border-gray-300 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-10 left-1/2 w-[52rem] h-[52rem] rounded-full border-4 border-gray-200 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-10 left-1/2 w-[62rem] h-[62rem] rounded-full border-4 border-gray-200 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-10 left-1/2 w-[72rem] h-[72rem] rounded-full border-4 border-gray-100 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-10 left-1/2 w-[82rem] h-[82rem] rounded-full border-4 border-gray-100 transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Title in the center */}
          <div className="relative z-10 text-center text-[18px] sm:text-[24px] md:text-[30px] w-full sm:w-10/12 sm:mb-16 text-gray-800">
            <h2>
              Finding the <u>right professor</u> just got a lot easier.
            </h2>
          </div>
        </div>

        {/* Text Blocks Over the Circles */}
        <div className="relative z-20 flex flex-col sm:flex-row w-full sm:w-10/12 mt-80 sm:mt-80 items-center text-center sm:text-left sm:mb-8 text-gray-800">
          <FaSearch className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 sm:mr-6 md:mr-10 mb-4 sm:mb-0" />
          <h3 className="text-[15px] sm:text-[17px] md:text-[20px]">
            No more stress-inducing semesters. Ask our chatbot to find a
            professor that matches how you study.
          </h3>
        </div>
        <div className="relative z-20 flex flex-col sm:flex-row w-full sm:w-10/12 mt-10 sm:mt-16 items-center text-center sm:text-left sm:mb-8 text-gray-800">
          <h3 className="text-[15px] sm:text-[17px] md:text-[20px] sm:mr-4 md:mr-7 mb-4 sm:mb-0">
            Write a review to help our chatbot learn. It’ll help your peers make
            the right decision too!
          </h3>
          <FaPen className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </div>
      </main>
      <footer className="text-center py-4 mt-10 text-gray-800">
        <p>
          © 2024{" "}
          <a href="/" className="hover:underline">
            profAI
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
