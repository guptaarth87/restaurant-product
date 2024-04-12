
// index.js
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 1111;

app.use(cors());
app.use(express.json());

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up Mongoose and define schema
const MONGO_URI = "mongodb+srv://datasalt11:data7879069987salt@datasaltbusiness.pk26uu2.mongodb.net/MaaBaglaMukhi?retryWrites=true&w=majority&appName=DatasaltBusiness"

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  item_name: String,
  item_price: String,
  veg: Boolean,
  item_category: String,
  item_subcategory: String,
  imageUrl: String,
});

const categorySchema = new Schema({
  category_name : String,
  imageUrl:String
}) 

const subcategorySchema = new Schema({
  subcategory_name: String,
  subcategory_of:String,
  imageUrl: String
})

const Menu = mongoose.model('Menu', menuSchema);
const Category = mongoose.model('Category', categorySchema);
const Subcategory = mongoose.model('Subcategory', subcategorySchema);


// Routes
app.get("/", async (req, res) => {
  try{
        res.sendFile(path.join(__dirname,'templates','index.html'));
      // res.status(201).json({ message: 'App running successfully' });
  }catch(err){
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
// menu section
app.post('/uploadmenu', upload.single('image'), async (req, res) => {
  try {
    const { item_name, item_price , veg, item_category ,item_subcategory } = req.body;
   
    let imageUrl = null; // Set default imageUrl to null

    // Check if an image was provided
    if (req.file) {
      const imageBuffer = req.file.buffer;
      imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
    // Save image to MongoDB (you can also save it to a storage service like AWS S3)
   
    // Save Menu data to MongoDB
    const newMenu = new Menu({ item_name, item_price, veg, item_category, item_subcategory, imageUrl });
    await newMenu.save();
 
    res.status(201).json({ message: 'Menu uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new route to retrieve all products
app.get('/getallmenu', async (req, res) => {
  try {
   
    const menu = await Menu.find();
    

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getmenu', async (req, res) => {
    try {
      const category = req.query.category;
      const subcategory = req.query.subcategory;

      console.log(category)
      console.log(subcategory)
      const menu = await Menu.find({"item_category":category, "item_subcategory":subcategory});
      

      res.json(menu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Update a menu item
app.put('/updatemenu/:id',upload.single('image'), async (req, res) => {
  console.log("entered in update api block")
  try {
    const { id } = req.params;
    const { item_name, item_price, veg, item_category, item_subcategory } = req.body;
    let imageUrl = null; // Set default imageUrl to null

    // Check if an image was provided
    if (req.file) {
      const imageBuffer = req.file.buffer;
      imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }

    const updatedItem = await Menu.findByIdAndUpdate(id, {
      item_name,
      item_price,
      veg,
      item_category,
      item_subcategory,
      imageUrl
    });
    res.send({'messsage':'Item updated successfully',
  'updated_data':updatedItem
  });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Delete a menu item
app.delete('/deletemenu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.send('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
});
  
//Categories

app.post('/addcategory',upload.single('image'),async (req,res)=>{
 
  try{
   
    const {category_name , tagline } = req.body;
     // Save image to MongoDB (you can also save it to a storage service like AWS S3)
     const imageBuffer = req.file.buffer;
     const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
     // Save Menu data to MongoDB
     const newCategory = new Category({ category_name,tagline, imageUrl });
     console.log("add category block")
     await newCategory.save();
 
    res.status(201).json({ message: 'Category added successfully' });
}catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
}
})

app.get('/getcategory', async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Update a menu item
app.put('/updatecategory/:id',upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const imageBuffer = req.file.buffer;
    const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    const updatedItem = await Category.findByIdAndUpdate(id, {
      category_name,
      imageUrl
    });
    res.send({'messsage':'Item updated successfully',
  'updated_data':updatedItem
  });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a menu item
app.delete('/deletecategory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.send('Category deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
});

//subcategory 
app.post('/addsubcategory',upload.single('image'), async (req,res)=>{
  try{
    const {subcategory_name,subcategory_of } = req.body;
     // Save image to MongoDB (you can also save it to a storage service like AWS S3)
     const imageBuffer = req.file.buffer;
     const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
 
     // Save Menu data to MongoDB
     const newSubcategory = new Subcategory({ subcategory_name,subcategory_of, imageUrl });
     await newSubcategory.save();
 
    res.status(201).json({ message: 'Subcategory added successfully' });
}catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
}
})

app.get('/getsubcategory/:category', async (req, res) => {

  try {
    const { category } = req.params;
    const subcategory = await Subcategory.find({"subcategory_of":category});
    res.json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getsubcategorybyname/:subcategory_name', async (req, res) => {

  try {
    let { subcategory_name } = req.params;
    // subcategory_name = subcategory_name.charAt(0).toUpperCase() + subcategory_name.slice(1);
    const subcategory_data = await Subcategory.find({"subcategory_name":{ $regex: new RegExp(subcategory_name, 'i') }});
    console.log(subcategory_data);
    res.json(subcategory_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/updatesubcategory/:id',upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { subcategory_name,subcategory_of } = req.body;

    const imageBuffer = req.file.buffer;
    const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    const updatedItem = await Subcategory.findByIdAndUpdate(id, {
      subcategory_name,
      subcategory_of,
      imageUrl
    });
    res.send({'messsage':'Item updated successfully',
  'updated_data':updatedItem
  });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deletesubcategory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.send('Subcategory deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
