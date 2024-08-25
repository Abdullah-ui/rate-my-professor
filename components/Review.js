"use client";
import { useState } from "react";

function Review(props) {
  return (
    <div className="bg-slate-200 flex flex-col py-5 px-7 my-10">
      <div class="flex justify-between mb-3">
        <h3 class="text-xl">{props.name}</h3>
        <h6 class="mr-2">{props.date}</h6>
      </div>
      <p>{props.review}</p>
    </div>
  );
}

export default Review;
