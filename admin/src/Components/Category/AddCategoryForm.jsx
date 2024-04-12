import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../_helper';


export default function AddCategoryForm() {
  const [itemName, setItemName] = useState('');
  const [itemImg, setItemImg] = useState(null);
  const [itemTagline , setItemTagline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add logic to send data to backend here
    console.log(itemImg);
    let data = {
      "category_name":itemName,
      "tagline":itemTagline,
      "image":itemImg
    }

    try {
      const response = await axios.post(`${API_URL}addcategory`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("Category data added successfully");
      window.location.reload();
      // Perform any other actions after successful submission
    } catch (error) {
      alert("ERROR");
      console.error(error);
    }
  };
  return (
    <>
     <div className="container mt-5">
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="item_name" className="form-label">Category Name</label>
          <input type="text" className="form-control" id="item_name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </div>   

        <div className="mb-3">
          <label htmlFor="item_name" className="form-label">Category Tagline</label>
          <input type="textarea" className="form-control" id="item_tagline" value={itemTagline} onChange={(e) => setItemTagline(e.target.value)} required />
        </div>   
        <div className="mb-3">
          <label htmlFor="item_img" className="form-label">Upload Image</label>
          <input type="file" className="form-control" id="item_img" onChange={(e) => setItemImg(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Category</button>
      </form>
    </div>
    </>
  )
}
