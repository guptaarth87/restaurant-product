import React from 'react';
import { GoGoal } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";

const MissionVision = () => {
  return (
    <div id='about' className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="heading"> <GoGoal/> Mission</h2>
          <p className="card-description-text">We are committed to providing the best food services in town by offering delicious and high-quality meals prepared with fresh ingredients and exceptional customer service.</p>
        </div>
        <div className="col-md-6">
          <h2 className="heading"> <BsGraphUpArrow /> Vision</h2>
          <p className="card-description-text">Our vision is to become the top choice for dining experiences, known for our excellence in food quality, innovation in culinary techniques, and dedication to customer satisfaction.</p>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
