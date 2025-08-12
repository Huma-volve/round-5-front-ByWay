import React from "react";
import { Link } from "react-router-dom";
import { lazy } from "react";
import { categories } from "../../data/BrowseCourses";

function CategoriesCourses() {
  return (
    <div className="mx-10 mt-12">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-semibold">Top Categories</h3>
        <Link className="text-[var(--category-icon)] text-sm">See All</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col cursor-pointer border border-[--category] items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 w-full"
          >
            <div className="border rounded-full p-7 bg-[--category]">
              <img src={category.icon} alt={category.name} loading="lazy" />
            </div>
            <h4 className="my-2">{category.name}</h4>
            <p>{category.courses} Courses</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesCourses;
