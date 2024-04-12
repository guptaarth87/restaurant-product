import React, { useState, useEffect } from 'react';
import API_URL from '../../_helper';
import axios from 'axios';
import ModifyMenuForm from './ModifyMenuForm';
import { useLocation } from 'react-router-dom';

function GetMenu() {
  const [menuData, setMenuData] = useState([]);
  const [deleteModal , setdeleteModal] = useState(false);
  const [DeleteItemId, setDeleteItemId] = useState('');
  const [modifyFormModel, setmodifyFormModel] = useState(false);
  const [modifyData , setmodifyData] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract category and subcategory values from URL
  const category_ = searchParams.get('category');
  const subcategory_ = searchParams.get('subcategory');


  useEffect(() => {
    // Fetch menu data from API endpoint
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {

    try {

      const response = await axios.get(`${API_URL}getmenu?category=${category_}&subcategory=${subcategory_}`); // Replace this URL with your actual API endpoint
      // const data = await response.json();
      const data = response;
      console.log(data);
      setMenuData(response.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const handleDelete = (id)=>{
    console.log(id);
        setdeleteModal(true);
        setDeleteItemId(id);
  }

  const handleModify = (data_)=>{
    setmodifyFormModel(true);
    console.log(data_);
    setmodifyData(data_); 

  }

  const handleCancel=()=>{
    setdeleteModal(false);
  }
  const handleConfirmDelete = ()=>{
    setdeleteModal(false);
    try{
      axios.delete(`${API_URL}deletemenu/${DeleteItemId}`).then(()=>{
        alert("Item deleted successfully")
        window.location.reload();
      });
    }catch(e){
      alert("server error");
    }
   
  }
  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="menu-container">
        {
    
          deleteModal?
          <>
          <div className="col-4 p-4 card ml-0 mr-0 mx-auto">
            <h3 className='just'>Confirm that you want to delete this item.</h3>
            <div className="row">
            <button className='btn btn-danger m-2 col-5' onClick={()=>{handleConfirmDelete()}}>confirm delete</button>
            <button className='btn btn-secondary m-2 col-6' onClick={handleCancel}>Cancel delete</button>
            </div>
          </div>
          </>
          :
<div className="row">
        {menuData.map(item => (
          <div key={item._id.$oid} className="p-3 menu-card card col-lg-3 col-md-5 col-sm-10 m-2" >
            {
              item.imageUrl?
              <img src={item.imageUrl} alt={item.item_name} className='col-10'/>
           :
           <>
           </>
            }
            <div className="menu-details">
              <h2>{item.item_name}</h2>
              <p>Price: {item.item_price} INR</p>
              <p>Category: {item.item_category}</p>
              <p>Subcategory: {item.item_subcategory}</p>
            </div>
            <button className="btn btn-danger m-2" onClick={()=>{handleDelete(item._id)}}>Delete item</button>
          </div>
        ))}
        </div>
        }
        
      </div>
    </div>
  );
}

export default GetMenu;
