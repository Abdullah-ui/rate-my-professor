"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Review from "@/components/Review";
import sampleReviews from "../../reviews.json";
import { MdAddBox } from "react-icons/md";
import ReviewModal from "@/components/ReviewModal";

function Page() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Header></Header>
      <div className="w-9/12 mx-auto">
        <MdAddBox
          className="ml-auto w-8 h-8 mt-3 hover:fill-slate-500 cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
        {openModal && <ReviewModal closeModal={setOpenModal} />}
        {sampleReviews.map((review) => {
          return (
            <Review
              key={review.professor.lastName}
              name={`${review.professor.firstName} ${review.professor.lastName}`}
              date={review.date}
              review={review.review}
            ></Review>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
