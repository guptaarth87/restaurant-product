import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './MenuComponent.css';
import axios from 'axios';
import API_URL from '../../_helper';

import Sample from '../../assets/footer/footer-bg.jpg'

import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

// img
import Beverages from '../../assets/Category_Img/Beverages.jpg';
import ColdDrinks from '../../assets/Category_Img/Cold Drinks.jpg';
import Desserts from '../../assets/Category_Img/Desserts.jpg';
import FastFood from '../../assets/Category_Img/Fast Food.jpg';
import IceCreams from '../../assets/Category_Img/Ice Creams.jpg';
import MainCourse from '../../assets/Category_Img/Main Course.jpg';
import SouthIndian from '../../assets/Category_Img/South Indian.jpg';
import Starters from '../../assets/Category_Img/Starters.jpg';
import Thali from '../../assets/Category_Img/Thali.jpg';


// carausal
import Slider from "react-slick";

const MenuComponent1 = ({ menu }) => {
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

  // imgae array
  // const [categoryImg , setCategoryImg] = useState([])
  const arrayImage = {
    "Beverages": Beverages,
    "Extra": FastFood,
    "Cold Drinks": ColdDrinks,
    "Desserts": Desserts,
    "Fast Food": FastFood,
    "Ice Creams": IceCreams,
    "Main Course": MainCourse,
    "South Indian": SouthIndian,
    "Starter": Starters,
    "Thali": Thali
  };
  
  // 


  const fetchData = async () => {
    try {

      console.log("the selected category is : " + selectedCategory)
      const response = await axios.get(`${API_URL}getsubcategory/${selectedCategory}`);
      setSubcategoryData(response.data);

      getSubcategoriesImages(selectedCategory)

    } catch (error) {
      console.error('Error fetching subcategory data:', error);
    }
  };
  useEffect(() => {
    fetchData();

  }, [selectedCategory]);

  // Extract unique subcategories based on selected category
  const getSubcategories = (category) => {
    const subcategories = menu
      .filter(item => item.item_category === category)
      .map(item => item.item_subcategory);
    return [...new Set(subcategories)];
  };


  const getSubcategoriesImages = async (category) => {
    const response = await axios.get(`${API_URL}getsubcategory/${category}`);
    setSubcategoryData(response.data);
    console.log(response.data)

    return response.data
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


  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };


  return (
    <div className="container">

      <h2 className="text-center mt-4 heading">Other Menu Categories</h2>
<br></br>
      <div className='slider-upper-container'>


        <div className="row mt-4 slider-main-div position-relative">

          <Slider ref={slider => {
            sliderRef = slider;
          }} {...settings}>

            {categories.map((category, index) => (
              <div className=" col-sm-4 col-lg-2 col-md-3 mb-3 d-flex flex-column justify-content-center align-items-center menu-carousal-card-div px-2" key={index}>
                <div className={`card ${selectedCategory === category ? "shadow-lg rounded transform scale-150 text-white" : ""}`} onClick={() => handleCategoryClick(category)}>
                  <img className="imageControl" src={arrayImage[category]} />

                </div>

                <div className={`card-body menu-carousal-card-heading-div ${selectedCategory === category ? " bg-warning" : " "} `} onClick={() => handleCategoryClick(category)}>
                  <p className="card-title card-heading-text">{category}</p>
                </div>
              </div>
            ))}

          </Slider>


          {/* buttons */}
          <div style={{ textAlign: "center" }}>
            <p className="button slider-previous-btn" onClick={previous}>
              <FaCircleArrowLeft />
            </p>
            <p className="button slider-next-btn" onClick={next}>
              <FaCircleArrowRight />
            </p>
          </div>

        </div>

      </div>

      <hr />
      <div className="row mt-4 mb-5">
        <div className="col">
          <h2 className="text-center heading">Menu</h2>
          <p className='card-heading-text '>Results for {selectedCategory}</p>
          {selectedCategory && (
            <div className="accordion menu-accordion" id="accordionSubcategories">
              {getSubcategories(selectedCategory).map((subcategory, idx) => {
                const image = subcategoryData.find(item => item.subcategory_name === subcategory);
                console.log(image)
                return (
                  <div className="accordion-item" key={idx}>
                    <h2 className="accordion-header menu-accordion-header" id={`heading${idx}`}>
                      <button
                        className="accordion-button menu-accordion-button"
                        type="button"
                        onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory)}
                        aria-expanded={selectedSubcategory === subcategory ? "true" : "false"}
                        aria-controls={`collapse${idx}`}

                      >
                        <p className='menu-subcategory-heading'>
                          <img className='subcategory-img' src={image ? image.imageUrl : Sample} alt="" /> {subcategory}</p>
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
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuComponent1