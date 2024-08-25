import Header from "@/components/Header";
import { FaSearch, FaPen } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div class="flex flex-col justify-center items-center font-body w-1/2 mx-auto mt-28 ">
        <div class="text-[38px] text-center w-10/12">
          <h2>
            finding the <u>right professor</u> just got a lot easier.
          </h2>
        </div>
        <div class="flex w-10/12 mt-40">
          <FaSearch class="w-1/2 h-1/2" />
          <h3 class="text-[24px] mb-28 ml-10">
            no more stress-inducing semesters. ask our chatbot to find a
            professor that matches how you study.
          </h3>
        </div>
        <div class="flex w-10/12">
          <h3 class="text-[24px] mr-10 mb-36">
            write a review to help our chatbot learn. it’ll help your peers make
            the right decision too!
          </h3>
          <FaPen class="w-1/3 h-1/3" />
        </div>
        <h4 class="mb-3">made by fasia, mariam, emujin, and afnan</h4>
      </div>
    </div>
  );
}
