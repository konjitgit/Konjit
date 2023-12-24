import React from "react";
import { FaStar } from "react-icons/fa";
import {AiFillDislike,AiFillLike} from  "react-icons/ai";
function Rating({ value }) {
  const roundedValue = Math.round(value * 2) / 2;

  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (i < roundedValue) {
      return <FaStar style={{ color: "yellow" }} className="full" />;
    } else if (i === roundedValue && value % 1 !== 0) {
      return <FaStar style={{ color: "yellow" }} className="half" />;
    } else {
      return <FaStar style={{ color: "yellow" }} className="empty" />;
    }
  });

  return <p className="rating flex">{stars}</p>;
}
function ReviewCard({ review }) {

  return (
    <div className="p-4 w-full flex flex-col gap-3">
      <div className="flex gap-2 items-center font-bold">
        {review.text}
        <Rating value={review.rating} />
      </div>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        voluptas fuga saepe, excepturi assumenda sed suscipit perferendis
        corporis molestias tenetur exercitationem cupiditate maxime libero sunt
        rerum at, numquam, similique rem!
      </p>
      <p className="font-bold">
        {review.createdAt} by {review.user} **Verified Purchase**
      </p>
      <p className="text-gray-500 pt-4">Was this helpful?</p>
      <div className="flex items-center gap-4 pt-10 pb-10">
        <button className="border-2  p-2 flex gap-2 items-center">
          <AiFillLike />
          Yes (0)
        </button>
        <button className="border-2 p-2 flex gap-2 items-center">
          <AiFillDislike />
          No (0)
        </button>
        <p className="text-gray-700 p-2">Report this review?</p>
      </div>
      <hr className="h-0.5 mt-10 bg-gray-600" />
    </div>
  );
}

export default ReviewCard;
