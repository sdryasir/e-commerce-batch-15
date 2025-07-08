import Category from "../models/Category.js"
import { v2 as cloudinary } from 'cloudinary';

export const createnewCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const file = req.file;

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'categories', 
    });

    const category_img = {
      public_id:uploadResult.public_id,
      secure_url:uploadResult.secure_url
    }
    const data = {
      name,
      slug,
      description,
      image:category_img
    }
    
    
    await Category.create(data);
    res.json({message:'Category has been created successfully'});
  } catch (error) {
    if(error.code == 11000){
      res.json({message:'Category already exists'});
    }else if(error.name == "ValidationError"){
      res.json({message:'Category Validation failed'});
    }else{
      res.json(error);
    }
  }
}

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories)
  } catch (error) {
    res.json(error)
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findById(id);
    res.json(category)
  } catch (error) {
    res.json(error)
  }
}

export const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const category = await Category.findByIdAndUpdate(id, data);
    res.json({message:'Category has been updated successfully'});
  } catch (error) {
    res.json(error)
  }
}


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const publicId = req.query.publicId

    if (!id || !publicId) {
      return res.status(400).json({ message: "Missing id or publicId" });
    }

    // Delete image from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      type: 'upload'
    });

    if (cloudinaryResult.result !== 'ok') {
      return res.status(500).json({ message: "Failed to delete image from Cloudinary", cloudinaryResult });
    }

    // Delete category from MongoDB
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found in database" });
    }

    res.json({ message: "Category and image deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
