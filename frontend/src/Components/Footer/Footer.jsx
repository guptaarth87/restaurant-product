import React from 'react';
import './Footer.css'
import basicInfo from '../../ConfigData/InfoData';
import { IoLogoWhatsapp } from "react-icons/io";
import Logo from '../../assets/Logo/Logo.jpeg';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
     <>

<footer className="bg-dark text-light py-4 mt-4 rounded-top-5 footer-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          <img className='logo-control img-fluid mb-3' src={Logo} alt="Logo" style={{ maxHeight: '50px' }}/>
            <p style={{color : "white"}} className='card-heading-text'>{basicInfo.Restaurant_name}</p>
            <p style={{color : "white", marginTop : "-10px"}} className='card-description-text'>A place to savor the best flavors!</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color : "white"}} className='card-heading-text'>Contact Us</h5>
            <p style={{color : "white", marginTop : "15px"}} className='card-description-text'><i className="fas fa-envelope"></i> {basicInfo.email}</p>
            <p style={{color : "white", marginTop : "-12px"}} className='card-description-text'><i className="fas fa-phone"></i> {basicInfo.Mobile_number}</p>
            <p style={{color : "white", marginTop : "-12px"}} className='card-description-text'><i className="fas fa-map-marker-alt"></i> {basicInfo.Address}</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color : "white"}} className='card-heading-text'>Connect With Us</h5>
            <div>
              <br></br>
              <a href="#"><i className="fab fa-facebook fa-lg mr-3"> </i></a>
              <Link to={`https://wa.me/${basicInfo.nav_whatsapp_number}`}><h5 className='text-white'>Via WhatsApp</h5></Link>

              <a href="#"><i className="fab fa-twitter fa-lg mr-3"></i></a>
              <a href="#"><i className="fab fa-instagram fa-lg"></i></a>
            </div>
          </div>
        </div>
      </div>


    {/* hr
       <div className='footer-line'>

       </div>

       <div>
          <p>Copyright 2024 Maa Baglamukhi Resort </p>
          <p>License Number : 11234988221</p>
          <p>Powered By : Data Salt</p>

       </div> */}

    </footer>

     </>
   
  );
};

export default Footer;
