import React , {useRef , useEffect} from 'react'
import "./FeedbackPopup.css"

import BasicInfo from '../../ConfigData/InfoData'
import { Link } from 'react-router-dom';

export default function FeedbackPopup({closePopUp}) {

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopUp()   // Close the popup when clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopUp]);


  return (
     <>
         <div className="popup-container">
      <div  ref={popupRef} className="popup-content">
        
        <h2 className='pop-heading'>Please leave your review on WhatsApp</h2>
        <p className='subheading1 my-2 mb-5 mb-sm-5 my-sm-5 my-md-3 my-lg-3'>Click below to go to WhatsApp and leave your review.</p>
        <Link to={`https://wa.me/${BasicInfo.nav_whatsapp_number}`} className="btn btn-success popup-heading-text">Go to WhatsApp</Link>
        <span onClick={closePopUp} className="close-btn" >&times;</span>
      </div>
    </div>
     </>
  )
}
