import React from "react";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import VideoIcon from "../../assets/images/icons/VideoIcon.svg";

function CourseDetails() {
  return (
    <div className="md:mx-24 mx-5 mt-12">
      <div className="flex mb-14">
        <p className="text-sm md:text-lg">Browse Courses</p>
        <p className="mx-4 font-[600] text-sm md:text-lg">{">"}</p>
        <p className="text-[--rate] text-sm md:text-lg">Details Courses</p>
      </div>
      <div>
        <h3 className="text-[--rate] font-[600] text-2xl">UI/UX Design</h3>
        <p className="secondary-dark mt-1 mb-5">Created by Omnya Ali</p>
        <p className="text-xl font-[600]">
          Introduction to user interface and user experience design
        </p>
        <p className="text-[--secondary] my-2">
          Begin your journey in user interface and user experience design.
          You'll learn to design wireframes, user flows, and interactive
          prototypes using Figma.
        </p>
        <p className="text-lg font-[500]">Duration: 7 weeks</p>
        <div className="flex items-center gap-3 my-4">
          <p className="text-white px-2 rounded-lg bg-[--secondary]">
            Bestseller
          </p>
          <p>(1200 Ratings)</p>
          <img src={StarIcon} alt="StarIcon" />
        </div>
        <div>
          <p className="text-xl font-[600] text-[--success]">400 EGP</p>
          <button className="mt-3 mb-7 px-20 py-2 text-white bg-[--success] text-lg md:text-xl rounded-lg w-full sm:w-auto">
            Buy Now
          </button>{" "}
          <p className="mt-3 mb-7 border-[--rate] px-7 py-1 border text-lg md:text-xl rounded-lg w-fit">
            Content
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-14 border w-fit py-3 px-7 rounded-xl mb-8">
          <img className="w-7 md:w:10" src={VideoIcon} alt="VideoIcon" />
          <p className="md:text-xl text-md font-[500]">
            Lesson 1: Introduction to UI/UX
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
