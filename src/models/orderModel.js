import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      qty: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  shippingAddress: {
    city: String,
    postalCode: String,
    country: String
  },
  totalPrice: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'cash'],
    default: 'card'
  },
  paymentStatus: { 
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'completed'],
    default: 'processing'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;