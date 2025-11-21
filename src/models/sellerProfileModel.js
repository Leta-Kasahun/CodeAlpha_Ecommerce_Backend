import mongoose from 'mongoose';

const sellerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // one-to-one with User
  },

  shopName: { type: String, required: true, trim: true },

  // Demo payout info (for demo payments only)
  demoPayoutNumber: { type: String }, // optional, no real banking
  bankName: { type: String },          // optional

  phoneForOrders: { type: String },   // optional for contact

  shopAddress: {                      // simple, clean address
    city: String,
    postalCode: String,
    country: String
  },

  isApproved: { type: Boolean, default: true } // for approval flow if needed
}, { timestamps: true });

const SellerProfile = mongoose.model('SellerProfile', sellerProfileSchema);
export default SellerProfile;
