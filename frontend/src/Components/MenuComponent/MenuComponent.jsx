import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MenuComponent.css';
import axios from 'axios';
import API_URL from '../../_helper';

import Sample from '../../assets/footer/footer-bg.jpg'


// carausal
import Slider from "react-slick";

const MenuComponent = ({ menu }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [subcategoryData, setSubcategoryData] = useState([]);

  // Extract categories from menu
  const categories = [...new Set(menu.map(item => item.item_category))];



  // loader : 
  // usestate -> isloading = true
  // 
  // 

  const fetchData = async () => {
    try {
      console.log("the selected category is : " + selectedCategory)
      const response = await axios.get(`${API_URL}getsubcategory/${selectedCategory}`);
      setSubcategoryData(response.data);
      console.log("fetched subcategory data");
      console.log(subcategoryData);
    } catch (error) {
      console.error('Error fetching subcategory data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  
  },[selectedCategory]);
  
  // Extract unique subcategories based on selected category
  const getSubcategories = (category) => {
    const subcategories = menu
      .filter(item => item.item_category === category)
      .map(item => item.item_subcategory);
    return [...new Set(subcategories)];
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? category : category);
    setSelectedSubcategory(null); // Reset subcategory selection when changing category
  };



  // carousal setting
  const settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  return (
    <div className="container">
       
      <h2 className="text-center mt-4 heading">Menu Categories</h2>
      <div className="row mt-4">

         <Slider {...settings}>

         {categories.map((category, index) => (
          <div className=" col-sm-4 col-lg-2 col-md-3 mb-3 d-flex flex-column justify-content-center align-items-center menu-carousal-card-div px-2" key={index}>
            <div className={`card ${selectedCategory === category ? "shadow-lg rounded transform scale-150 text-white" : ""}`} onClick={() => handleCategoryClick(category)}>
              <img className="imageControl" src={`../../src/assets/Category_Img/${category}.jpg`}/>
              
            </div>

            <div className={`card-body menu-carousal-card-heading-div ${selectedCategory === category ? " bg-warning" : " "  } `}>
                <p className="card-title card-heading-text">{category}</p>
              </div>
          </div>
        ))}

         </Slider>

       
      </div>
      <hr />
      <div className="row mt-4 mb-5">
        <div className="col">
          <h2 className="text-center heading">Menu</h2>
          <p className='card-heading-text '>Results for {selectedCategory}</p>
          {selectedCategory && (
            <div className="accordion menu-accordion" id="accordionSubcategories">
              {getSubcategories(selectedCategory).map((subcategory, idx) => (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header menu-accordion-header" id={`heading${idx}`}>
                    <button
                      className="accordion-button menu-accordion-button"
                      type="button"
                      onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory)}
                      aria-expanded={selectedSubcategory === subcategory ? "true" : "false"}
                      aria-controls={`collapse${idx}`}
                   
                   >
                    <p className='menu-subcategory-heading'> <img className='subcategory-img' src={Sample} alt="" /> {subcategory}</p>  
                    </button>
                  </h2>
                  <div
                    id={`collapse${idx}`}
                    className={`accordion-collapse collapse ${selectedSubcategory === subcategory ? "show" : ""}`}
                    aria-labelledby={`heading${idx}`}
                    data-bs-parent="#accordionSubcategories"
                  >
                    <div className="accordion-body">
                      <ul className="list-group">
                        {menu.filter(item => item.item_category === selectedCategory && item.item_subcategory === subcategory).map((item, i) => (
                          


                          <li key={i} className="list-group-item  bg-warning mt-1   rounded-4 d-flex  justify-content-between align-items-center">
                            
                            <p className='fw-bold'>{item.item_name} </p>
                            <p className='fw-bold'>{item.item_price} INR</p>
                          </li>



                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;