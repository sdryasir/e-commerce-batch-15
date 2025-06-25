import express from 'express';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'

import { 
  getAllProducts,
  getProductById,
  createnewProduct,
  updateProduct,
  deleteProduct
} from './controllers/products.controller.js';

import { createnewCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './controllers/category.controller.js';

const port = process.env.PORT || 3200
dbConnect()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(cors())


app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.post('/products/new', createnewProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);


app.get('/categories', getAllCategories);
app.get('/categories/:id', getCategoryById);
app.post('/categories/new', createnewCategory);
app.put('/categories/:id', updateCategory);
app.delete('/categories/:id', deleteCategory);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
