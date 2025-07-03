import express from 'express';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import multer from 'multer';
const storage = multer.memoryStorage(); // or use diskStorage if needed
const upload = multer({ storage: storage });

import { 
  getAllProducts,
  getProductById,
  createnewProduct,
  updateProduct,
  deleteProduct
} from './controllers/products.controller.js';

import { createnewCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './controllers/category.controller.js';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const port = process.env.PORT || 3200
dbConnect()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.post('/products/new', createnewProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);


app.get('/categories', getAllCategories);
app.delete('/delete/categories/:id', deleteCategory);
app.get('/categories/:id', getCategoryById);
app.post('/categories/new', upload.single('image'), createnewCategory);
app.put('/categories/:id', updateCategory);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
