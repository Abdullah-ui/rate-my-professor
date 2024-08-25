"use client";
import Header from "@/components/Header";
import Review from "@/components/Review";
import sampleReviews from "../../reviews.json";

function page() {
  return (
    <div>
      <Header></Header>
      <div class="w-9/12 mx-auto">
        {sampleReviews.map((review) => {
          return (
            <Review
              key="review"
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

export default page;
