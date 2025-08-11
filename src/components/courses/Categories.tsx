import React from "react";
import { Link } from "react-router-dom";
import ComputerIcon from "../../assets/images/icons/computer-icon.svg";
import DevelopmentrIcon from "../../assets/images/icons/development-icon.svg";
import PhysicsIcon from "../../assets/images/icons/Physics-icon.svg";
import MarketingIcon from "../../assets/images/icons/Marketing-icon.svg";
import { lazy } from "react";

function Categories() {
  return (
    <div className="mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3>Top Categories</h3>
        <Link>See All</Link>
      </div>
      <div>
        <div>
          <img src={ComputerIcon} alt="Computer" loading={lazy} />
          <h4>Computer</h4>
          <p>11 Courses</p>
        </div>
      </div>
    </div>
  );
}

export default Categories;
