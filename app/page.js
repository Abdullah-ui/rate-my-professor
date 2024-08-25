import Header from "@/components/Header";
import { FaSearch, FaPen } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center font-body w-full px-4 sm:w-3/4 md:w-1/2 mx-auto mt-16 sm:mt-28">
        <div className="text-[28px] sm:text-[32px] md:text-[38px] text-center w-full sm:w-10/12 sm:mb-16">
          <h2>
            Finding the <u>right professor</u> just got a lot easier.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-10/12 mt-20 sm:mt-40 items-center text-center sm:text-left sm:mb-8">
          <FaSearch className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 sm:mr-6 md:mr-10 mb-4 sm:mb-0" />
          <h3 className="text-[20px] sm:text-[22px] md:text-[25px]">
            No more stress-inducing semesters. Ask our chatbot to find a
            professor that matches how you study.
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-10/12 mt-10 sm:mt-16 items-center text-center sm:text-left sm:mb-8">
          <h3 className="text-[20px] sm:text-[22px] md:text-[25px] sm:mr-4 md:mr-7 mb-4 sm:mb-0">
            Write a review to help our chatbot learn. It’ll help your peers make
            the right decision too!
          </h3>
          <FaPen className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </div>
      </main>
      <br></br>
      <footer className="text-center py-4">
        <p>
          © 2024{" "}
          <a href="https://yourwebsite.com" className="hover:underline">
            profAI
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
