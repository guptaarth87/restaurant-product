import React, { useState } from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {HashLink} from 'react-router-hash-link';
import BasicInfo from '../../ConfigData/InfoData'
import { MdArrowBackIosNew } from "react-icons/md";
import Logo from '../../assets/Logo/Logo.jpeg';
// menu icons
import { BiSolidDrink } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";
import { PiBeerBottleFill } from "react-icons/pi";
import { MdFoodBank } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { FaPizzaSlice } from "react-icons/fa6";
import { BiSolidSushi } from "react-icons/bi";
import { LuSoup } from "react-icons/lu";
import { FaIceCream } from "react-icons/fa";
import { FaBowlingBall } from "react-icons/fa6";

import Bell_Gif from '../../assets/Navbar/icons8-bell.gif'

import { useLocation  } from 'react-router-dom';

import './Navbar.css'
import { Link } from 'react-router-dom';

import FeedbackPopup from "../Popup/FeedbackPopup"


const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    const handleClose = () => setToggle(false);
  const handleShow = () => setToggle(true);

  const location = useLocation();


  // show feedback popup 
  const [showPopUp , setShowPopUp] = useState(false)

  const openPopUp = () =>{
     setShowPopUp(true)
  }
 
  const closePopUp = () =>{
     setShowPopUp(false)
  }


 


  return (
    <>


    {/* pop starts */}

    {showPopUp && <FeedbackPopup closePopUp={closePopUp} ></FeedbackPopup>}


    {/* pop ends */}

        <div className='bg-light w-100 d-flex justify-content-between align-items-center  px-4 nav-drop-shadow   py-4 fixing-navs'>
             {/* div 1 */}
             <div className='d-flex justify-content-center align-items-baseline gap-4 mt-2'>
             
            { location.pathname === "/menupage" ? <Link style={{"textDecoration" : "none", "color" : "black"}} to="/"><MdArrowBackIosNew></MdArrowBackIosNew> back</Link> : <RiMenu2Fill  onClick={handleShow} className=''/> }  
          
             
             <p className='fs-4 '>
               <img className='logo-control' src={Logo} alt="Logo" />
             </p>
             </div>

             {/* div 2*/}
             <div className='d-none d-md-flex justify-content-center align-items-center gap-5 mt-3'>

              <p className='nav-links' >
              <HashLink to="/#gallery"   > Gallery </HashLink>
              </p> 
             
              <p className='nav-links' >
              <HashLink to="/#about"> About </HashLink>
              </p> 
              <p className='nav-links' >
              <HashLink to="/#contact"> Contact </HashLink>
              </p> 
            
             </div>

             {/* div 3 */}
             <div className='d-flex '>
            <img onClick={openPopUp} className='nav-bell' src={Bell_Gif} alt="" />
            <Link to={`https://wa.me/${BasicInfo.nav_whatsapp_number}`}><IoLogoWhatsapp className='text-success fs-3 mx-3'/></Link>

             </div>
        </div>



        <Offcanvas show={toggle} onHide={handleClose} >
      
        <Offcanvas.Header closeButton>
        {/* <img className='logo-control col-5 m-2 ' src={Logo} alt="Logo" /> */}
      
          <Offcanvas.Title> <p className='fw-bold '> MaaBagla Mukhi Resort</p></Offcanvas.Title>
         
        </Offcanvas.Header>
       <Offcanvas.Body>

        <p className='sidebar-menu-links card-heading-text' onClick={handleClose}>
              <HashLink to="/#gallery"> Gallery </HashLink>
              </p> 
              <p className='sidebar-menu-links card-heading-text'  onClick={handleClose}>
              <HashLink to="/#about"> About </HashLink>
              </p> 
              <p className='sidebar-menu-links card-heading-text'  onClick={handleClose}>
              <HashLink to="/#contact"> Contact </HashLink>
              </p> 
             
             <p className=' card-heading-text'>Quick Menu :</p>

            <div className=' sidebar-nav card-description-text sidebar-quick-menu-items-container'>
               
                <Link onClick={handleClose} to={`/menupage?category=beverages`}> <p className='d-flex gap-1  align-items-baseline '><BiSolidDrink className=""  />Beverages</p></Link>
                <Link onClick={handleClose} to={`/menupage?category=fast food`}> <p className='d-flex gap-1 align-items-baseline'><FaHamburger className="" />Fast Food</p></Link>

                <Link  onClick={handleClose} to={`/menupage?category=cold drinks`}> <p className='d-flex gap-1 align-items-baseline'><PiBeerBottleFill className="" />Cold Drinks</p></Link>
                <Link onClick={handleClose} to={`/menupage?category=main course`}> <p className='d-flex gap-1 align-items-baseline'><MdFoodBank className="" />Main Course</p></Link>

                <Link onClick={handleClose} to={`/menupage?category=desserts`}> <p className='d-flex gap-1 align-items-baseline'><LuDessert className="" />Desserts</p></Link>
                <Link onClick={handleClose} to={`/menupage?category=starters`}> <p className='d-flex gap-1 align-items-baseline'><FaPizzaSlice className="" />Starters</p></Link>

                <Link onClick={handleClose} to={`/menupage?category=extras`} > <p className='d-flex gap-1 align-items-baseline'><BiSolidSushi className="" />Extras</p></Link>
                <Link  onClick={handleClose} to={`/menupage?category=south indian`}> <p className='d-flex gap-1 align-items-baseline'><LuSoup className="" />South Indian</p></Link>

                <Link onClick={handleClose} to={`/menupage?category=ice creams`}> <p className='d-flex gap-1 align-items-baseline'><FaIceCream className="" />Ice Creams</p></Link>
                <Link onClick={handleClose} to={`/menupage?category=thali`} > <p className='d-flex gap-1 align-items-baseline'><FaBowlingBall className="" />Thali</p></Link>
              
               
            </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Navbar