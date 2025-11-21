import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
  paymentStatus: { type: String, default: 'Pending' }, // Demo payment
  paymentMethod: { type: String, default: 'Demo' }     // Demo payment
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
