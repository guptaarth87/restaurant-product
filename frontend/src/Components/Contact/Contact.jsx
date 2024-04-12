import React from 'react';
import basicInfo from '../../ConfigData/InfoData';

const Contact = () => {
  return (
    <div id='contact' className="container mt-5">
        <div className="text-center heading">Contact Us</div>
      <div className="row mt-4">
        <div className="col-md-6 ">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.4173816539364!2d76.23432027511808!3d23.839308278609806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3964b9d419b9c4cd%3A0xda40e73670810b61!2sMAA%20BAGLAMUKHI%20RESORT!5e0!3m2!1sen!2sin!4v1710499366219!5m2!1sen!2sin" 
            width="100%"
            height="210px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className='rounded-4'
          ></iframe>
        </div>
        <div className="col-md-6">
          <div className="card p-4">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <p className="card-text"><strong>Phone : </strong> {basicInfo.Mobile_number}</p>
              <p className="card-text"><strong>Email : </strong>{basicInfo.email}</p>
              <p className="card-text"><strong>Address : </strong> {basicInfo.Address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
