import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: { type: String, unique: true },
  description: String,
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  discountPrice: Number,
  stock: Number,
  sku: {
    type: String,
    required:true
  },
  tags: [String], //['beauty', 'face', 'skincare']
  image:{
    public_id:String,
    secure_url:String
  },
  colors: [String], //['red', 'green']
  sizes: [String], //['sm','lg', 'xl' ]
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);





