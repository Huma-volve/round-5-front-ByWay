import React from "react";
import { Link } from "react-router-dom";
import ComputerIcon from "../../assets/images/icons/computer-icon.svg";
import DevelopmentrIcon from "../../assets/images/icons/development-icon.svg";
import PhysicsIcon from "../../assets/images/icons/Physics-icon.svg";
import MarketingIcon from "../../assets/images/icons/Marketing-icon.svg";
import { lazy } from "react";

function CategoriesCourses() {
  return (
    <div className="mx-10 mt-12">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-semibold">Top Categories</h3>
        <Link className="text-[var(--category-icon)] text-sm">See All</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        <div className="flex flex-col cursor-pointer items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 w-full max-w-[350px]">
          <div className="border rounded-full p-7 bg-[--category]">
            <img src={ComputerIcon} alt="Computer" loading="lazy" />
          </div>
          <h4 className="my-2">Computer</h4>
          <p>11 Courses</p>
        </div>
      </div>
    </div>
  );
}

export default CategoriesCourses;
