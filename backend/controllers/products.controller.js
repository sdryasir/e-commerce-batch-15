import Product from "../models/Product.js"
import { v2 as cloudinary } from 'cloudinary';

export const createnewProduct = async (req, res) => {
  
  try {
    const data = req.body;  
    const file = req.file;



    
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    console.log("base64Image", base64Image);
    

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'products', 
    });



    const product_img = {
      public_id:uploadResult.public_id,
      secure_url:uploadResult.secure_url
    }

    data.image = product_img

    await Product.create(data);
    res.json({message:'Product has been created successfully'});
  } catch (error) {
    if(error.code == 11000){
      res.json({message:'Product already exists'});
    }else if(error.name == "ValidationError"){
      res.json({message:'Product Validation failed'});
    }else{
      res.json(error);
    }
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products)
  } catch (error) {
    res.json(error)
  }
}

export const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.json(product)
  } catch (error) {
    res.json(error)
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data);
    res.json({message:'Product has been updated successfully'});
  } catch (error) {
    res.json(error)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json({message:"Product has been deleted successfully"});
  } catch (error) {
    res.json(error)
  }
}
