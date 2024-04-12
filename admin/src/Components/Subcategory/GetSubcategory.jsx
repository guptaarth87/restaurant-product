import React, { useState, useEffect } from 'react';
import API_URL from '../../_helper';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Subcategory.css'
export default function GetSubcategory() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    // Extract category and subcategory values from URL
    const category_ = searchParams.get('category');
    console.log(category_);

    const [categoryData, setcategoryData] = useState([]);
    const [deleteModal , setdeleteModal] = useState(false);
    const [DeleteItemId, setDeleteItemId] = useState('');
    
    const navigate = useNavigate();
    useEffect(() => {
      // Fetch menu data from API endpoint
      fetchcategoryData();
    }, []);
  
    const fetchcategoryData = async () => {
      try {
        const response = await fetch(`${API_URL}getsubcategory/${category_}`); // Replace this URL with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setcategoryData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
  
    const handleDelete = (id)=>{
      console.log(id);
          setdeleteModal(true);
          setDeleteItemId(id);
    }
  
    const handleNavigation= (category_name, subcategory_name)=>{
         navigate(`/menu?category=${category_name}&subcategory=${subcategory_name}`);
  
    }
  
    const handleCancel=()=>{
      setdeleteModal(false);
    }
    const handleConfirmDelete = ()=>{
      setdeleteModal(false);
      try{
        axios.delete(`${API_URL}deletesubcategory/${DeleteItemId}`).then(()=>{
          alert("Category deleted successfully")
          window.location.reload();
        });
      }catch(e){
        alert("server error");
      }
     
    }
  return (
    <>
       <h1>Sub categories</h1>
      <div className="menu-container">
        {
          deleteModal?
          <>
          <div className="col-4 p-4 card ml-0 mr-0 mx-auto">
            <h3 className='just'>Confirm that you want to delete this subcategory.</h3>
            <div className="row">
            <button className='btn btn-danger m-2 col-5' onClick={()=>{handleConfirmDelete()}}>confirm delete</button>
            <button className='btn btn-secondary m-2 col-6' onClick={handleCancel}>Cancel delete</button>
            </div>
          </div>
          </>
          :
<div className="row">
        {categoryData.map(item => (
          <div key={item._id.$oid} className="p-3 menu-card card col-lg-3 col-md-5 col-sm-10 m-2 " >
            <img src={item.imageUrl} alt={item.subcategory_name} className='imageControl'/>
            <div className="menu-details">
              <h2>{item.subcategory_name}</h2>
             
            </div>
            <div className="row">
            <button className="col-5 btn btn-danger m-2" onClick={()=>{handleDelete(item._id)}}>Delete item</button>
            <button className="col-5 btn btn-info m-2" onClick={()=>{handleNavigation(item.subcategory_of , item.subcategory_name )}}>Select subcategory</button>
            </div>
           </div>
        ))}
        </div>
        }
        
      </div>
    </>
  )
}
