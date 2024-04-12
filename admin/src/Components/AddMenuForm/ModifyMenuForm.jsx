import React,{useState} from 'react'
import axios from 'axios'

export default function ModifyMenuForm({ propsData }) {
    console.log(propsData);
    const [itemId ,setitemId] = useState(propsData._id)
    const [itemName, setItemName] = useState(propsData.item_name);
    const [itemPrice, setItemPrice] = useState(propsData.item_price);
    const [isVeg, setIsVeg] = useState(propsData.veg);
    const [itemCategory, setItemCategory] = useState(propsData.item_category);
  const [itemSubcategory, setItemSubcategory] = useState(propsData.item_subcategory);
 
    const [itemImg, setItemImg] = useState(null);
  
    const handleSubmitModify = async (e) => {
       
        // You can add logic to send data to backend here
        console.log(itemId)
        let data = {
          "item_name":itemName,
          "item_price":itemPrice,
          "veg":isVeg,
          "item_category":itemCategory,
          "item_subcategory":itemSubcategory,
          "image":itemImg
        }
        try {
            const response = await axios.put(`${API_URL}updatemenu/${itemId}`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data);
            alert("Menu data updates successfully");
            // Perform any other actions after successful submission
          } catch (error) {
            alert("ERROR");
            window.location.reload();
            console.error(error);
          }
        };
      
    
  return (
   <>
   <div className="card col-lg-5 col-md-6 col-sm-10 ml-0 mr-0 mx-auto p-4">
    <h4>Modify Menu Data</h4>
    <form onSubmit={handleSubmitModify}>
        <div className="mb-3">
          <label htmlFor="item_name" className="form-label">Item Name</label>
          <input type="text" className="form-control" id="item_name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="item_price" className="form-label">Item Price</label>
          <input type="number" className="form-control" id="item_price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
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
        <button type="submit" className="btn btn-primary" >Modify Item</button>
      </form>
    
   </div>
   </> 
 )
}
