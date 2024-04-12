import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../_helper';
import { useLocation } from 'react-router-dom';

const AddMenuForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract category and subcategory values from URL
  const category_ = searchParams.get('category');
  const subcategory_ = searchParams.get('subcategory');

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [itemCategory, setItemCategory] = useState(category_);
  const [itemSubcategory, setItemSubcategory] = useState(subcategory_);
  const [itemImg, setItemImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Item Name:', itemName);
    console.log('Item Price:', itemPrice);
    console.log('Is Vegetarian:', isVeg);
    console.log('Item Category:', itemCategory);
    console.log('Item Subcategory:', itemSubcategory);
    console.log('Item Image:', itemImg);
    // You can add logic to send data to backend here

    let data = {
      "item_name":itemName,
      "item_price":itemPrice,
      "veg":isVeg,
      "item_category":itemCategory,
      "item_subcategory":itemSubcategory,
      "image":itemImg
    }

    try {
      const response = await axios.post(`${API_URL}uploadmenu`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("Menu data added successfully");
      window.location.reload();
      // Perform any other actions after successful submission
    } catch (error) {
      alert("ERROR");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Menu Item in {subcategory_}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="item_name" className="form-label">Item Name</label>
          <input type="text" className="form-control" id="item_name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="item_price" className="form-label">Item Price</label>
          <input type="text" className="form-control" id="item_price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="veg" className="form-label">Vegetarian</label>
          <select className="form-select" id="veg" value={isVeg} onChange={(e) => setIsVeg(e.target.value === 'true')} required>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      
        <div className="mb-3">
          <label htmlFor="item_img" className="form-label">Upload Image</label>
          <input type="file" className="form-control" id="item_img" onChange={(e) => setItemImg(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenuForm;
