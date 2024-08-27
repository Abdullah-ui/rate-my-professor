"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Review from "@/components/Review";
import { MdAddBox } from "react-icons/md";
import ReviewModal from "@/components/ReviewModal";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase";

function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    updateReviews();
  }, [reviews]);

  const updateReviews = async () => {
    const snapshot = await query(collection(firestore, "reviews"));
    const docs = await getDocs(snapshot);

    const reviewList = [];
    docs.forEach((doc) => {
      reviewList.push({
        ...doc.data(),
      });
    });
    setReviews(reviewList);
    console.log("list: ", reviewList);
  };

  return (
    <div>
      <Header reviews={reviews} />
      <div className="w-9/12 mx-auto">
        <MdAddBox
          className="ml-auto w-8 h-8 mt-3 hover:fill-slate-500 cursor-pointer"
          onClick={() => {
            setOpenModal(true);
            console.log("clicked");
          }}
        />
        {openModal && <ReviewModal closeModal={setOpenModal} />}
        {reviews.map((review, index) => {
          return (
            <Review
              key={index}
              name={review.professorName}
              date={review.date}
              review={review.reviewContent}
            />
          );
        })}
      </div>
      <footer className="text-center py-4">
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

export default Page;
