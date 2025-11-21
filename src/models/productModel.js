import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
  images: [String],
  description: { type: String },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;