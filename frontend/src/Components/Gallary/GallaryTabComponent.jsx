import React, { useState } from 'react';
import Img1 from '../../assets/Food_Img/1.jpeg';
import Img2 from '../../assets/Food_Img/2.jpg';
import Img3 from '../../assets/Food_Img/3.jpg';
import Img4 from '../../assets/Food_Img/5.jpg';

import ImgAmb1 from '../../assets/Ambiance_Img/1.jpg';
import ImgAmb2 from '../../assets/Ambiance_Img/2.jpg';
import ImgAmb3 from '../../assets/Ambiance_Img/3.jpg';
import ImgAmb4 from '../../assets/Ambiance_Img/4.jpg';

import FastFood from '../../assets/Category_Img/Fast Food.jpg';
import './GallaryTabComponent.css';
const GallaryTabComponent = () => {
  const [activeTab, setActiveTab] = useState('ambiance');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5" id="gallery">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`heading nav-link ${activeTab === 'ambiance' ? 'active' : ''}`} onClick={() => handleTabClick('ambiance')}>Ambiance</button>
        </li>
        <li className="nav-item">
          <button className={`heading nav-link ${activeTab === 'food' ? 'active' : ''}`} onClick={() => handleTabClick('food')}>Food</button>
        </li>
      </ul>
      <div className="tab-content mt-4">
        {activeTab === 'ambiance' && (
          <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
          <img src={ImgAmb1} className="img-fluid gallary-img col-12" alt="Gallery 1" />
        </div>
        <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
          <img src={ImgAmb2} className="img-fluid gallary-img col-12" alt="Gallery 2" />
        </div>
        <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
          <img src={ImgAmb3} className="img-fluid gallary-img col-12" alt="Gallery 3" />
        </div>
        <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
          <img src={ImgAmb4} className="img-fluid gallary-img col-12" alt="Gallery 4" />
        </div>
    </div>
        )}
        {activeTab === 'food' && (
           <div className="row">
           <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
             <img src={Img1} className="img-fluid gallary-img col-12" alt="Gallery 1" />
           </div>
           <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
             <img src={Img2} className="img-fluid gallary-img col-12" alt="Gallery 2" />
           </div>
           <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
             <img src={Img3} className="img-fluid gallary-img col-12" alt="Gallery 3" />
           </div>
           <div className="col-lg-3 col-md-5 col-sm-3 mb-3">
             <img src={Img4} className="img-fluid gallary-img col-12" alt="Gallery 4" />
           </div>
         
         </div>
           
        )}
      </div>
    </div>
  );
};

export default GallaryTabComponent;
