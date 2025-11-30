import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },

  user: {   // the buyer
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  method: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'cash'],
    default: 'card'  
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  transactionNumber: { type: String }, // demo reference number

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
