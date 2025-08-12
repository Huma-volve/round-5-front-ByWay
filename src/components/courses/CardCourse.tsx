import React from "react";
import productImg from "../../assets/images/ui-product.png";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import { courses } from "@/data/BrowseCourses";
function CardCourse() {
  return (
    <div>
      <div>
        <img
          className="w-full border border-[--category] rounded-lg"
          src={productImg}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="border w-full border-[--category] rounded-2xl mt-3 px-4 py-3">
        <h5 className="font-[600] text-xl">UI/UX Design</h5>
        <p className="text-sm my-2 text-[--secondary-dark]">By Omnya Ali</p>
        <div className="flex items-center">
          <img src={StarIcon} alt="" />
          <span className="text-md font-[600] ml-2">(1200 Ratings)</span>
        </div>
        <p className="text-md my-4 truncate">
          22 Total Hours. 155 Lectures. Beginner
        </p>
        <div className="flex justify-between items-center text-xl font-[600]">
          <h4 className="">499 EGP</h4>
          <button className="bg-[--success] py-1 px-2 rounded-lg text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCourse;
