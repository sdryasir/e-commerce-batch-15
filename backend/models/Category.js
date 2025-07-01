import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: { type: String, unique: true },
  description: String,
  image:{
    public_id:String,
    secure_url:String
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);





