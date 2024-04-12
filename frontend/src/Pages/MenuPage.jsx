import React,{useEffect , useState} from 'react';
import MenuComponent from '../Components/MenuComponent/MenuComponent'
import axios from 'axios';
import API_URL from '../_helper';
import MenuComponent1 from '../Components/MenuComponent/MenuComponent1';
import Loader from '../Components/Loader/Loader';
export function MenuPage() {
   const [menuData , setmenuData] =useState([]);
   const [isLoading , setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch menu data from API endpoint
    fetchmenuData();
  }, []);

  const fetchmenuData = async () => {
    try {
      const response = await axios.get(`${API_URL}getallmenu`); // Replace this URL with your actual API endpoint
      
      console.log(response.data);
      setmenuData(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
//     const menu = [
//     { item_name: "Pizza", item_price: 10, item_category: "Beverages", item_subcategory: "Vegetarian" },
//     { item_name: "Pasta", item_price: 12, item_category: "Beverages", item_subcategory: "Vegetarian" },
//     { item_name: "Burger", item_price: 8, item_category: "Main Course", item_subcategory: "Vegetarian" },
//     { item_name: "Steak", item_price: 20, item_category: "Main Course", item_subcategory: "Non-vegetarian" },
//     { item_name: "Sushi", item_price: 15, item_category: "Desserts", item_subcategory: "Non-vegetarian" },
//     { item_name: "Ramen", item_price: 13, item_category: "Desserts", item_subcategory: "Vegetarian" }

// ];
  return (
    <div className='MenuPage'>
      {
        isLoading?
        <Loader/>
        :
        <MenuComponent1 menu={menuData} />
      
      }
     
       {/* <MenuComponent menu={menuData} /> */}
    </div>
  );
}

