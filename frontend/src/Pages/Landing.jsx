import React , {useEffect} from 'react'
import Hero from '../Components/Hero/Hero'
import ProductCategoryDisplay from '../Components/ProductCategoryDisplay/ProductCategoryDisplay'
import GallaryTabComponent from '../Components/Gallary/GallaryTabComponent'
import MissionVision from '../Components/BrandingComponents/MissionVission'
import Contact from '../Components/Contact/Contact'
import Footer from '../Components/Footer/Footer'
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import BrandingImg from '../assets/Branding/BrandingImg.png';
import API_URL from '../_helper'
import axios from 'axios'
export default function Landing() {

  // useEffect( async () => {
     
  //   const response = await axios.get(`${API_URL}getallmenu`)
  //   console.log(response)
    
  // }, [])



  useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        // Make GET request to API endpoint
        // const response = await axios.get('https://api.example.com/data');
        const response = await axios.get(`${API_URL}getallmenu`)
        // Set fetched data to state
        
        // Set loading state to false once data is fetched
        
      } catch (error) {
        // Set error state if request fails
        alert(error);
        // Set loading state to false in case of error
        
      }
    };

   
    fetchData();

    
   
  }, []);


  return (
   <>
   {/* <h7>Sample navigation</h7><br></br> */}
   {/* <Link to="/menupage?category=Fast Food" >Go to details page</Link> */}
   {/* <HashLink to="#gallery">Gallery</HashLink> */}
   <Hero/>
   <div className="container" style={{"top":"20rem"}}>
 <ProductCategoryDisplay/>
 <div className="text-center">
  <div className="row">
 <img src={BrandingImg} className='col-lg-10 col-md-12 col-sm-12 text-center' />
 </div>
 </div>
<GallaryTabComponent/>
<MissionVision/>
<Contact/>
 </div>
 <Footer/>
   </>
  )
}
